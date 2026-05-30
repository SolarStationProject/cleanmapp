import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        // 1. Obtenemos el id del ciudadano desde el cuerpo de la petición o del token
        const { ciudadano_id } = req.body;

        // 2. Definimos la ruta dinámica: uploads/reportes/UUID-DEL-USUARIO
        const dir = path.join(__dirname, `../uploads/reports/${ciudadano_id}`);

        // 3. Si la carpeta del usuario no existe en el disco duro, la creamos al instante
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        // 4. Renombramos el archivo con un timestamp único para evitar duplicados
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `reporte-${uniqueSuffix}${ext}`);
    }
});

export const upload = multer({ storage });
