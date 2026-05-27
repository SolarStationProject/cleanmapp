-- 1. Activar la extensión para generar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabla: Usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(30) NOT NULL CHECK (rol IN ('Admin', 'Ciudadano')),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla: Ubicacion
CREATE TABLE ubicaciones (
    latitud DOUBLE PRECISION,
    longitud DOUBLE PRECISION,
    comuna VARCHAR(100) NOT NULL,
    PRIMARY KEY (latitud, longitud)
);

-- 4. Tabla: Reporte (Sintaxis ultra-compatible para VSC)
CREATE TABLE reportes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ciudadano_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    descripcion TEXT,
    foto VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(30) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Verificado', 'Rechazado')),
    prioridad VARCHAR(20) DEFAULT 'Media' CHECK (prioridad IN ('Alta', 'Media', 'Baja')),
    latitud DOUBLE PRECISION NOT NULL,
    longitud DOUBLE PRECISION NOT NULL,
    CONSTRAINT fk_reporte_ubicacion FOREIGN KEY (latitud, longitud) REFERENCES ubicaciones(latitud, longitud) ON DELETE RESTRICT
);

-- 5. Tabla: ValidacionReporte
CREATE TABLE validacion_reportes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporte_id UUID NOT NULL REFERENCES reportes(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(50) NOT NULL,
    comentario TEXT
);

-- 6. Tabla: Notificacion
CREATE TABLE notificaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    mensaje TEXT NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leida BOOLEAN DEFAULT FALSE
);
