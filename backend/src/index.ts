// backend/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import reporteRoutes from './routes/reporteRoutes';
import authRoutes from './routes/authRoutes';

// Inicializar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender formato JSON en el body de las peticiones
app.use(express.json());

app.use('/api/auth', authRoutes);
// Enlazar las rutas de los reportes
app.use('/api/reportes', reporteRoutes);

// Ruta base de prueba para verificar que el servidor responda
app.get('/', (_req, res) => {
    res.send('Servidor del Backend funcionando correctamente 🚀');
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`====== SERVIDOR INICIADO ======`);
    console.log(`Listening on: http://localhost:${PORT}`);
    console.log(`===============================`);
});