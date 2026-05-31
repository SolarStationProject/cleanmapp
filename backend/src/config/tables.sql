-- 1. Habilitar extensiones necesarias para PostGIS y generación de UUIDs
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Si tu versión es muy antigua, usa pgcrypto

-- 2. Limpieza de tablas antiguas para evitar conflictos (en orden de dependencia)
DROP TABLE IF EXISTS comentarios_internos CASCADE;
DROP TABLE IF EXISTS validacion_reportes CASCADE;
DROP TABLE IF EXISTS notificaciones CASCADE;
DROP TABLE IF EXISTS reportes CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- 3. Tabla de Usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL DEFAULT 'Guest',
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('Admin', 'Ciudadano')),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. Tabla de Reportes (Usa el tipo GEOMETRY de PostGIS para coordenadas de alta precisión)
CREATE TABLE reportes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ciudadano_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    codigo VARCHAR(50) NOT NULL,
    titulo TEXT,
    descripcion TEXT,
    foto TEXT, -- Cambiado a TEXT para que soporte los strings Base64 pesados de la cámara
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Verificado', 'Rechazado')),
    direccion VARCHAR(255) NOT NULL,
    comuna VARCHAR(100) NOT NULL,
    geom geometry(Point, 4326) NOT NULL -- Almacena latitud/longitud en formato geográfico global WGS84
);

-- Crear índice espacial para que las búsquedas por radio por GPS (ST_DWithin) sean ultrarrápidas
CREATE INDEX IF NOT EXISTS reportes_geom_idx ON reportes USING gist(geom);

-- 5. Tabla de Validaciones / Historial de Cambios (Línea de tiempo visible para todos)
CREATE TABLE validacion_reportes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporte_id UUID NOT NULL REFERENCES reportes(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado_asignado VARCHAR(50) NOT NULL CHECK (estado_asignado IN ('Pendiente', 'Verificado', 'Rechazado')),
    comentario TEXT NOT NULL
);

-- 6. Tabla de Comentarios Internos (Discusiones privadas exclusivas entre administradores - HU021)
CREATE TABLE comentarios_internos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporte_id UUID NOT NULL REFERENCES reportes(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 7. Tabla de Notificaciones (Historial de alertas push/email para usuarios)
CREATE TABLE notificaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    mensaje TEXT NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Ej: 'Email', 'Push'
    fecha_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    leida BOOLEAN DEFAULT FALSE NOT NULL
);
