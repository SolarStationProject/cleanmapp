import { Request, Response } from 'express';
import * as reportsService from './reports.service';

export async function getPropios(_req: Request, res: Response) {
    try {
        // 🚨 TEMPORAL: Usamos un ID fijo para que no falle por falta de token
        const ciudadanoId = '12345'; 

        const reportes = await reportsService.getPropios(ciudadanoId);

        // Respondemos al frontend con éxito
        return res.status(200).json({
            success: true,
            data: reportes
        });

    } catch (error) {
        console.error('Error en getPropios:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error interno en el servidor de reportes' 
        });
    }
}

