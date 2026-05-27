import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Reporte, ApiResponse } from '../../shared/types';

export const MyReportsList: React.FC = () => {
    const [reportes, setReportes] = useState<Reporte[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<ApiResponse<Reporte[]>>('/reports/mis-reportes')
            .then(response => {
                if (response.data.success) {
                    setReportes(response.data.data);
                }
            })
            .catch(err => {
                console.error('Error al cargar reportes propios:', err);
                setError('No se pudo conectar con el servidor de CleanMap.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando tus reportes de CleanMap...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="reports-list">
            {reportes.length === 0 ? (
                <p>No has realizado ningún reporte aún.</p>
            ) : (
                reportes.map(reporte => (
                    <div key={reporte.id} className="report-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h3>Ubicación: {reporte.latitud}, {reporte.longitud}</h3>
                        <p>{reporte.descripcion || 'Sin descripción'}</p>
                        <span className={`badge status-${reporte.estado.toLowerCase()}`}>
                            Estado: <strong>{reporte.estado}</strong>
                        </span>
                    </div>
                ))
            )}
        </div>
    );
};


