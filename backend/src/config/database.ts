import { Pool, types, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// 1. Configuración del Pool de Conexiones
const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Ajustes de rendimiento para producción
    max: 20, 
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 2000, 
});

// 2. Función interna para descubrir el OID de PostGIS de forma dinámica
const configurarPostGISParser = async () => {
    try {
        // Consultamos el catálogo de PostgreSQL para saber el OID real del tipo 'geometry'
        const res = await pool.query("SELECT oid FROM pg_type WHERE typname = 'geometry'");
        
        if (res.rows.length > 0) {
            const geometryOid = res.rows[0].oid;

            // Configuramos el Type Parser interceptor con el OID dinámico real
            types.setTypeParser(geometryOid, (val: string) => {
                try {
                    // Si la query usa ST_AsGeoJSON, esto lo convierte automáticamente a objeto de JS/TS
                    return JSON.parse(val);
                } catch {
                    return val; // Si no es un GeoJSON válido (ej: WKT), devuelve el string crudo
                }
            });
            console.log(`Parser de PostGIS configurado dinámicamente con éxito (OID: ${geometryOid}).`);
        } else {
            console.warn('Advertencia: No se encontró el tipo geometry. ¿Ya ejecutaste el script de migración SQL?');
        }
    } catch (err: any) {
        console.error('Error al intentar configurar el Type Parser de PostGIS:', err.message);
    }
};

// 3. Verificación inmediata de la conexión al iniciar el backend e inicialización del parser
pool.query('SELECT NOW()', async (err) => {
    if (err) {
        console.error('Error crítico al conectar con PostgreSQL/PostGIS:', err.message);
    } else {
        console.log('Conexión exitosa a PostgreSQL activa.');
        // Si la conexión fue exitosa, configuramos el parser inmediatamente
        await configurarPostGISParser();
    }
});

// 4. Interceptores de eventos del ciclo de vida del Pool
pool.on('error', (err) => {
    console.error('Error inesperado en un cliente inactivo del pool de la BD:', err);
});

// Exportación con Tipado Estricto para TypeScript (Idéntica a la tuya)
export const db = {
    /*
     * Ejecuta una consulta SQL usando async/await y devuelve una Promesa tipada.
     */
    query: (text: string, params?: any[]): Promise<QueryResult> => {
        return pool.query(text, params);
    },
    
    /*
     * Instancia limpia del pool para transacciones complejas.
     */
    pool,
};

