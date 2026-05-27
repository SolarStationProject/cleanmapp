import { db } from '../../config/database';
import { Reporte } from '../../shared/types';

export class ReportsRepository {
    /**
     * Busca en la base de datos todos los reportes creados por un ciudadano específico.
     */
    async findByCiudadanoId(ciudadanoId: string): Promise<Reporte[]> {
        const queryText = `
            SELECT id, ciudadano_id, descripcion, foto, fecha_creacion, estado, prioridad, latitud, longitud 
            FROM reportes 
            WHERE ciudadano_id = $1
            ORDER BY fecha_creacion DESC;
        `;
        
        const result = await db.query(queryText, [ciudadanoId]);
        return result.rows as Reporte[];
    }
}
