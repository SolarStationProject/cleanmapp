import { db } from '../../config/database';
import { Reporte } from '../../shared/types';

// Una función limpia que solo se encarga de ir a PostgreSQL
export async function findByCiudadanoId(ciudadanoId: string): Promise<Reporte[]> {
    const queryText = `
        SELECT id, ciudadano_id, descripcion, foto, fecha_creacion, estado, prioridad, latitud, longitud 
        FROM reportes 
        WHERE ciudadano_id = $1
        ORDER BY fecha_creacion DESC;
    `;
    
    const result = await db.query(queryText, [ciudadanoId]);
    return result.rows as Reporte[];
}
