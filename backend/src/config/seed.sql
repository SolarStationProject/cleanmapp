-- 1. LIMPIAR DATOS PREVIOS (Evita errores de duplicados si lo corres varias veces)
TRUNCATE TABLE comentarios_internos, validacion_reportes, notificaciones, reportes, usuarios RESTART IDENTITY CASCADE;

-- 2. INSERTAR USUARIOS DE PRUEBA
-- Nota: Usamos contraseñas de texto plano solo para desarrollo rápido en local.
-- Guarda los UUID generados para las relaciones inferiores.
INSERT INTO usuarios (id, nombre, email, password, rol, fecha_registro)
VALUES 
    ('a1111111-1111-1111-1111-111111111111', 'María García', 'admin@cleanmap.com', 'admin123', 'Admin', NOW()),
    ('a2222222-2222-2222-2222-222222222222', 'Carlos Méndez', 'admin2@cleanmap.com', 'admin234', 'Admin', NOW()),
    ('c2222222-2222-2222-2222-222222222222', 'Juan García', 'ciudadano@cleanmap.com', 'user123', 'Ciudadano', NOW()),
    ('c3333333-3333-3333-3333-333333333333', 'Elias Hernández', 'ciudadano2@cleanmap.com', 'user234', 'Ciudadano', NOW()),
    ('c4444444-4444-4444-4444-444444444444', 'Roberto Gomez', 'ciudadano3@cleanmap.com', 'user345', 'Ciudadano', NOW()),
    ('c5555555-5555-5555-5555-555555555555', 'Lautaro Sánchez', 'ciudadano4@cleanmap.com', 'user456', 'Ciudadano', NOW());

