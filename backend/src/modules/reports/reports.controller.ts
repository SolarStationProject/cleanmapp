import { Request, Response } from 'express';
import * as reportsService from './reports.service';
import { DetalleReporteResponse, RolUsuario } from '../../shared/types';

//1. ASOCIADO A: findByOwnReportesId
//Carga la lista de reportes del ciudadano autenticado.
export async function getReportesPropios(req: Request, res: Response) {
    try {
        //const ciudadanoId = (req as any).user?.id;  
        const { ciudadanoId } = req.query;

        if (!ciudadanoId) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Llamada directa 1 a 1 al repositorio
        const reportes = await reportsService.getReportesPropios(ciudadanoId as string);

        return res.status(200).json({
            success: true,
            data: reportes
        });
    } catch (error) {
        console.error('Error en getReportesPropios:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
}

//2. ASOCIADO A: findDetailsByReporteId
//Obtiene el objeto detallado de un reporte y aplica el filtro de privacidad HU021.
export async function getDetalleReporte(req: Request, res: Response) {
    try {
        const { id } = req.query; 
        const {usuarioRol} = req.query; 

        if (!id) {
            return res.status(400).json({ success: false, message: 'El ID del reporte es requerido.' });
        }

        // Llamada directa 1 a 1 al repositorio
        const detalle = await reportsService.getDetalleReporte(id as string) as DetalleReporteResponse | null;

        if (!detalle) {
            return res.status(404).json({ success: false, message: 'Reporte no encontrado.' });
        }

        // Privacidad HU021: Si no es Admin, se destruye el campo de comentarios internos
        if (usuarioRol !== 'Admin') {
            delete detalle.comentarios_internos;
        }

        return res.status(200).json({
            success: true,
            data: detalle
        });
    } catch (error) {
        console.error('Error en getDetalleReporte:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
}

//3. ASOCIADO A: addChangeHistorialReportesId
//Inserta exclusivamente la nota técnica en la línea de tiempo de validaciones.
export async function crearCambioHistorial(req: Request, res: Response) {
    try {
        const { reporteId } = req.params; // ID del reporte
        const { estadoAsignado, comentario } = req.body;
        const usuarioId = (req as any).user?.id; 

        if (!usuarioId || !estadoAsignado || !comentario) {
            return res.status(400).json({ success: false, message: 'Faltan datos requeridos.' });
        }

        // Llamada directa 1 a 1 al repositorio
        const nuevoHito = await reportsService.crearCambioHistorial(
            reporteId,
            usuarioId,
            estadoAsignado,
            comentario
        );

        return res.status(201).json({
            success: true,
            data: nuevoHito
        });
    } catch (error) {
        console.error('Error en crearCambioHistorial:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
}


//4. ASOCIADO A: updatedEstadoReportesId
//Modifica o mantiene de forma directa el estado principal en la tabla del reporte.
export async function actualizarEstadoReporte(req: Request, res: Response) {
    try {
        const { reporteId } = req.params; // ID del reporte
        const { nuevoEstado } = req.body;

        if (!reporteId || !nuevoEstado) {
            return res.status(400).json({ success: false, message: 'El ID y el nuevo estado son obligatorios.' });
        }

        // Llamada directa 1 a 1 al repositorio
        const estadoActualizado = await reportsService.actualizarEstadoReporte(reporteId, nuevoEstado);

        return res.status(200).json({
            success: true,
            data: { estado: estadoActualizado }
        });
    } catch (error) {
        console.error('Error en actualizarEstadoReporte:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
}







//Controlador para listar los reportes del sistema basándose en el rol del usuario autenticado.
export const obtenerReportes = async (req: Request, res: Response): Promise<void> => {
    try {
        // NOTA: Se asume que tu auth.middleware inyectará estos datos en req.usuario
        // Si TypeScript reclama por la propiedad, puedes usar (req as any).usuario
        const { usuarioId } = req.query;
        const { usuarioRol } = req.query;

        // Validación de seguridad manual
        if (!usuarioId || !usuarioRol) {
            res.status(401).json({ 
                status: 'error', 
                message: 'No autorizado. Faltan credenciales de sesión.' 
            });
            return;
        }

        // Llamada a la capa de negocio
        const reportes = await reportsService.obtenerReportesPorRol(usuarioId as string, usuarioRol as RolUsuario);

        // Respuesta directa y exitosa al frontend-mobile
        res.status(200).json({
            status: 'success',
            results: reportes.length,
            data: reportes
        });
        
    } catch (error) {
        console.error('Error en obtenerReportes:', error);
        
        // Respuesta de error inmediata controlada aquí mismo
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error interno en el servidor al obtener los reportes.'
        });
    }
};







/*
export const createReport = async (req: Request, res: Response) => {
    try {
        const { ciudadano_id, descripcion, direccion, comuna, latitud, longitud } = req.body;

        // Si el usuario subió una foto, el middleware nos deja la ruta aquí:
        // Ejemplo: 'uploads/reportes/uuid-usuario/reporte-123.jpg'
        const fotoPath = req.file ? `uploads/reportes/${ciudadano_id}/${req.file.filename}` : undefined;

        const nuevoReporte = await reportsService.createNewReport({
            ciudadano_id,
            descripcion,
            direccion,
            comuna,
            latitud,
            longitud,
            foto: fotoPath // Se envía directo al servicio -> repositorio -> BD
        });

        res.status(201).json({ success: true, data: nuevoReporte });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
*/