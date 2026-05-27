import { useState } from 'react';
import { CitizenReport } from '../../shared/types';
import BottomSheet from '../ui/BottomSheet';

// Datos de prueba (Mocks) que simulan venir de tu base de datos PERN
const MOCK_REPORTS: CitizenReport[] = [
    {
        id: 'rep-102',
        title: 'Microbasural en Esquina San José',
        referenceCode: '#CLM-2026-004',
        currentStatus: 'en_progreso',
        createdAt: '2026-05-20',
        history: [
            { id: 'h1', status: 'en_progreso', changeDate: '24 Mayo, 2026 - 14:30', assignedTo: 'Inspector Juan Pérez (Municipio)', comment: 'Cuadrilla asignada para retiro el día de mañana.' },
            { id: 'h2', status: 'pendiente', changeDate: '20 Mayo, 2026 - 09:15', assignedTo: 'Sistema CleanMap', comment: 'Reporte ingresado correctamente por el ciudadano.' }
        ]
    },
    {
        id: 'rep-101',
        title: 'Escombros acumulados en la plaza',
        referenceCode: '#CLM-2026-001',
        currentStatus: 'resuelto',
        createdAt: '2026-05-10',
        history: [
            { id: 'h3', status: 'resuelto', changeDate: '15 Mayo, 2026 - 11:00', assignedTo: 'Depto. Aseo y Ornato', comment: 'Área completamente limpia y despejada.' },
            { id: 'h4', status: 'en_progreso', changeDate: '12 Mayo, 2026 - 16:00', assignedTo: 'Supervisor Luis Gómez', comment: 'En espera de camión tolva.' },
            { id: 'h5', status: 'pendiente', changeDate: '10 Mayo, 2026 - 18:22', assignedTo: 'Sistema CleanMap', comment: 'Reporte ingresado.' }
        ]
    }
];

const STATUS_COLORS = {
    pendiente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    en_progreso: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    resuelto: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rechazado: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
};

export default function MyReportsList() {
    const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(null);

    return (
        <div className="w-full h-auto flex flex-col gap-3">
            {MOCK_REPORTS.map((report) => (
                <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className="w-full p-4 bg-slate-900 rounded-2xl border border-slate-800/80 active:bg-slate-800/50 transition-all flex flex-col justify-between gap-3 shrink-0"
                >
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <span className="text-[10px] font-mono text-slate-500 tracking-wider">{report.referenceCode}</span>
                            <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">{report.title}</h4>
                        </div>
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[report.currentStatus]}`}>
                            {report.currentStatus.replace('_', ' ').toUpperCase()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/50 pt-2">
                        <span>Creado: {report.createdAt}</span>
                        <span className="text-emerald-400 font-medium">Ver historial ↗</span>
                    </div>
                </div>
            ))}

            {/* HOJA INFERIOR DE DETALLES: Se queda intacta */}
            {selectedReport && (
                <BottomSheet isOpen={!!selectedReport} onClose={() => setSelectedReport(null)}>
                    <div className="p-6 text-slate-100 space-y-6">
                        <div>
                            <span className="text-xs font-mono text-slate-500">{selectedReport.referenceCode}</span>
                            <h3 className="text-lg font-extrabold text-white mt-1">{selectedReport.title}</h3>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-slate-400">Estado Actual:</span>
                                <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${STATUS_COLORS[selectedReport.currentStatus]}`}>
                                    {selectedReport.currentStatus.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* HISTORIAL DE CAMBIOS CON FECHAS Y RESPONSABLES */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Línea de Tiempo del Progreso</h4>
                            <div className="relative border-l-2 border-slate-800 ml-2 pl-4 space-y-5">
                                {selectedReport.history.map((step, index) => (
                                    <div key={step.id}>
                                        <span className={`absolute -left-[21px] top-1 h-2 w-2 rounded-full ring-4 ring-slate-950 ${index === 0 ? 'bg-emerald-400 ring-emerald-500/20 animate-pulse' : 'bg-slate-600'}`} />

                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-slate-500 font-medium">{step.changeDate}</span>
                                            <p className="text-xs font-bold text-white">Cambio por: <span className="text-emerald-400 font-medium">{step.assignedTo}</span></p>
                                            {step.comment && <p className="text-xs text-slate-400 italic mt-1 bg-slate-900/40 p-2 rounded-lg border border-slate-900">{step.comment}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </BottomSheet>
            )}
        </div>
    );
}