-- 3. INSERTAR REPORTES DE PRUEBA (Utilizando ST_SetSRID y ST_MakePoint)
-- IMPORTANTE: El orden en ST_MakePoint es estricto (Longitud, Latitud)
INSERT INTO reportes (id, ciudadano_id, codigo, titulo, descripcion, foto, fecha_creacion, estado, direccion, comuna, geom)
VALUES 
    (
        '01111111-1111-1111-1111-111111111111', -- Reporte 1
        'c2222222-2222-2222-2222-222222222222', 
        'REP-2026-0001',
        'Microbasural acumulado en la esquina del parque. Hay restos de poda y plásticos.', 
        '',
        '/uploads/reports/c2222222-2222-2222-2222-222222222222/basural2.jpg', -- Simulación sin Base64
        NOW() - INTERVAL '3 days', 
        'Verificado', 
        'Calle Los Pinos 234', --Simulación de calle (activar ubicación en el futuro si es requerido)
        'San Bernardo', -- Simulación de comuna (activar ubicación en el futuro si es requerido)
        ST_SetSRID(ST_MakePoint(-70.7185, -33.5921), 4326) -- Coordenadas en Santiago, Chile
    ),
    (
        '02222222-2222-2222-2222-222222222222', -- Reporte 2
        'c2222222-2222-2222-2222-222222222222', 
        'REP-2026-0002',
        'Escombros de construcción bloqueando la acera peatonal.', 
        '',
        '/uploads/reports/c2222222-2222-2222-2222-222222222222/basural3.jpg', 
        NOW() - INTERVAL '1 day', 
        'Pendiente', 
        'Av. Central 567', 
        'Santiago',
        ST_SetSRID(ST_MakePoint(-70.6530, -33.4420), 4326)
    ),
    (
        '03333333-3333-3333-3333-333333333333', -- Reporte 3
        'c2222222-2222-2222-2222-222222222222', 
        'REP-2026-0003',
        'Contenedor municipal desbordado de basura orgánica.', 
        '',
        '/uploads/reports/c2222222-2222-2222-2222-222222222222/basural4.jpg', 
        NOW() - INTERVAL '5 days', 
        'Rechazado', 
        'Zona Industrial Norte',
        'San Miguel', 
        ST_SetSRID(ST_MakePoint(-70.6480, -33.4350), 4326)
    ),
    (
        '04444444-4444-4444-4444-444444444444', -- Reporte 4
        'c3333333-3333-3333-3333-333333333333', 
        'REP-2026-0004',
        'Escombros de construcción bloqueando la acera peatonal. Lleva más de una semana.', 
        '',
        '/uploads/reports/c3333333-3333-3333-3333-333333333333/basural5.jpg', 
        NOW() - INTERVAL '1 day', 
        'Pendiente', 
        'Av. Libertador Bernardo O''Higgins 1050',
        'Santiago', 
        ST_SetSRID(ST_MakePoint(-70.6506, -33.4428), 4326)
    ),
    (
        '05555555-5555-5555-5555-555555555555', -- Reporte 5
        'c3333333-3333-3333-3333-333333333333', 
        'REP-2026-0005',
        'Gran cantidad de cajas de cartón comerciales abandonadas al lado de los contenedores de reciclaje.', 
        '',
        '/uploads/reports/c3333333-3333-3333-3333-333333333333/basural6.jpg', 
        NOW() - INTERVAL '5 hours', 
        'Pendiente', 
        'Av. Andrés Bello 2425',
        'Providencia', 
        ST_SetSRID(ST_MakePoint(-70.6061, -33.4174), 4326)
    ),
    (
        '06666666-6666-6666-6666-666666666666', -- Reporte 6
        'c3333333-3333-3333-3333-333333333333', 
        'REP-2026-0006',
        'Bolsas de basura domiciliaria rotas por perros callejeros. Desperdicios desparramados en la plaza.', 
        '',
        '/uploads/reports/c3333333-3333-3333-3333-333333333333/basural7.jpg', 
        NOW() - INTERVAL '6 days', 
        'Verificado', 
        'Jorge Washington 150',
        'Ñuñoa', 
        ST_SetSRID(ST_MakePoint(-70.5972, -33.4542), 4326)
    ),
    (
        '07777777-7777-7777-7777-777777777777', -- Reporte 7
        'c4444444-4444-4444-4444-444444444444', 
        'REP-2026-0007',
        'Muebles viejos (colchón y sillón) abandonados en el bandejón central de la avenida principal.', 
        '',
        '/uploads/reports/c4444444-4444-4444-4444-444444444444/basural8.jpg', 
        NOW() - INTERVAL '12 hours', 
        'Rechazado', 
        'Av. Pajaritos 2100',
        'Maipú', 
        ST_SetSRID(ST_MakePoint(-70.7572, -33.5104), 4326)
    ),
    (
        '08888888-8888-8888-8888-888888888888', -- Reporte 8
        'c4444444-4444-4444-4444-444444444444', 
        'REP-2026-0008',
        'Acumulación de botellas de vidrio y latas detrás del paradero de micro. Peligro de cortes.', 
        '',
        '/uploads/reports/c4444444-4444-4444-4444-444444444444/basural9.jpg', 
        NOW() - INTERVAL '2 days', 
        'Verificado', 
        'Av. Vicuña Mackenna 7200',
        'La Florida', 
        ST_SetSRID(ST_MakePoint(-70.5984, -33.5222), 4326)
    ),
    (
        '09999999-9999-9999-9999-999999999999', -- Reporte 9 aca
        'c5555555-5555-5555-5555-555555555555', 
        'REP-2026-0009',
        'Restos de chatarra electrónica (monitores antiguos y cables) tirados al pie de un poste de luz.', 
        '',
        '/uploads/reports/c5555555-5555-5555-5555-555555555555/basural10.jpg', 
        NOW() - INTERVAL '12 days', 
        'Verificado', 
        'Av. Américo Vespucio 1100',
        'Las Condes', 
        ST_SetSRID(ST_MakePoint(-70.5791, -33.4118), 4326)
    ),
    (
        '00111111-1111-1111-1111-111111111111', -- Reporte 10
        'c5555555-5555-5555-5555-555555555555', 
        'REP-2026-0010',
        'Neumáticos usados abandonados en la berma de la autopista. Riesgo de incendio e insalubridad.', 
        '',
        '/uploads/reports/c5555555-5555-5555-5555-555555555555/basural11.jpg', 
        NOW() - INTERVAL '4 hours', 
        'Pendiente', 
        'Av. Concha y Toro 450',
        'Puente Alto', 
        ST_SetSRID(ST_MakePoint(-70.5772, -33.6167), 4326)
    );

