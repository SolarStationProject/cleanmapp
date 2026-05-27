// Tipos de datos que coinciden con las tablas de PostgreSQL de CleanMap

export type RolUsuario = 'Admin' | 'Ciudadano';
export type EstadoReporte = 'Pendiente' | 'Verificado' | 'Rechazado';
export type PrioridadReporte = 'Alta' | 'Media' | 'Baja';

export interface Usuario {
    id: string; // UUID
    email: string;
    password?: string; // Opcional para cuando lo enviamos al frontend por seguridad
    rol: RolUsuario;
    fecha_registro: Date;
}

export interface Ubicacion {
    latitud: number;
    longitud: number;
    comuna: string;
}

export interface Reporte {
    id: string; // UUID
    ciudadano_id: string;
    descripcion?: string;
    foto?: string;
    fecha_creacion: Date;
    estado: EstadoReporte;
    prioridad: PrioridadReporte;
    latitud: number;
    longitud: number;
}
