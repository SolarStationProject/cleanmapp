import { Router } from 'express';
import { ReportsController } from './reports.controller';
//import { authMiddleware } from '../../middlewares/auth.middleware'; // Tu validador de JWT

const router = Router();
const controller = new ReportsController();

// GET /api/reports/mis-reportes - Obtiene el historial del ciudadano en su app móvil
//router.get('/mis-reportes', authMiddleware, controller.getPropios); en caso de tener autenticación existente
router.get('/mis-reportes', controller.getPropios);

export default router;
