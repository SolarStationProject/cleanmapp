export interface ReportHistoryItem {
    id: string;
    status: 'pendiente' | 'en_progreso' | 'resuelto' | 'rechazado';
    changeDate: string;
    assignedTo: string; // Quién realizó o maneja el cambio (ej: "Municipio - Depto. Aseo")
    comment?: string;
}

export interface CitizenReport {
    id: string;
    title: string;
    referenceCode: string;
    currentStatus: 'pendiente' | 'en_progreso' | 'resuelto' | 'rechazado';
    createdAt: string;
    history: ReportHistoryItem[];
}