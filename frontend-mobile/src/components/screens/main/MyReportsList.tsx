//import React, { useEffect, useState } from 'react';
//import { api } from '../../services/api';
//import { Reporte, ApiResponse } from '../../shared/types';
import { ICONS } from "../../../assets/icons"
import TabBar from "../../ui/TabBar"; // Reutilizamos tu barra inferior fija

interface ReportItem {
    id: string;
    code: string;
    title: string;
    status: 'Pendiente' | 'En proceso' | 'Resuelto';
    address: string;
    date: string;
}

export default function MyReportsList() {


    // Datos idénticos a los que tienes en tu captura de pantalla
    const reports: ReportItem[] = [
        {
            id: "1",
            code: "REP-2024-001",
            title: "Vertedero ilegal en zona rural",
            status: "En proceso",
            address: "Calle Los Pinos 234",
            date: "15 Mar 2024"
        },
        {
            id: "2",
            code: "REP-2024-002",
            title: "Escombros abandonados",
            status: "Resuelto",
            address: "Av. Central 567",
            date: "12 Mar 2024"
        },
        {
            id: "3",
            code: "REP-2024-003",
            title: "Residuos industriales",
            status: "Pendiente",
            address: "Zona Industrial Norte",
            date: "10 Mar 2024"
        }
    ];

// frontend-mobile/src/components/citizen/MyReportsList.tsx (PARTE 2 DE 2)

    // Función auxiliar para pintar las etiquetas de estado idénticas a la captura
    const getStatusStyle = (status: 'Pendiente' | 'En proceso' | 'Resuelto') => {
        switch (status) {
            case 'En proceso':
                return { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd' };
            case 'Resuelto':
                return { bg: '#e6f4ea', text: '#137333', border: '#ceead6' };
            case 'Pendiente':
                return { bg: '#fef3c7', text: '#d97706', border: '#fde68a' };
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#f8fafc',
            userSelect: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxSizing: 'border-box'
        }}>

            {/* Cabecera Fija Verde Institucional */}
            <div style={{
                backgroundColor: '#005c2e',
                padding: '20px 16px 20px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                color: '#ffffff'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    {/* Botón de retroceso */}
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#ffffff',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ICONS.ArrowLeft />
                    </button>

                    {/* Título de la Pantalla */}
                    <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Mis Reportes</h1>

                    {/* Alerta de notificación */}
                    <button style={{
                        position: 'relative',
                        background: 'none',
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <ICONS.Bell />
                        <span style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#ef4444',
                            borderRadius: '50%'
                        }} />
                    </button>
                </div>
            </div>

            {/* Fila de Contadores Superiores */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-around',
                borderBottom: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: 0 }}>4</p>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Total</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '16px', fontWeight: '800', color: '#d97706', margin: 0 }}>1</p>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Pendientes</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '16px', fontWeight: '800', color: '#0284c7', margin: 0 }}>1</p>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>En proceso</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '16px', fontWeight: '800', color: '#10b981', margin: 0 }}>1</p>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Resueltos</p>
                </div>
            </div>

            {/* Listado de Tarjetas con Scroll Independiente */}
            <div style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
            }}>
                {reports.map((report) => {
                    const st = getStatusStyle(report.status);
                    return (
                        <div 
                            key={report.id}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '24px',
                                padding: '16px',
                                border: '1px solid #f1f5f9',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                position: 'relative'
                            }}
                        >
                            {/* Fila Superior: Código y Etiqueta de Estado */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <ICONS.FileText />
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', letterSpacing: '0.02em' }}>
                                        {report.code}
                                    </span>
                                </div>
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    backgroundColor: st.bg,
                                    color: st.text,
                                    border: `1px solid ${st.border}`
                                }}>
                                    {report.status}
                                </span>
                            </div>

                            {/* Fila Central: Título y Flecha de Navegación */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '4px' }}>
                                <h3 style={{
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: '#1e293b',
                                    margin: 0,
                                    lineHeight: '1.3',
                                    maxWidth: '85%'
                                }}>
                                    {report.title}
                                </h3>
                                <ICONS.ChevronRight />
                            </div>

                            {/* Fila Inferior: Detalles de Dirección y Calendario */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <ICONS.MapPin />
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>{report.address}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <ICONS.Calendar />
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>{report.date}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Texto Informativo en el Pie de Página */}
                <p style={{
                    fontSize: '12px',
                    color: '#64748b',
                    textAlign: 'center',
                    marginTop: '8px',
                    marginBottom: '80px', // Evita que la barra tape este texto al bajar el scroll
                    fontWeight: '500'
                }}>
                    Toca un reporte para ver su estado e historial
                </p>
            </div>

            {/* Barra Inferior Fija Fuera del Scroll */}
            <TabBar currentTab="my-reports"/>

        </div>
    );
}


/*
export const MyReportsList: React.FC = () => {
    const [reportes, setReportes] = useState<Reporte[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<ApiResponse<Reporte[]>>('/api/reports/mis-reportes')
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
*/

