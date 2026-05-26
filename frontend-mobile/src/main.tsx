import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// NOTA: Cuando vayas a usar tus componentes reales, descomenta estas líneas:
// import { AuthProvider } from './app/providers/AuthProvider';
// import { TrackingProvider } from './app/providers/TrackingProvider';
// import AppRoutes from './app/routes/AppRoutes';

// Importante: No olvides descomentar tu archivo CSS para que Tailwind funcione
// import './index.css'; 

const renderApp = (): void => {
    const rootElement = document.getElementById('root');

    if (!rootElement) {
        throw new Error('No se encontró el elemento raíz "root" en el DOM.');
    }

    createRoot(rootElement).render(
        <StrictMode>
            <BrowserRouter>
                {/* 
                  VISTA TEMPORAL DE PRUEBA:
                  Si tienes activo tu index.css con Tailwind, esto se verá como una app móvil real.
                */}
                <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 p-6 text-center text-white">
                    <div className="mb-4 text-6xl">📍</div>
                    <h1 className="text-2xl font-bold tracking-tight text-emerald-400">CleanMap Mobile</h1>
                    <p className="mt-2 text-sm text-slate-400">¡Conexión exitosa con tu celular!</p>
                    
                    <button 
                        onClick={() => alert("¡El botón táctil funciona perfectamente!")}
                        className="mt-8 w-full max-w-xs rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 shadow-lg active:bg-emerald-600"
                    >
                        Probar Toque
                    </button>
                </div>
                {/* 
                  Cuando vayas a usar tus rutas reales, borra el <div> de arriba y descomenta esto:
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

// Arranca la aplicación directamente. Vite y Capacitor gestionan el puente de hardware de forma asíncrona.
renderApp();
