import { db } from '../../config/database';
import { Reporte, DetalleReporteResponse, ValidacionReporte } from '../../shared/types';

// Obtiene la lista de reportes creados por un ciudadano específico.
export async function findByOwnReportesId(ciudadanoId: string): Promise<Reporte[]> {
    const queryText = `
        SELECT 
            r.id,
            r.ciudadano_id,
            r.codigo,
            r.descripcion,
            r.foto,
            r.fecha_creacion::text as fecha_creacion,
            r.estado,
            r.direccion,
            r.comuna,
            ST_Y(geom) as latitud, -- Extrae latitud desde PostGIS
            ST_X(geom) as longitud, -- Extrae longitud desde PostGIS
            u.nombre,
            u.rol
        FROM reportes r
        INNER JOIN usuarios u
            ON r.ciudadano_id = u.id -- Vincula el reporte con su usuario
        WHERE r.ciudadano_id = $1
        ORDER BY r.fecha_creacion DESC;
    `;
    
    const result = await db.query(queryText, [ciudadanoId]);
    return result.rows as Reporte[];
}

// Obtiene el detalle completo de un reporte por su ID, incluyendo su línea de tiempo.
// Retorna el objeto o null si no existe.
export async function findDetailsByReporteId(reporteId: string): Promise<DetalleReporteResponse | null> {
    const queryText = `
        SELECT 
            r.id,
            r.ciudadano_id,
            r.codigo,
            r.descripcion,
            r.foto,
            r.fecha_creacion::text as fecha_creacion,
            r.estado,
            r.direccion,
            r.comuna,
            ST_Y(r.geom) as latitud,
            ST_X(r.geom) as longitud,
            
            COALESCE(
                (
                    SELECT json_agg(json_build_object(
                        'id', v.id,
                        'reporte_id', v.reporte_id,
                        'usuario_id', v.usuario_id,
                        'usuario_nombre', u.nombre,
                        'fecha', v.fecha::text,
                        'estado_asignado', v.estado_asignado,
                        'comentario', v.comentario
                    ) ORDER BY v.fecha DESC)
                    FROM validacion_reportes v
                    LEFT JOIN usuarios u ON v.usuario_id = u.id
                    WHERE v.reporte_id = r.id
                ), 
                '[]'::json
            ) as historial_cambios
        FROM reportes r
        WHERE r.id = $1;
    `;
    
    const result = await db.query(queryText, [reporteId]); // Usamos el id del reporte
    if (result.rows.length === 0) return null;
    
    return result.rows[0] as DetalleReporteResponse; // Retorna un solo objeto detallado
}

// Registra un nuevo hito en el historial de cambios del reporte.
export async function addChangeHistorialReportesId(
    reporteId: string, 
    usuarioId: string, 
    estadoAsignado: string, 
    comentario: string
): Promise<Partial<ValidacionReporte>> { // Tipado de retorno real de la tabla validaciones
    const queryText = `
        INSERT INTO validacion_reportes (
            id, 
            reporte_id, 
            usuario_id, 
            fecha, 
            estado_asignado, 
            comentario
        )
        VALUES (
            gen_random_uuid(), 
            $1, 
            $2, 
            NOW(), 
            $3, 
            $4
        )
        RETURNING id, fecha::text;
    `;
    
    // Ahora el arreglo tiene los 4 parámetros que exige el query en orden numérico
    const result = await db.query(queryText, [reporteId, usuarioId, estadoAsignado, comentario]);
    return result.rows[0];
}

// Actualiza el estado principal del reporte en la tabla madre.
export async function updatedEstadoReportesId(reporteId: string, nuevoEstado: string): Promise<string> {
    const queryText = `
        UPDATE reportes
        SET estado = $1
        WHERE id = $2
        RETURNING estado;
    `;
    
    // Mapeo correcto de los parámetros [$1 = nuevoEstado, $2 = reporteId]
    const result = await db.query(queryText, [nuevoEstado, reporteId]);
    return result.rows[0].estado;
}

/*
interface InsertReportParams {
    ciudadano_id: string;
    descripcion?: string;
    direccion: string;
    comuna: string;
    latitud: number;
    longitud: number;
    foto?: string;
}

export const insertReport = async (data: InsertReportParams) => {
    // Generamos un código corto aleatorio para el reporte (ej: REP-7492)
    const codigoGenerado = `REP-${Math.floor(1000 + Math.random() * 9000)}`;

    const query = `
    INSERT INTO reportes (
      id, 
      ciudadano_id, 
      codigo, 
      descripcion, 
      direccion, 
      comuna, 
      latitud, 
      longitud, 
      foto, 
      estado, 
      fecha_creacion
    ) 
    VALUES (
      gen_random_uuid(), -- Genera el UUID en PostgreSQL
      $1, $2, $3, $4, $5, $6, $7, $8, 
      'Pendiente',        -- Todo reporte inicia en 'Pendiente'
      NOW()               -- Timestamp actual
    )
    RETURNING *; -- Nos devuelve el reporte recién creado con su ID e información completa
  `;

    const values = [
        data.ciudadano_id,
        codigoGenerado,
        data.descripcion || null,
        data.direccion,
        data.comuna,
        data.latitud,
        data.longitud,
        data.foto || null // Si no subió foto, se guarda como NULL en PostgreSQL
    ];

    const result = await pool.query(query, values);
    return result.rows[0]; // Retorna el registro creado
};
*/