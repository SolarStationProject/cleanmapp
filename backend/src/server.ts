import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';

//Importación de rutas
import reportsRoutes from './modules/reports/reports.routes' //reportsRoutes es un alias de la ruta

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
server.use('/api/reports', reportsRoutes)

// 2. Servir archivos estáticos (Imágenes de reportes)
// Hace que backend/uploads/ sea accesible desde http://localhost:3000/uploads/
server.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Middleware modularizado de errores (Siempre al final de las rutas)
server.use(errorHandler);

// Inicialización del Servidor HTTP
server.listen(PORT, () => {
    console.log(`Servidor CleanMap corriendo en http://localhost:${PORT}`);
});

export default server;

//Desde /backend en la terminal, usar: npx ts-node src/server.ts