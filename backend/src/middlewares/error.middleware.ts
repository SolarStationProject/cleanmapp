import { Request, Response, NextFunction } from 'express';

// Definir una interfaz para errores con código de estado opcional
interface CustomError extends Error {
    status?: number;
    statusCode?: number;
}

export const errorHandler = (
    err: CustomError, 
    req: Request, 
    res: Response, 
    _next: NextFunction //se usa "_" para declararlo, a pesar de no ser usado
): void => {
    // 1. Normalizar NODE_ENV para evitar errores de espacios en blanco
    const env = (process.env.NODE_ENV || 'development').trim().toLowerCase();
    const isProduction = env === 'production';

    // 2. Determinar el código de estado (prioriza el error, luego la respuesta, por defecto 500)
    const errStatus = err.status || err.statusCode || res.statusCode;
    const statusCode = errStatus === 200 || !errStatus ? 500 : errStatus;
    
    // Log del error en consola para debugging
    console.error(`[API Error] [${req.method}] ${req.url} - ${err.message}`);

    // 3. Responder al cliente
    res.status(statusCode).json({
        success: false,
        message: isProduction ? 'Error interno del servidor' : err.message,
        ...(!isProduction && { stack: err.stack })
    });
};
