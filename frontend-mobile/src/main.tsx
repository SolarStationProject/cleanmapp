import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('No se encontró el elemento raíz "root" en el DOM.');
}

// Arranca React directamente e inyecta el enrutador principal de la app móvil
createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    </StrictMode>
);
