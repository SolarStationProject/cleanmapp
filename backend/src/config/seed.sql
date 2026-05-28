-- 1. LIMPIAR DATOS PREVIOS (Evita errores de duplicados si lo corres varias veces)
TRUNCATE TABLE comentarios_internos, validacion_reportes, notificaciones, reportes, usuarios RESTART IDENTITY CASCADE;

-- 2. INSERTAR USUARIOS DE PRUEBA
-- Nota: Usamos contraseñas de texto plano solo para desarrollo rápido en local.
-- Guarda los UUID generados para las relaciones inferiores.
INSERT INTO usuarios (id, email, password, rol, fecha_registro)
VALUES 
    ('a1111111-1111-1111-1111-111111111111', 'admin@cleanmap.com', 'admin123', 'Admin', NOW()),
    ('a2222222-2222-2222-2222-222222222222', 'admin2@cleanmap.com', 'admin234', 'Admin', NOW()),
    ('c2222222-2222-2222-2222-222222222222', 'ciudadano@cleanmap.com', 'user123', 'Ciudadano', NOW());

-- 3. INSERTAR REPORTES DE PRUEBA (Utilizando ST_SetSRID y ST_MakePoint)
-- IMPORTANTE: El orden en ST_MakePoint es estricto (Longitud, Latitud)
INSERT INTO reportes (id, ciudadano_id, descripcion, foto, fecha_creacion, estado, prioridad, geom)
VALUES 
    (
        'r1111111-1111-1111-1111-111111111111', 
        'c2222222-2222-2222-2222-222222222222', 
        'Microbasural acumulado en la esquina del parque. Hay restos de poda y plásticos.', 
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...', -- Simulación de Base64 de la cámara
        NOW() - INTERVAL '3 days', 
        'En proceso', 
        'Alta', 
        ST_SetSRID(ST_MakePoint(-70.6506, -33.4372), 4326) -- Coordenadas en Santiago, Chile
    ),
    (
        'r2222222-2222-2222-2222-222222222222', 
        'c2222222-2222-2222-2222-222222222222', 
        'Escombros de construcción bloqueando la acera peatonal.', 
        NULL, 
        NOW() - INTERVAL '1 day', 
        'Pendiente', 
        'Media', 
        ST_SetSRID(ST_MakePoint(-70.6530, -33.4420), 4326)
    ),
    (
        'r3333333-3333-3333-3333-333333333333', 
        'c2222222-2222-2222-2222-222222222222', 
        'Contenedor municipal desbordado de basura orgánica.', 
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE...', 
        NOW() - INTERVAL '5 days', 
        'Verificado', 
        'Baja', 
        ST_SetSRID(ST_MakePoint(-70.6480, -33.4350), 4326)
    );

-- 4. INSERTAR HISTORIAL DE CAMBIOS (Para alimentar la línea de tiempo/Timeline de la app)
INSERT INTO validacion_reportes (id, reporte_id, usuario_id, fecha, estado_asignado, comentario)
VALUES 
    -- Línea de tiempo para el Reporte 1 ('Pendiente')
    (gen_random_uuid(), 'r1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '3 days', 'Pendiente', 'Reporte creado por el ciudadano desde la aplicación móvil.'),
    (gen_random_uuid(), 'r1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'Verificado', 'Inspección visual realizada. Se confirma acumulación crítica de residuos.'),
    (gen_random_uuid(), 'r1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', 'Pendiente', 'Asignado al camión recolector de la Zona Norte. Despliegue programado.'),

    -- Línea de tiempo para el Reporte 2 ('Pendiente')
    (gen_random_uuid(), 'r2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '1 day', 'Pendiente', 'Reporte ingresado al sistema en espera de revisión por moderación.'),

    -- Línea de tiempo para el Reporte 3 ('Verificado')
    (gen_random_uuid(), 'r3333333-3333-3333-3333-333333333333', 'c2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '5 days', 'Pendiente', 'Reporte creado.'),
    (gen_random_uuid(), 'r3333333-3333-3333-3333-333333333333', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '4 days', 'Verificado', 'Validado por la central. Se notificará a la cuadrilla de limpieza urbana.');

-- 5. INSERTAR COMENTARIOS INTERNOS (Exclusivos para Admins - HU021)
INSERT INTO comentarios_internos (id, reporte_id, admin_id, comentario, fecha_creacion)
VALUES 
    (gen_random_uuid(), 'r1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Ojo: Este cuadrante presenta reincidencia semanal. Reportar a fiscalización si vuelve a ocurrir.', NOW() - INTERVAL '1 day');
