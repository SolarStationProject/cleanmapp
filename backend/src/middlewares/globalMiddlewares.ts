import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';

export const globalMiddlewares = (server: Application): void => {
    // Seguridad de cabeceras HTTP
    server.use(helmet());

    // Configuración de CORS
    server.use(cors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Parseo de contenido
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
};
