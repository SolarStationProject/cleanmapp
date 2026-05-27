import { useNavigate } from 'react-router-dom';

export default function MapScreen() {
    const navigate = useNavigate();

    return (
        <div className="flex h-full w-full flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
            {/* CONTENEDOR DEL MAPA (Aquí es donde inyectarás Leaflet más adelante) */}
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                {/* Marcador de posición visual temporal */}
                <div className="text-center p-6 space-y-2 select-none pointer-events-none">
                    <span className="text-5xl animate-pulse inline-block">🗺️</span>
                    <p className="text-sm font-semibold text-slate-400">Aquí se cargará tu Mapa de Leaflet</p>
                    <p className="text-xs text-slate-600">Consultando PostgreSQL API...</p>
                </div>
            </div>

            {/* BOTONES FLOTANTES SOBRE EL MAPA (Estilo App Nativa) */}

            {/* Botón Volver arriba a la izquierda */}
            <button
                onClick={() => navigate('/home')}
                className="absolute top-6 left-6 h-10 w-10 bg-slate-900/90 backdrop-blur rounded-full border border-slate-800 flex items-center justify-center shadow-xl active:scale-95"
            >
                ⬅️
            </button>

            {/* Buscador Superior Flotante */}
            <div className="absolute top-6 left-20 right-6">
                <input
                    type="text"
                    placeholder="Buscar dirección o punto limpio..."
                    className="w-full h-10 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl px-4 text-xs shadow-xl focus:outline-none focus:border-emerald-500/50"
                />
            </div>

            {/* Botón Flotante para Centrar GPS abajo a la derecha */}
            <button
                onClick={() => alert("Buscando señal GPS a través de Capacitor...")}
                className="absolute bottom-24 right-6 h-12 w-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/20 active:scale-95 text-lg font-bold"
            >
                🎯
            </button>

            {/* BARRA DE NAVEGACIÓN INFERIOR (BOTTOM TABS) */}
            <nav className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex items-center justify-around px-6 z-10">
                <button onClick={() => navigate('/home')} className="flex flex-col items-center text-slate-400 active:text-white">
                    <span className="text-xl">🏠</span>
                    <span className="text-[10px] font-medium mt-0.5">Inicio</span>
                </button>
                <button className="flex flex-col items-center text-emerald-400">
                    <span className="text-xl">🗺️</span>
                    <span className="text-[10px] font-medium mt-0.5">Mapa</span>
                </button>
                <button onClick={() => navigate('/perfil')} className="flex flex-col items-center text-slate-400 active:text-white">
                    <span className="text-xl">👤</span>
                    <span className="text-[10px] font-medium mt-0.5">Perfil</span>
                </button>
            </nav>
        </div>
    );
}
