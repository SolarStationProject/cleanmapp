import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    _next: NextFunction //Se usa el "_" para declararlo y evitar "se declara, pero no se usa"
): void => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    console.error(`[API Error] [${req.method}] ${req.url} - ${err.message}`);

    res.status(statusCode).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Error interno del servidor' 
            : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};