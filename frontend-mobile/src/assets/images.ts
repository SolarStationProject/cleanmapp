// @ts-ignore
import logo from './images/cleanmap-logo.jpg';
// @ts-ignore
import basural1 from './images/basural1.jpg';

// 2. Las exportamos dentro de un objeto organizado
export const IMAGES = {
    logo,
    // Marcadores de posición (placeholders) por si un reporte no tiene foto
    //noImage: 'https://placeholder.com',
    // Datos simulados (mocks) para tus pruebas locales en VSC / Capacitor
    basural1
} as const; // "as const" asegura que TypeScript no permita modificar estas rutas por error