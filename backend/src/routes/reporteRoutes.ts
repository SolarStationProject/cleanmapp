import { Router } from 'express';
import { actualizarEstadoReporte } from '../controllers/reporteController';
import { verificarRolAdmin } from '../middlewares/authMiddleware'; // <-- Importado

const router = Router();

router.patch(
    '/:id/estado', 
    verificarRolAdmin, // <-- ¡El guardián en acción!
    actualizarEstadoReporte
);

export default router;