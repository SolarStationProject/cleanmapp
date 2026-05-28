// @ts-ignore
// 1. Importamos todas las imágenes en un solo lugar
import logo from './images/cleanmap-logo.jpg';

// 2. Las exportamos dentro de un objeto organizado
export const IMAGES = {
    logo
} as const; // "as const" asegura que TypeScript no permita modificar estas rutas por error