-- 4. INSERTAR HISTORIAL DE CAMBIOS (Para alimentar la línea de tiempo/Timeline de la app)
INSERT INTO validacion_reportes (id, reporte_id, usuario_id, fecha, estado_asignado, comentario)
VALUES 
    -- Línea de tiempo para el Reporte 1 ('Verificado')
    (gen_random_uuid(), '01111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '3 days', 'Pendiente', 'Reporte creado.'),
    (gen_random_uuid(), '01111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'Pendiente', 'Inspección visual realizada. Se confirma acumulación crítica de residuos.'),
    (gen_random_uuid(), '01111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', 'Verificado', 'Asignado al camión recolector de la Zona Norte. Despliegue programado.'),

    -- Línea de tiempo para el Reporte 2 ('Pendiente')
    (gen_random_uuid(), '02222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '1 day', 'Pendiente', 'Reporte creado.'),

    -- Línea de tiempo para el Reporte 3 ('Rechazado')
    (gen_random_uuid(), '03333333-3333-3333-3333-333333333333', 'c2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '5 days', 'Pendiente', 'Reporte creado.'),
    (gen_random_uuid(), '03333333-3333-3333-3333-333333333333', 'a2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '4 days', 'Rechazado', 'Reporte invalidado. Ya ha sido reportado por otro usuario.'),

    -- Línea de tiempo para el Reporte 4 ('Pendiente')
    (gen_random_uuid(), '04444444-4444-4444-4444-444444444444', 'c3333333-3333-3333-3333-333333333333', NOW() - INTERVAL '1 day', 'Pendiente', 'Reporte creado.'),

    -- Línea de tiempo para el Reporte 5 ('Pendiente')
    (gen_random_uuid(), '05555555-5555-5555-5555-555555555555', 'c3333333-3333-3333-3333-333333333333', NOW() - INTERVAL '1 day', 'Pendiente', 'Reporte creado.'),

    -- Línea de tiempo para el Reporte 6 ('Verificado')
    (gen_random_uuid(), '06666666-6666-6666-6666-666666666666', 'c3333333-3333-3333-3333-333333333333', NOW() - INTERVAL '3 days', 'Pendiente', 'Reporte creado.'),
    (gen_random_uuid(), '06666666-6666-6666-6666-666666666666', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'Pendiente', 'Inspección visual realizada. Se confirma acumulación crítica de residuos.'),
    (gen_random_uuid(), '06666666-6666-6666-6666-666666666666', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', 'Verificado', 'Asignado al camión recolector de la Zona Norte. Despliegue programado.'),

    -- Línea de tiempo para el Reporte 7 ('Rechazado')
    (gen_random_uuid(), '07777777-7777-7777-7777-777777777777', 'c4444444-4444-4444-4444-444444444444', NOW() - INTERVAL '5 days', 'Pendiente', 'Reporte creado.'),
    (gen_random_uuid(), '07777777-7777-7777-7777-777777777777', 'a2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '4 days', 'Rechazado', 'Reporte invalidado. Ya ha sido reportado por otro usuario.'),

    -- Línea de tiempo para el Reporte 8 ('Verificado')
    (gen_random_uuid(), '08888888-8888-8888-8888-888888888888', 'c4444444-4444-4444-4444-444444444444', NOW() - INTERVAL '3 days', 'Pendiente', 'Reporte creado.'),
    (gen_random_uuid(), '08888888-8888-8888-8888-888888888888', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'Pendiente', 'Inspección visual realizada. Se confirma acumulación crítica de residuos.'),
    (gen_random_uuid(), '08888888-8888-8888-8888-888888888888', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', 'Verificado', 'Asignado al camión recolector de la Zona Norte. Despliegue programado.'),

    -- Línea de tiempo para el Reporte 9 ('Verificado')
    (gen_random_uuid(), '09999999-9999-9999-9999-999999999999', 'c5555555-5555-5555-5555-555555555555', NOW() - INTERVAL '3 days', 'Pendiente', 'Reporte creado.'),
    (gen_random_uuid(), '09999999-9999-9999-9999-999999999999', 'a2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '2 days', 'Pendiente', 'Inspección visual realizada. Se confirma acumulación crítica de residuos.'),
    (gen_random_uuid(), '09999999-9999-9999-9999-999999999999', 'a2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '1 day', 'Verificado', 'Asignado al camión recolector de la Zona Norte. Despliegue programado.'),

    -- Línea de tiempo para el Reporte 10 ('Pendiente')
    (gen_random_uuid(), '00111111-1111-1111-1111-111111111111', 'c5555555-5555-5555-5555-555555555555', NOW() - INTERVAL '1 day', 'Pendiente', 'Reporte creado.');

-- 5. INSERTAR COMENTARIOS INTERNOS (Exclusivos para Admins - HU021)
INSERT INTO comentarios_internos (id, reporte_id, admin_id, comentario, fecha_creacion)
VALUES 
    (gen_random_uuid(),'01111111-1111-1111-1111-111111111111','a1111111-1111-1111-1111-111111111111','Ojo: Este cuadrante presenta reincidencia semanal. Reportar a fiscalización si vuelve a ocurrir.', NOW() - INTERVAL '1 day'),
    (gen_random_uuid(),'03333333-3333-3333-3333-333333333333','a2222222-2222-2222-2222-222222222222','Revisando cámaras de seguridad del sector para identificar la patente del camión que dejó los escombros. Dejar en pendiente hasta tener la patente para cursar la multa.',NOW() - INTERVAL '18 hours'),
    (gen_random_uuid(),'06666666-6666-6666-6666-666666666666','a1111111-1111-1111-1111-111111111111','Se rechaza el reporte porque la ubicación exacta corresponde a un recinto privado (fábrica fuera de servicio). Se notificó formalmente al dueño del recinto para que limpie su fachada.',NOW() - INTERVAL '4 days'),
    (gen_random_uuid(),'07777777-7777-7777-7777-777777777777','a2222222-2222-2222-2222-222222222222','El equipo de aseo vecinal ya retiró las bolsas rotas. Se sugiere enviar patrullaje de seguridad comunitaria para fiscalizar a los vecinos que sacan la basura fuera de horario.',NOW() - INTERVAL '5 days'),
    (gen_random_uuid(),'08888888-8888-8888-8888-888888888888','a1111111-1111-1111-1111-111111111111','Reporte duplicado. Los colchones ya habían sido reportados en el caso #REP-2026-0032 por el inspector de zona. Se cierra este hilo para evitar duplicidad de cuadrillas.',NOW() - INTERVAL '10 hours');