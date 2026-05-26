import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        // Simula la carga de la app (cargar mapa, verificar sesión, etc.)
        const timer = setTimeout(() => {
            navigate('/home'); // Redirige al Home automáticamente
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 text-white select-none">
            {/* Contenedor del Logo Animado */}
            <div className="animate-bounce text-7xl bg-slate-800 p-6 rounded-full shadow-2xl border border-emerald-500/20">
                🗺️
            </div>

            {/* Título de la App */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-wider text-emerald-400">
                CleanMap
            </h1>

            <p className="mt-2 text-sm text-slate-400 font-medium tracking-wide">
                Ciudadanos por un entorno limpio
            </p>

            {/* Indicador de carga sutil abajo */}
            <div className="absolute bottom-12 flex flex-col items-center">
                <div className="h-1 w-24 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-1/2 animate-infinite-scroll rounded-full bg-emerald-500 [animation:loading_1.5s_infinite_ease-in-out]"></div>
                </div>
            </div>
        </div>
    );
}
