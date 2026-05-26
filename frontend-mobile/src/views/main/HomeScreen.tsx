import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
    const navigate = useNavigate();

    return (
        <div className="flex h-full w-full flex-col bg-slate-950 text-slate-100 overflow-hidden">
            {/* Cabecera Móvil */}
            <header className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-900">
                <div>
                    <p className="text-xs text-slate-400">¡Hola, Ciudadano!</p>
                    <h2 className="text-lg font-bold text-white">Dashboard CleanMap</h2>
                </div>
                <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                    U
                </div>
            </header>

            {/* Contenido con Scroll Independiente */}
            <main className="flex-1 overflow-y-auto px-6 py-4 space-y-6 pb-24">

                {/* Tarjeta de Resumen */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                        <span className="text-2xl">⚠️</span>
                        <p className="text-xs text-slate-400 mt-2">Mis Reportes</p>
                        <p className="text-xl font-bold text-white">4 Activos</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                        <span className="text-2xl">✨</span>
                        <p className="text-xs text-slate-400 mt-2">Zonas Limpias</p>
                        <p className="text-xl font-bold text-emerald-400">+12 esta semana</p>
                    </div>
                </div>

                {/* Botón de Acción Principal Móvil */}
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-500/10 active:scale-[0.98] transition-transform flex items-center justify-center gap-3 text-base">
                    <span className="text-xl">📸</span> Reportar Microbasural
                </button>

                {/* Actividad Reciente */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">Últimas alertas en tu comuna</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-900">
                            <div className="bg-amber-500/10 text-amber-500 p-2 rounded-lg text-sm">🗑️</div>
                            <div className="flex-1">
                                <p className="text-xs font-medium text-white">Acumulación de escombros</p>
                                <p className="text-[10px] text-slate-500">A 300m de tu ubicación</p>
                            </div>
                            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Pendiente</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* BARRA DE NAVEGACIÓN INFERIOR (BOTTOM TABS) */}
            <nav className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex items-center justify-around px-6">
                <button className="flex flex-col items-center text-emerald-400">
                    <span className="text-xl">🏠</span>
                    <span className="text-[10px] font-medium mt-0.5">Inicio</span>
                </button>
                <button onClick={() => navigate('/mapa')} className="flex flex-col items-center text-slate-400 active:text-white">
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
