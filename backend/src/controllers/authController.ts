import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db'; // <-- Verifica que esta ruta apunte a tu conexión de PostgreSQL

export const login = async (req: Request, res: Response) => {
    try {
        // 1. Extraemos los datos que envía la petición
        const { email, password, plataforma } = req.body;

        // Validación básica de campos vacíos
        if (!email || !password || !plataforma) {
            return res.status(400).json({ 
                error: "Faltan datos requeridos (email, password o plataforma)" 
            });
        }

        // 2. BUSCAR USUARIO EN LA BASE DE DATOS
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        // Si la base de datos no devuelve nada, el correo no existe
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        
        // Guardamos al usuario encontrado en una constante
        const usuario = result.rows[0];

        // 3. VERIFICAR CONTRASEÑA
        // (Nota: Si en el futuro usas contraseñas encriptadas, aquí iría la validación con bcrypt)
        if (password !== usuario.password) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // 4. CONTROL DE ACCESO POR PLATAFORMA Y ROL

        // Regla 1: Administrador intentando entrar desde algo que no es 'web'
        if (usuario.rol === 'Administrador' && plataforma !== 'web') {
            return res.status(403).json({ 
                error: "Acceso denegado. Los administradores solo pueden gestionar el sistema desde la plataforma web." 
            });
        }

        // Regla 2: Ciudadano intentando entrar desde algo que no es 'movil'
        if (usuario.rol === 'Ciudadano' && plataforma !== 'movil') {
            return res.status(403).json({ 
                error: "Plataforma incorrecta",
                accion: "redirigir_descarga",
                mensaje: "Para reportar incidentes, por favor descarga nuestra aplicación móvil."
            });
        }

        // 5. GENERACIÓN DEL TOKEN 
        const payload = {
            id: usuario.id,
            rol: usuario.rol
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET || 'tu_clave_secreta_super_segura', 
            { expiresIn: '2h' }
        );

        // ==========================================
        // 6. RESPUESTA EXITOSA
        // ==========================================
        return res.json({
            mensaje: "Login exitoso",
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};