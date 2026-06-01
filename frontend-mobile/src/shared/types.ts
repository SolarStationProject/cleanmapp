export type RolUsuario = 'Admin' | 'Ciudadano';
export type EstadoReporte = 'Pendiente' | 'Verificado' | 'Rechazado';

export interface Usuario {
    id: string; 
    nombre: string
    email: string;
    rol: RolUsuario;
    fecha_registro: string; 
}

export interface Ubicacion {
    comuna: string;
    latitud: number;
    longitud: number;
}

export interface Reporte extends Ubicacion {
    id: string; 
    ciudadano_id: string; 
    codigo: string;
    titulo: string;
    descripcion?: string; 
    foto?: string; 
    fecha_creacion: string; 
    estado: EstadoReporte;
    direccion: string;
}

export interface ValidacionReporte {
    id: string; 
    reporte_id: string; 
    usuario_id: string; 
    usuario_nombre?: string; 
    fecha: string; 
    estado_asignado: EstadoReporte;
    comentario: string;
}

export interface Notificacion {
    id: string; 
    usuario_id: string; 
    mensaje: string;
    tipo: string; 
    fecha_envio: string; 
    leida: boolean;
}

export interface ComentarioInterno {
    id: string;
    reporte_id: string;
    admin_id: string;
    admin_nombre?: string;
    comentario: string;
    fecha_creacion: string;
}

// Interfaz específica para mapear la respuesta de la pantalla ReportDetail
export interface DetalleReporteResponse extends Reporte {
    historial_cambios: ValidacionReporte[]; // Llena la línea de tiempo (público para todos)
    comentarios_internos?: ComentarioInterno[]; // Privado (Solo si el solicitante es Admin)
}