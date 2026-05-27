// frontend-mobile/src/shared/types.ts

export type RolUsuario = 'Admin' | 'Ciudadano';
export type EstadoReporte = 'Pendiente' | 'Verificado' | 'Rechazado';
export type PrioridadReporte = 'Alta' | 'Media' | 'Baja';

export interface Usuario {
    id: string; 
    email: string;
    rol: RolUsuario;
    fecha_registro: string; //Cambiado a string (JSON ISO)
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
    foto?: string; 
    fecha_creacion: string; //Cambiado a string (JSON ISO)
    estado: EstadoReporte;
    prioridad: PrioridadReporte;
    latitud: number; 
    longitud: number; 
}

export interface ValidacionReporte {
    id: string; 
    reporte_id: string; 
    usuario_id: string; 
    fecha: string; //Cambiado a string
    tipo: string; 
    comentario?: string;
}

export interface Notificacion {
    id: string; 
    usuario_id: string; 
    mensaje: string;
    tipo: string; 
    fecha_envio: string; //Cambiado a string
    leida: boolean;
}

// EXTRA MÓVIL: Utilidad para tipar las respuestas que te entrega Axios
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}
