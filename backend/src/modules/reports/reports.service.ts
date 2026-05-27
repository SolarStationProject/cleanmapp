import { ReportsRepository } from './reports.repository';
import { Reporte } from '../../shared/types';

export class ReportsService {
    private reportsRepository: ReportsRepository;

    constructor() {
        this.reportsRepository = new ReportsRepository();
    }

    async getPropios(ciudadanoId: string): Promise<Reporte[]> {
        // Aquí podrías agregar lógica de negocio (ej: formatear la URL de la imagen si se aloja en S3/Storage)
        return await this.reportsRepository.findByCiudadanoId(ciudadanoId);
    }
}
