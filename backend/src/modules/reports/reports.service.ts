import * as reportsRepository from './reports.repository';
import { Reporte } from '../../shared/types';

// Otra función directa. Sin clases ni "this.repository"
export async function getReportesPropios(ciudadanoId: string): Promise<Reporte[]> {
    // Si la DB está vacía, esto simplemente retornará un arreglo vacío []
    return await reportsRepository.findByCiudadanoId(ciudadanoId);
}

