import { Request, Response } from 'express';
import pool from '../config/db'; // Ajusta esta ruta a donde tengas tu conexión

// Definimos la estructura de lo que esperamos recibir del frontend
interface ActualizarEstadoBody {
    nuevoEstado: string;
    comentario?: string;
}

// Extendemos Request para incluir el usuario que inyecta tu middleware de autenticación
interface AuthRequest extends Request {
    usuario?: {
        id: number; // O string, si usan UUID en PostgreSQL
    };
}

export const actualizarEstadoReporte = async (req: AuthRequest, res: Response): Promise<void> => {
    const reporteId = req.params.id;
    const { nuevoEstado, comentario } = req.body as ActualizarEstadoBody;
    
    // Verificación de seguridad rápida
    if (!req.usuario) {
        res.status(401).json({ error: "No autorizado" });
        return;
    }
    const adminId = req.usuario.id;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const updateQuery = `
            UPDATE reportes 
            SET estado = $1 
            WHERE id = $2 
            RETURNING id, ciudadano_id, coordenadas;
        `;
        const resReporte = await client.query(updateQuery, [nuevoEstado, reporteId]);
        
        if (resReporte.rowCount === 0) {
            await client.query('ROLLBACK');
            res.status(404).json({ error: "Reporte no encontrado" });
            return;
        }

        const reporteActualizado = resReporte.rows[0];

        const insertHistorialQuery = `
            INSERT INTO historial_reportes (reporte_id, usuario_admin_id, nuevo_estado, comentario, fecha_cambio)
            VALUES ($1, $2, $3, $4, NOW());
        `;
        await client.query(insertHistorialQuery, [
            reporteId, 
            adminId, 
            nuevoEstado, 
            comentario || null
        ]);

        await client.query('COMMIT');

        res.status(200).json({
            mensaje: "Estado actualizado correctamente",
            reporte: reporteActualizado
        });

        // (Aquí irían los llamados a tus funciones asíncronas de notificación y sockets)

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error en la transacción:", error);
        res.status(500).json({ error: "Hubo un error interno al procesar la solicitud" });
    } finally {
        client.release();
    }
};