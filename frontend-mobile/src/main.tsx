import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import { AuthProvider } from './app/providers/AuthProvider';
//import { TrackingProvider } from './app/providers/TrackingProvider';
//import AppRoutes from './app/routes/AppRoutes';
//import './index.css';

// Función para inicializar y montar la aplicación de forma segura
const renderApp = (): void => {
    const rootElement = document.getElementById('root');

    if (!rootElement) {
        throw new Error('No se encontró el elemento raíz "root" en el DOM.');
    }

    createRoot(rootElement).render(
        <StrictMode>
            <BrowserRouter>
            {/*                
                <AuthProvider>
                    <TrackingProvider>
                        <AppRoutes />
                    </TrackingProvider>
                </AuthProvider>
            */}
            </BrowserRouter>
        </StrictMode>
    );
};

// Inicialización del entorno nativo del dispositivo (Capacitor / WebView)
if (window.hasOwnProperty('Capacitor')) {
    // Espera a que los plugins de hardware (GPS, Cámara) estén enlazados
    document.addEventListener('deviceready', renderApp, false);
} else {
    // Modo desarrollo en el navegador de la PC (Vite local)
    renderApp();
}
