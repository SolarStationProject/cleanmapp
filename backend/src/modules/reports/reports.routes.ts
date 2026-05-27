import { Router } from 'express';
import { getPropios } from './reports.controller';

const router = Router();

// Cuando alguien entre a /api/reports/mis-reportes, ejecuta la función getPropios
router.get('/mis-reportes', getPropios);

export default router;

