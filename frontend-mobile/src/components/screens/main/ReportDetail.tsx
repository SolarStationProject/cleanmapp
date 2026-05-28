//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../../../assets/icons"
import TabBar from "../../ui/TabBar";

interface HistoryEvent {
    id: string;
    status: 'Pendiente' | 'En proceso' | 'Resuelto';
    date: string;
    time: string;
    title: string;
    operator?: string;
}

export default function ReportDetail() {
    const navigate = useNavigate();

    // Datos completos simulados de la liña de tiempo de la captura (Segunda pantalla extendida)
    const eventHistory: HistoryEvent[] = [
        {
            id: "e1",
            status: "En proceso",
            date: "18 Mar 2024",
            time: "14:30",
            title: "Asignado a equipo de limpieza zona norte",
            operator: "María García"
        },
        {
            id: "e2",
            status: "En proceso",
            date: "16 Mar 2024",
            time: "09:15",
            title: "Reporte verificado en campo",
            operator: "Carlos Méndez"
        },
        {
            id: "e3",
            status: "Pendiente",
            date: "15 Mar 2024",
            time: "16:42",
            title: "Reporte recibido y registrado",
            operator: "Sistema"
        }
    ];

    // Mapeo preciso de los colores de las etiquetas de estado
    const getBadgeColors = (status: 'Pendiente' | 'En proceso' | 'Resuelto') => {
        switch (status) {
            case 'En proceso':
                return { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd', dot: '#0284c7' };
            case 'Pendiente':
                return { bg: '#fef3c7', text: '#d97706', border: '#fde68a', dot: '#d97706' };
            case 'Resuelto':
                return { bg: '#e6f4ea', text: '#137333', border: '#ceead6', dot: '#137333' };
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
                padding: '42px 16px 20px 16px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                color: '#ffffff'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <button 
                        onClick={() => navigate('/my-reports')}
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

                    <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Estado del Reporte</h1>

                    <button style={{
                        position: 'relative',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        //backgroundColor: 'rgba(255,255,255,0.1)',
                        backgroundColor: '#005c2e',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        cursor: 'pointer'
                    }}>
                        <ICONS.Bell />
                    </button>
                </div>
            </div>

            {/* Contenedor con Scroll para la Información del Caso */}
            <div style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                
                {/* Tarjeta de Información General y Estado Actual */}
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    padding: '16px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)'
                }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start', marginBottom: '16px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '14px',
                            backgroundColor: '#e6f4ea',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <ICONS.FileText />
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>REP-2024-001</span>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '2px 0 4px 0', lineHeight: '1.3' }}>
                                Vertedero ilegal en zona rural
                            </h3>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Calle Los Pinos 234</p>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', margin: '0 0 8px 0' }}>Estado actual</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 14px',
                                borderRadius: '16px',
                                backgroundColor: '#e0f2fe',
                                color: '#0284c7',
                                border: '1px solid #bae6fd',
                                fontSize: '13px',
                                fontWeight: '700'
                            }}>
                                <ICONS.Info />
                                <span>En proceso</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección del Historial de Cambios (Línea de Tiempo) */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        margin: '0 0 12px 4px'
                    }}>
                        Historial de cambios
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        {eventHistory.map((event, index) => {
                            const c = getBadgeColors(event.status);
                            const isLast = index === eventHistory.length - 1;

                            return (
                                <div key={event.id} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                                    
                                    {/* Eje de la línea de tiempo vertical (Nodo + Barra conectora) */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                        {/* Círculo indicador del estado */}
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            backgroundColor: '#ffffff',
                                            border: `5px solid ${c.dot}`,
                                            boxSizing: 'border-box',
                                            zIndex: 2
                                        }} />
                                        
                                        {/* Línea conectora gris (No se dibuja para el último elemento) */}
                                        {!isLast && (
                                            <div style={{
                                                width: '2px',
                                                flex: 1,
                                                backgroundColor: '#cbd5e1',
                                                marginTop: '4px',
                                                marginBottom: '4px',
                                                zIndex: 1
                                            }} />
                                        )}
                                    </div>

                                    {/* Contenido de la Tarjeta del Evento */}
                                    <div style={{ flex: 1, paddingBottom: isLast ? '0px' : '24px' }}>
                                        {/* Fila del Estado y la Fecha */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                            <span style={{
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                padding: '2px 10px',
                                                borderRadius: '8px',
                                                backgroundColor: c.bg,
                                                color: c.text,
                                                border: `1px solid ${c.border}`
                                            }}>
                                                {event.status}
                                            </span>
                                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                                                {event.date}
                                            </span>
                                        </div>

                                        {/* Título de la acción ejecutada */}
                                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#334155', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                                            {event.title}
                                        </p>

                                        {/* Operador responsable y hora */}
                                        {event.operator && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                                                <ICONS.User/>
                                                <span style={{ fontSize: '12px' }}>
                                                    {event.operator} • {event.time}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tarjeta Inferior de Alertas de Notificación */}
                <div style={{
                    backgroundColor: '#f1f5f9',
                    borderRadius: '20px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '80px' // Espacio para que el TabBar no la tape
                }}>
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        <ICONS.BellOutline />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Notificaciones activas</p>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0', lineHeight: '1.3' }}>
                            Recibirás alertas cuando cambie el estado
                        </p>
                    </div>
                </div>

            </div> {/* Fin del contenedor de Scroll */}

            {/* Barra de Navegación Fija anclada abajo */}
            <TabBar currentTab={'report-detail'} />

        </div>
    );
}
