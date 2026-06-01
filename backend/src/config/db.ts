// backend/src/config/db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Cargamos las variables del archivo .env
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD || '', 
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Probar la conexión al iniciar el servidor
pool.query('SELECT NOW()', (err, _res) => {
    if (err) {
        console.error('❌ Error al conectar a PostgreSQL:', err.stack);
    } else {
        console.log('✅ Conexión a PostgreSQL establecida con éxito');
    }
});

export default pool;