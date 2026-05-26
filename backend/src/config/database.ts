import { Pool, types } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// 1. Configuración de PostGIS Type Parsers (GeoJSON Automático)
// El OID 142 es comúnmente asignado al tipo 'geometry' o 'geography' en PostgreSQL.
// Al asignarle una función de parseo vacía u objeto, forzamos a que si usamos
// ST_AsGeoJSON(geom) en el SQL, el driver 'pg' lo entregue directamente como un Objeto de JS 
// en lugar de un string que requiera JSON.parse().
const POSTGIS_GEOMETRY_OID = 142;
types.setTypeParser(POSTGIS_GEOMETRY_OID, (val: string) => {
    try {
        return JSON.parse(val);
    } catch {
        return val; // Si no es un JSON válido (ej: WKT), devuelve el string crudo
    }
});

// 2. Configuración del Pool de Conexiones
// Usar un Pool es mandatorio en producción (2026) para reutilizar conexiones activas
// en lugar de abrir y cerrar una conexión TCP en cada petición HTTP de la API.
const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Ajustes de rendimiento para producción
    max: 20, // Máximo número de clientes concurrentes en el pool
    idleTimeoutMillis: 30000, // Tiempo para cerrar conexiones inactivas (30 segundos)
    connectionTimeoutMillis: 2000, // Tiempo de espera máximo para conectar antes de dar error (2 segundos)
});

// 3. Verificación inmediata de la conexión al iniciar el backend
pool.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('Error crítico al conectar con PostgreSQL/PostGIS:', err.message);
    } else {
        console.log('Conexión exitosa a PostgreSQL con soporte PostGIS activa.');
    }
});

// 4. Interceptores de eventos del ciclo de vida del Pool
pool.on('error', (err) => {
    console.error('Error inesperado en un cliente inactivo del pool de la BD:', err);
});

export default {
    /**
     * Ejecuta una consulta SQL genérica en la base de datos.
     * Utiliza un cliente del pool y lo libera automáticamente tras la ejecución.
     */
    query: (text: string, params?: any[]) => pool.query(text, params),

    /**
     * Expone el pool directamente en caso de requerir flujos avanzados o transacciones complejas.
     */
    pool,
};
