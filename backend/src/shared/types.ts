// Tipos de datos estrictos que coinciden con PostgreSQL de CleanMap
export type RolUsuario = 'Admin' | 'Ciudadano';
export type EstadoReporte = 'Pendiente' | 'Verificado' | 'Rechazado';
export type PrioridadReporte = 'Alta' | 'Media' | 'Baja';

// Interfaz para la tabla usuarios
export interface Usuario {
    id: string; // UUID generado por uuid_generate_v4()
    email: string;
    password?: string; // Opcional para ocultarlo al enviar respuestas HTTP
    rol: RolUsuario;
    fecha_registro: Date;
}

// Interfaz para la tabla ubicaciones
export interface Ubicacion {
    latitud: number;
    longitud: number;
    comuna: string;
}

// Interfaz para la tabla reportes
export interface Reporte {
    id: string; // UUID
    ciudadano_id: string; // Relación con usuarios.id
    descripcion?: string; // TEXT (puede ser nulo)
    foto?: string; // VARCHAR(255) (puede ser nulo)
    fecha_creacion: Date;
    estado: EstadoReporte;
    prioridad: PrioridadReporte;
    latitud: number; // Conecta con ubicaciones
    longitud: number; // Conecta con ubicaciones
}

// Interfaz para la tabla validacion_reportes
export interface ValidacionReporte {
    id: string; // UUID
    reporte_id: string; // Relación con reportes.id
    usuario_id: string; // Relación con usuarios.id (Admin o Ciudadano)
    fecha: Date;
    tipo: string; // Ej: 'Validación ciudadano' o 'Validación admin'
    comentario?: string;
}

// Interfaz para la tabla notificaciones
export interface Notificacion {
    id: string; // UUID
    usuario_id: string; // Relación con usuarios.id
    mensaje: string;
    tipo: string; // Ej: 'Email', 'Push'
    fecha_envio: Date;
    leida: boolean;
}

