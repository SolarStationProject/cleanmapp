import { Request, Response } from 'express';
import * as reportsService from './reports.service';

export async function getReportesPropios(req: Request, res: Response) {
    try {
        // Buscamos el ID real. Si no existe (porque no hay token), será 'undefined'
        const ciudadanoId = (req as any).user?.id;  

        // Si hay ID, busca en la DB. Si NO hay ID, le damos un arreglo vacío [] al instante sin tocar la base de datos.
        const reportes = ciudadanoId 
            ? await reportsService.getReportesPropios(ciudadanoId) 
            : [];

        // Respondemos al frontend con éxito
        return res.status(200).json({
            success: true,
            data: reportes
        });

    } catch (error) {
        console.error('Error en getReportesPropios:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error interno en el servidor de reportes' 
        });
    }
}

