import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
//import morgan from 'morgan';
import dotenv from 'dotenv';

// 1. Cargar variables de entorno
dotenv.config();

const server: Application = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares Globales de Seguridad y Utilidad
server.use(helmet()); // Protege la API configurando varias cabeceras HTTP
server.use(cors({
    // En producción, restringe esto a los dominios reales de tu Web y la app de Capacitor
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
server.use(express.json()); // Parsea bodies con formato JSON
server.use(express.urlencoded({ extended: true })); // Parsea cuerpos codificados en URL
//server.use(morgan('dev')); // Logger de peticiones HTTP en consola

// 3. Enrutamiento Principal (Conexión con tus módulos de negocio)
// TODO: Importar tus rutas reales desde ./modules/auth/auth.routes y ./modules/reports/reports.routes
// Ejemplo de cómo conectarías tus módulos reales:
// server.use('/api/auth', authRoutes);
// server.use('/api/reports', reportsRoutes);

// 4. Inicialización del Servidor HTTP
server.listen(PORT, () => {
    console.log(`Servidor CleanMap corriendo en http://localhost:${PORT}`);
});

export default server;
