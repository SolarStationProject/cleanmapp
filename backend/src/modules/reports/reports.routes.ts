import { Router } from 'express';
import { 
    getReportesPropios, 
    getDetalleReporte, 
    crearCambioHistorial, 
    actualizarEstadoReporte 
} from './reports.controller';

const router = Router();

// Obtener la lista de reportes del ciudadano autenticado
router.get('/my-reports', getReportesPropios); // /api/reports/mis-reportes

//Obtener el detalle extendido y el timeline de un reporte específico
router.get('/:id', getDetalleReporte); // /api/reports/:id

// Insertar un nuevo hito/comentario en la línea de tiempo
router.post('/:id/history', crearCambioHistorial); // /api/reports/:id/history

// Actualizar de forma directa el estado en la tabla del reporte
router.put('/:id/status', actualizarEstadoReporte); // /api/reports/:id/status

export default router;

