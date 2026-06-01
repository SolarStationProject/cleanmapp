// backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos Request para que TypeScript no se queje de que 'req.usuario' no existe
interface AuthRequest extends Request {
    usuario?: {
        id: number;
        rol: string;
    };
}

export const verificarRolAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    console.log("--- HEADER AUTHORIZATION ---", req.header('Authorization'));
    // 1. Obtener el token del header (Formato esperado: "Bearer <token>")
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
        return;
    }

    // Extraemos solo la parte del token
    const token = authHeader.split(' ')[1];

    try {
        // 2. Verificar que el token sea válido y no haya expirado
        // IMPORTANTE: El secreto debe coincidir con el que usan en su archivo .env al hacer el login
        const secret = process.env.JWT_SECRET || 'secreto_temporal_de_desarrollo';
        
        // Decodificamos el token (esperamos que contenga el id y el rol del usuario)
        const decodificado = jwt.verify(token, secret) as { id: number, rol: string };

        // 3. Validar la precondición de tu tabla: ¿Es Administrador?
        if (decodificado.rol !== 'Administrador') {
            res.status(403).json({ error: "Acceso denegado. Permisos insuficientes." });
            return;
        }

        // 4. Guardamos la info del usuario en la request para que el reporteController pueda usar req.usuario.id
        req.usuario = decodificado;

        // 5. Todo está correcto, pasamos el control a la siguiente función (tu controlador)
        next();
        
    } catch (error) {
        // Si jwt.verify falla (token modificado o expirado), cae aquí
        res.status(401).json({ error: "Token inválido o expirado." });
    }
};