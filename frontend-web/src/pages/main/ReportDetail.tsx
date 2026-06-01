import { useAxios } from '../../hooks/useAxios';
import { API_URL } from '../../services/api'
import { useNavigate, useLocation } from "react-router-dom";
import { ICONS } from "../../assets/icons";
import { IMAGES } from "../../assets/images"; 
import { DetalleReporteResponse } from '../../shared/types';
import { formatearFecha, formatearHora } from '../../utils/formatters';

// Se define la estructura de la respuesta del backend
interface BackendResponse {
    success: boolean;
    data: DetalleReporteResponse | null;
}

export default function ReportDetail() {
    const navigate = useNavigate();
    // Invocamos el hook useLocation
    const location = useLocation();

    // Definimos un parámetro de prueba (id)
    const reportId = location.state;
    const { data: respuesta, loading, error } = useAxios<BackendResponse>(
        '/api/reports/:id', //endpoint
        { id:reportId[0], usuarioRol:reportId[1] } //parámetro
    );

    const detalles_reportes = respuesta?.data; 

    // Renderizado de pantallas de carga y error del GET
    //if (loading) return <p>Cargando tus reportes geolocalizados...</p>;
    if (error) return <p>Error al conectar con el servidor: {error}</p>;

    // Mapeo preciso de los colores de las etiquetas de estado
    const getBadgeColors = (status: 'Rechazado' | 'Pendiente' | 'Verificado') => {
        switch (status) {
            case 'Rechazado':
                return { bg: '#fed6c7', text: '#d93006', border: '#fde68a', dot: '#d93706' }
            case 'Pendiente':
                return { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd', dot: '#0284c7' };
            case 'Verificado':
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
                        onClick={() => navigate('/map')}
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

                {loading? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px', textAlign: 'center', color: '#64748b' }}>
                        {/* Puedes poner aquí un Spinner nativo o tarjetas vacías (Skeletons) */}
                    </div>
                ) : (
                    <>
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
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>{detalles_reportes?.codigo}</span>
                                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '2px 0 4px 0', lineHeight: '1.3' }}>
                                        {detalles_reportes?.titulo}
                                    </h3>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{detalles_reportes?.direccion}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px'}}>
                                        <ICONS.Calendar />
                                        <span style={{ fontSize: '12px', color: '#64748b', padding: '5px 0px 5px 0' }}>{formatearFecha(reportId[2])}</span>
                                    </div>
                                </div>
                            </div>

                            {/*Foto*/}
                            {detalles_reportes?.foto ? (
                                <div style={{ marginTop: '14px', width: '100%', height: '180px', borderRadius: '16px', overflow: 'hidden' }}>
                                    <img 
                                        // Si la foto empieza con 'http' o 'uploads' viene del backend real; 
                                        // de lo contrario, puedes inyectar tu recurso simulado local del archivo images.ts
                                        src={detalles_reportes.foto.startsWith('http') || detalles_reportes.foto.startsWith('/uploads')
                                            ? `${API_URL}${detalles_reportes.foto}` 
                                            : IMAGES.basural1
                                        } 
                                        alt="Evidencia del reporte"
                                        crossOrigin="anonymous"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                                    />
                                </div>
                            ) : (
                                /* Opcional: Mostrar una imagen por defecto elegante si el reporte no posee foto */
                                <div style={{ marginTop: '14px', width: '100%', height: '60px', borderRadius: '16px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '13px' }}>
                                    <span>Reporte creado sin evidencia fotográfica</span>
                                </div>
                            )}

                            {/* Descripción del reporte */}
                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 0 10px 0' }}>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '6px 14px',
                                        borderRadius: '16px',
                                        backgroundColor: 'white',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                    }}>
                                        <span>{detalles_reportes?.descripcion}</span>
                                    </div>
                                </div>
                            </div>


                            {/*Estado actual*/}
                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                                <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', margin: '0 0 8px 0' }}>Estado actual</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '6px 14px',
                                        borderRadius: '16px',
                                        backgroundColor: 
                                            detalles_reportes?.estado == 'Rechazado' ? '#fed6c7' : 
                                            detalles_reportes?.estado == 'Pendiente' ? '#e0f2fe' :
                                            detalles_reportes?.estado == 'Verificado' ? '#e6f4ea' : 
                                            '#e0f2fe',
                                        color: 
                                            detalles_reportes?.estado == 'Rechazado' ? '#d93006' : 
                                            detalles_reportes?.estado == 'Pendiente' ? '#0284c7' :
                                            detalles_reportes?.estado == 'Verificado' ? '#137333' : 
                                            '#000000',
                                        border: 
                                            detalles_reportes?.estado == 'Rechazado' ? '1px solid #fde68a' :
                                            detalles_reportes?.estado == 'Pendiente' ? '1px solid #bae6fd' :
                                            detalles_reportes?.estado == 'Verificado' ? '1px solid #ceead6' :
                                            '1px solid #d6edfa',
                                        fontSize: '13px',
                                        fontWeight: '700'
                                    }}>
                                        {detalles_reportes?.estado === 'Rechazado' ? <ICONS.Refused /> :
                                        detalles_reportes?.estado === 'Pendiente' ? <ICONS.Info /> :
                                        detalles_reportes?.estado === 'Verificado' ? <ICONS.Check /> :
                                        <ICONS.Info /> /* Ícono por defecto por seguridad */}
                                        <span>{detalles_reportes?.estado}</span>
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
                                {detalles_reportes?.historial_cambios.map((event, index) => {
                                    const c = getBadgeColors(event.estado_asignado);
                                    const isLast = index === detalles_reportes.historial_cambios.length - 1;

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
                                                        {event.estado_asignado}
                                                    </span>
                                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                                                        {formatearFecha(event.fecha)}
                                                    </span>
                                                </div>

                                                {/* Título de la acción ejecutada */}
                                                <p style={{ fontSize: '16px', fontWeight: '600', color: '#334155', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                                                    {event.comentario}
                                                </p>

                                                {/* Operador responsable y hora */}
                                                {event.usuario_nombre && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                                                        <ICONS.User/>
                                                        <span style={{ fontSize: '12px' }}>
                                                            {event.usuario_nombre} • {formatearHora(event.fecha)}
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
                            marginBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))'
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
                    </>
                )}
            </div>
        </div>
    );
}