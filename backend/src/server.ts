import express, { Application } from 'express';
//import morgan from 'morgan';
import dotenv from 'dotenv';

//Importación de middlewares modularizados
import { errorHandler, globalMiddlewares } from './middlewares';

//Importación de base de datos PostgreSQL
import './config/database';

// Cargar variables de entorno
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const server: Application = express();

// Middlewares globales de seguridad y ytilidad
globalMiddlewares(server);

// Enrutamiento Principal (Conexión con tus módulos de negocio)
// TODO: Importar tus rutas reales desde ./modules/auth/auth.routes y ./modules/reports/reports.routes
// Ejemplo de cómo conectarías tus módulos reales:
// server.use('/api/auth', authRoutes);
// server.use('/api/reports', reportsRoutes);

// Middleware de manejo de errores global (Debe ir AL FINAL de las rutas)
// Middleware modularizado de errores (Siempre al final de las rutas)
server.use(errorHandler);

// Inicialización del Servidor HTTP
server.listen(PORT, () => {
    console.log(`Servidor CleanMap corriendo en http://localhost:${PORT}`);
});

export default server;

//Desde /backend en la terminal, usar: npx ts-node src/server.ts