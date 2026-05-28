export type RolUsuario = 'Admin' | 'Ciudadano';
export type EstadoReporte = 'Pendiente' | 'Verificado' | 'Rechazado';
export type PrioridadReporte = 'Alta' | 'Media' | 'Baja';

export interface Usuario {
    id: string; 
    email: string;
    rol: RolUsuario;
    fecha_registro: string; 
}

export interface Ubicacion {
    latitud: number;
    longitud: number;
    comuna: string;
}

export interface Reporte {
    id: string; 
    ciudadano_id: string; 
    descripcion?: string; 
    foto?: string; // String Base64 limpio
    fecha_creacion: string; 
    estado: EstadoReporte;
    prioridad: PrioridadReporte;
    latitud: number; 
    longitud: number; 
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
    comentario: string;
    fecha_creacion: string;
}

// Interfaz específica para mapear la respuesta de la pantalla ReportDetail
export interface DetalleReporte {
    id: string; 
    ciudadano_id: string; 
    descripcion?: string; 
    foto?: string; 
    fecha_creacion: string; 
    estado: EstadoReporte;
    prioridad: PrioridadReporte;
    latitud: number; 
    longitud: number; 
    historial_cambios: ValidacionReporte[]; // Renderiza el componente visual del Timeline
    comentarios_internos?: ComentarioInterno[]; 
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}