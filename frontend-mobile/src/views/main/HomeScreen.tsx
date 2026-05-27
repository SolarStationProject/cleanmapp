import { useNavigate } from 'react-router-dom';
import { MyReportsList } from '../../components/users/MyReportsList';

export default function HomeScreen() {
    const navigate = useNavigate();

    return (
        /* 
          1. CAMBIO RADICAL: Quitamos "fixed" y controlamos el tamaño con Viewport Height (h-screen)
          Esto rompe el bug de WebNative al no pelear con los bordes absolutos del contenedor del simulador.
        */
        <div className="w-full h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
            
            {/* Cabecera Móvil - Fija en el tope */}
            <header className="w-full px-6 pt-6 pb-4 border-b border-slate-900 shrink-0 bg-slate-950/80 backdrop-blur">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400">¡Hola, Ciudadano!</p>
                        <h2 className="text-lg font-bold text-white">Dashboard CleanMap</h2>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                        U
                    </div>
                </div>
            </header>

            {/* 
              2. EL MOTOR DE ESCAPE TÁCTIL: 
              Usamos "h-[calc(100vh-8rem)]" para obligar al contenedor central a medir exactamente 
              el tamaño del celular menos la cabecera y el menú. Esto NO PUEDE fallar.
            */}
            <main className="w-full h-[calc(100vh-8rem)] overflow-y-scroll px-6 py-4 space-y-6 pb-32">

                {/* Tarjetas de Resumen */}
                <div className="grid grid-cols-2 gap-4 shrink-0">
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
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-500/10 active:scale-[0.97] transition-all flex items-center justify-center gap-3 text-base shrink-0">
                    <span className="text-xl">📸</span> Reportar Microbasural
                </button>

                {/* Actividad Reciente / Tu Listado */}
                <div className="space-y-3 pb-6">
                    <h3 className="text-sm font-semibold text-slate-300">Mis Reportes Recientes</h3>
                    <MyReportsList />
                </div>
            </main>

            {/* 3. MENÚ INFERIOR FIJO: Pegado al fondo usando z-index alto para evitar bugs de WebNative */}
            <nav className="w-full h-16 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex items-center justify-around px-6 shrink-0 z-50">
                <button className="flex flex-col items-center text-emerald-400">
                    <span className="text-xl">🏠</span>
                    <span className="text-[10px] font-medium mt-0.5">Inicio</span>
                </button>
                <button onClick={() => navigate('/map')} className="flex flex-col items-center text-slate-400 active:text-white">
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

