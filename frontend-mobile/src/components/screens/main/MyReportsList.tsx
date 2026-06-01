import { useAxios } from '../../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { Reporte } from '../../../shared/types';
import { ICONS } from "../../../assets/icons"
import { formatearFecha } from '../../../utils/formatters';
import TabBar from "../../ui/TabBar"; // Reutilizamos tu barra inferior fija

// Se define la estructura de la respuesta del backend
interface BackendResponse {
    success: boolean;
    data: Reporte[] & { rol: string };
}

export default function MyReportsList() {
    const navigate = useNavigate();

    // Definimos un parámetro de prueba (id)
    const ciudadanoId = 'c2222222-2222-2222-2222-222222222222';
    const { data: respuesta, loading, error } = useAxios<BackendResponse>(
        '/api/reports/my-reports', //endpoint
        { ciudadanoId } //parámetro
    );

    const reportes = respuesta?.data; 

    // Renderizado de pantallas de carga y error del GET
    //if (loading) return <p>Cargando tus reportes geolocalizados...</p>;
    if (error) return <p>Error al conectar con el servidor: {error}</p>;

    const handleMyReport = (reportId: string, rol: string, fecha: string) => {
        // Viajamos a la siguiente pantalla metiendo los datos en el 'state'
        navigate('/report-detail', { 
            state: [reportId, rol, fecha]
        });
    };

    // Función auxiliar para pintar las etiquetas de estado idénticas a la captura
    const getStatusStyle = (status: 'Rechazado' | 'Pendiente' | 'Verificado') => {
        switch (status) {
            case 'Rechazado':
                return { bg: '#fed6c7', text: '#d93006', border: '#fde68a' };
            case 'Pendiente':
                return { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd' }
            case 'Verificado':
                return { bg: '#e6f4ea', text: '#137333', border: '#ceead6' }
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
                justifyContent: 'between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                color: '#ffffff'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    {/* Botón de retroceso */}
                    <button
                        onClick={() => navigate('/home')}
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
                        <span style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '8px',
                            height: '8px',
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
                    <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>3</p>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '2px 0 0 0' }}>Total</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', fontWeight: '800', color: '#d97706', margin: 0 }}>1</p>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '2px 0 0 0' }}>Rechazados</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', fontWeight: '800', color: '#0284c7', margin: 0 }}>1</p>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '2px 0 0 0' }}>Pendientes</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', fontWeight: '800', color: '#10b981', margin: 0 }}>1</p>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '2px 0 0 0' }}>Verificados</p>
                </div>
            </div>

            {/* Listado de Tarjetas con Scroll Independiente */}
            <div style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
            }}>
                {/* 1. MIENTRAS CARGA: Mostramos indicadores limpios en vez de dejar el espacio vacío o gris plano */}
                {loading? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px', textAlign: 'center', color: '#64748b' }}>
                        {/* Puedes poner aquí un Spinner nativo o tarjetas vacías (Skeletons) */}
                    </div>
                ) : (
                    // 2. CUANDO LLEGAN LOS DATOS: Renderiza tu diseño original a la perfección
                    <>
                        {reportes?.map((report) => {
                            const r = report as Reporte & { rol: string }; 
                            const st = getStatusStyle(r.estado);
                            return (
                                <div 
                                    key={r.id}
                                    onClick={() => handleMyReport(r.id, r.rol, r.fecha_creacion)} //navigate("/report-detail")
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
                                                {r.codigo}
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
                                            {r.estado}
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
                                            {r.titulo}
                                        </h3>
                                        <ICONS.ChevronRight />
                                    </div>

                                    {/* Fila Inferior: Detalles de Dirección y Calendario */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <ICONS.MapPin />
                                            <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '-6px' }}>{r.direccion}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px'}}>
                                            <ICONS.Calendar />
                                            <span style={{ fontSize: '12px', color: '#64748b' }}>{formatearFecha(r.fecha_creacion)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        
                        {/* Si la base de datos devolvió 0 filas, evitamos el espacio muerto */}
                        {reportes?.length === 0 && (
                            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '40px' }}>
                                No tienes reportes creados en esta zona.
                            </p>
                        )}
                    </>
                )}
                {/* Texto Informativo en el Pie de Página (Solo si no está cargando) */}
                {!loading && (
                    <p style={{
                        fontSize: '12px',
                        color: '#64748b',
                        textAlign: 'center',
                        marginTop: '8px',
                        marginBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',//'80px', // Evita que la barra tape este texto al bajar el scroll
                        fontWeight: '500',
                    }}>
                        Toca un reporte para ver su estado e historial
                    </p>
                )}
            </div>
            {/* Barra Inferior Fija Fuera del Scroll */}
            <TabBar currentTab="my-reports"/>
        </div>
    );
}

