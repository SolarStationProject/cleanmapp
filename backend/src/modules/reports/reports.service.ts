import * as reportsRepository from './reports.repository';
import { Reporte, DetalleReporteResponse, ValidacionReporte, RolUsuario } from '../../shared/types';

export async function getReportesPropios(ciudadanoId: string): Promise<Reporte[]> {
    // Si la DB está vacía, esto simplemente retornará un arreglo vacío []
    return await reportsRepository.findByOwnReportesId(ciudadanoId);
}

export async function getDetalleReporte(reporteId: string): Promise<DetalleReporteResponse | null>  {
    // Si la DB está vacía, esto simplemente retornará un arreglo vacío []
    return await reportsRepository.findDetailsByReporteId(reporteId) as DetalleReporteResponse | null;
}

export async function crearCambioHistorial(
    reporteId: string, 
    usuarioId: string, 
    estadoAsignado: string, 
    comentario: string
): Promise<Partial<ValidacionReporte>> {
    // Si la DB está vacía, esto simplemente retornará un arreglo vacío []
    return await reportsRepository.addChangeHistorialReportesId(
        reporteId,
        usuarioId,
        estadoAsignado,
        comentario
    );
}

export async function actualizarEstadoReporte(reporteId: string, nuevoEstado: string): Promise<string> {
    // Si la DB está vacía, esto simplemente retornará un arreglo vacío []
    return await reportsRepository.updatedEstadoReportesId(reporteId, nuevoEstado);
}

export const obtenerReportesPorRol = async (usuarioId: string, usuarioRol: RolUsuario): Promise<Reporte[]> => {
    // Aquí puedes meter lógica de negocio futura (ej: filtrar por comunas permitidas, cachear datos, etc.)
    return await reportsRepository.obtenerTodos(usuarioId, usuarioRol);
};


// Definimos la interfaz del reporte que se va a crear
/*
interface CreateReportInput {
    ciudadano_id: string;
    descripcion?: string;
    direccion: string;
    comuna: string;
    latitud: number;
    longitud: number;
    foto?: string; // Aquí viaja la ruta: 'uploads/reports/UUID/reporte-123.jpg'
}

export const createNewReport = async (reportData: CreateReportInput) => {
    // Aquí podrías agregar reglas de negocio en el futuro si fuesen necesarias
    return await reportsRepository.insertReport(reportData);
};
*/