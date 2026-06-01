import { Router } from 'express';
import { 
    getReportesPropios, 
    getDetalleReporte, 
    crearCambioHistorial, 
    actualizarEstadoReporte ,
    obtenerReportes
} from './reports.controller';
//import { upload } from '../../middlewares';

const router = Router();

// Obtener la lista de reportes del ciudadano autenticado
router.get('/my-reports', getReportesPropios); // /api/reports/mis-reportes

//Obtener el detalle extendido y el timeline de un reporte específico
router.get('/:id', getDetalleReporte); // /api/reports/:id

router.get('/', obtenerReportes);

// Insertar un nuevo hito/comentario en la línea de tiempo (no ha sido usada aún)
router.post('/:id/history', crearCambioHistorial); // /api/reports/:id/history

// 'foto' es el nombre del campo que enviará el frontend (React)
//router.post('/crear', upload.single('foto'), reportsController.createReport);

// Actualizar de forma directa el estado en la tabla del reporte (no ha sido usada aún)
router.put('/:id/status', actualizarEstadoReporte); // /api/reports/:id/status

export default router;

