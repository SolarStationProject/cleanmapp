export type RolUsuario = 'Admin' | 'Ciudadano';
export type EstadoReporte = 'Pendiente' | 'Verificado' | 'Rechazado';
export type PrioridadReporte = 'Alta' | 'Media' | 'Baja';

export interface Usuario {
    id: string; // UUID string
    email: string;
    password?: string; 
    rol: RolUsuario;
    fecha_registro: string; // Cambiado a string: Express lo serializa como ISO String
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
    fecha_creacion: string; 
    estado: EstadoReporte;
    prioridad: PrioridadReporte;
    latitud: number; 
    longitud: number; 
}

export interface ValidacionReporte {
    id: string; 
    reporte_id: string; 
    usuario_id: string;       // El Admin o moderador que cambia el estado
    usuario_nombre?: string;  // Opcional: Para el JOIN rápido (ej: 'María García', 'Carlos Méndez')
    fecha: string;            // ISO String que contiene la fecha y hora (14:30)
    estado_asignado: EstadoReporte; // El estado que se fijó en ese hito (ej: 'En proceso')
    comentario: string;       // El texto descriptivo (ej: 'Asignado a equipo de limpieza zona norte')
}

export interface Notificacion {
    id: string; 
    usuario_id: string; 
    mensaje: string;
    tipo: string; 
    fecha_envio: string; // Cambiado a string
    leida: boolean;
}

// Tabla exclusiva para discusiones o notas de moderación entre Admins
export interface ComentarioInterno {
    id: string;          // UUID
    reporte_id: string;  // Relación con reportes.id
    admin_id: string;    // Relación con usuarios.id (Solo usuarios con rol 'Admin')
    comentario: string;  // TEXT
    fecha_creacion: string; // ISO String
}

export interface DetalleReporteResponse extends Reporte {
    historial_cambios: ValidacionReporte[]; // Llena la línea de tiempo (público para todos)
    comentarios_internos?: ComentarioInterno[]; // Privado (Solo si el solicitante es Admin)
}

