import { Request, Response, NextFunction } from 'express';
import { ReportsService } from './reports.service';

export class ReportsController {
    private reportsService: ReportsService;

    constructor() {
        this.reportsService = new ReportsService();
    }

    getPropios = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // El auth.middleware debe proveer el id del ciudadano autenticado en req.user
            const ciudadanoId = (req as any).user?.id; 

            if (!ciudadanoId) {
                res.status(401).json({ success: false, message: 'Usuario no autenticado' });
                return;
            }

            const reportes = await this.reportsService.getPropios(ciudadanoId);

            res.status(200).json({
                success: true,
                data: reportes
            });
        } catch (error) {
            next(error); // Pasa al AppError o middleware global
        }
    };
}
