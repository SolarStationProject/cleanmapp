import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from "../../../assets/icons"
import CitizenMapContainer from '../../../map/CitizenMapContainer';
//import BottomSheet from '../../ui/BottomSheet';

// Tipado local para controlar los estados de los filtros de la interfaz
type FiltroEstado = 'Todos' | 'Pendiente' | 'En proceso' | 'Resuelto';

/*
interface ReporteCercano {
    id: string;
    titulo: string;
    categoria: string;
    distancia: string;
    tiempo: string;
    estado: 'Pendiente' | 'En proceso' | 'Resuelto';
}
*/

export default function MapScreen() {
    const navigate = useNavigate();
    const [filtroSeleccionado, setFiltroSeleccionado] = useState<FiltroEstado>('Todos');
    //const [reporteSeleccionado, setReporteSeleccionado] = useState<ReporteCercano | null>(null);
    //const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
    const [reporteSeleccionadoId, setReporteSeleccionadoId] = useState<string | null>(null);

    // Función limpia para cerrar o cancelar la selección del marcador
    const handleCerrarDetalle = () => {
        setReporteSeleccionadoId(null);
    };

    // Datos mockeados alineados estrictamente con la interfaz gráfica provista
    /*
    const reportesMock: ReporteCercano[] = [
        {
            id: '02222222-2222-2222-2222-222222222222',
            titulo: 'Escombros en vía pública',
            categoria: 'Escombros',
            distancia: '120m',
            tiempo: 'Hace 2 horas',
            estado: 'Pendiente'
        },
        {
            id: '07777777-7777-7777-7777-777777777777',
            titulo: 'Residuos electrónicos',
            categoria: 'Electrónicos',
            distancia: '350m',
            tiempo: 'Hace 1 día',
            estado: 'En proceso'
        },
        {
            id: '01111111-1111-1111-1111-111111111111',
            titulo: 'Basura acumulada',
            categoria: 'Basura doméstica',
            distancia: '500m',
            tiempo: 'Hace 3 días',
            estado: 'Pendiente'
        }
    ];
    */

    /*
    const capturarSeleccionMarcador = (idReporte: string) => {
        const encontrado = reportesMock.find(r => r.id === idReporte);
        if (encontrado) {
            setReporteSeleccionado(encontrado);
        }
    };
    */

    return (
        <div style={styles.screenContainer}>
            {/* 1. TOP BAR / ENCABEZADO */}
            <header style={styles.header}>
                <div style={styles.headerLeft}>
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
                    <h1 style={styles.headerTitle}>Mapa de Reportes</h1>
                </div>
                <button style={styles.listButton} onClick={() => alert('Abrir vista de lista')}>
                    <div style={styles.burgerLine} />
                    <div style={styles.burgerLine} />
                    <div style={styles.burgerLine} />
                </button>
            </header>

            {/* 2. FILTROS HORIZONTALES (Scroll horizontal táctil nativo) */}
            <nav style={styles.filterBar}>
                {(['Todos', 'Pendiente', 'En proceso', 'Resuelto'] as FiltroEstado[]).map((estado) => {
                    const isActive = filtroSeleccionado === estado;
                    return (
                        <button
                            key={estado}
                            onClick={() => setFiltroSeleccionado(estado)}
                            style={{
                                ...styles.filterChip,
                                backgroundColor: isActive ? '#0A5C36' : '#EAEAEA',
                                color: isActive ? '#FFFFFF' : '#555555',
                                fontWeight: isActive ? '600' : '400',
                            }}
                        >
                            {estado === 'Todos' ? 'Todos' : estado + 'es'}
                        </button>
                    );
                })}
            </nav>

            {/* 3. MAPA CONTENEDOR CORE */}
            <main style={styles.mapWrapper}>
                <CitizenMapContainer 
                    idReporteSeleccionado={reporteSeleccionadoId}
                    onSelectMarker={(id) => setReporteSeleccionadoId(id)}
                />

                {/* BOTÓN ADICIONAL DE CANCELAR EN LA PANTALLA (OPCIONAL) */}
                {reporteSeleccionadoId && (
                    <button 
                        onClick={handleCerrarDetalle}
                        style={styles.floatingCancelBtn}
                    >
                        Quitar selección
                    </button>
                )}

                {/* Leyenda flotante superior izquierda dentro del mapa */}
                <div style={styles.legendFloatingBox}>
                    <div style={styles.legendItem}><span style={{ ...styles.legendDot, backgroundColor: '#FF9900' }} /> Pendiente</div>
                    <div style={styles.legendItem}><span style={{ ...styles.legendDot, backgroundColor: '#0066FF' }} /> En proceso</div>
                    <div style={styles.legendItem}><span style={{ ...styles.legendDot, backgroundColor: '#00CC66' }} /> Resuelto</div>
                </div>

                {/* Botón de filtro avanzado flotante derecho */}
                <button style={styles.floatingFilterBtn}>
                    <div style={styles.funnelIconGeom} />
                </button>
            </main>
        </div>
    );
}

// Estilos modulares nativos en JS/TS optimizados para pantallas táctiles móviles
const styles: { [key: string]: React.CSSProperties } = {
    screenContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F5F5F5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overflow: 'hidden',
        userSelect: 'none',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0F7643',
        padding: '16px 20px',
        color: '#FFFFFF',
        height: '60px',
        boxSizing: 'border-box',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    headerTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
    },
    listButton: {
        background: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        cursor: 'pointer',
        padding: '4px',
    },
    burgerLine: {
        width: '18px',
        height: '2px',
        backgroundColor: '#FFFFFF',
        borderRadius: '2px',
    },
    filterBar: {
        display: 'flex',
        gap: '10px',
        padding: '12px 16px',
        backgroundColor: '#FFFFFF',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid #E0E0E0',
        scrollbarWidth: 'none', // Oculta barra en Firefox
    },
    filterChip: {
        padding: '8px 16px',
        borderRadius: '20px',
        border: 'none',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
    mapWrapper: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#E5E9F0',
    },
    legendFloatingBox: {
        position: 'absolute',
        top: '16px',
        left: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '10px 14px',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: '#333333',
        fontWeight: '500',
    },
    legendDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        display: 'inline-block',
    },
    floatingFilterBtn: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        width: '40px',
        height: '40px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #CCCCCC',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        zIndex: 10,
        cursor: 'pointer',
    },
    funnelIconGeom: {
        width: '0',
        height: '0',
        borderLeft: '7px solid transparent',
        borderRight: '7px solid transparent',
        borderTop: '8px solid #555555',
        position: 'relative',
    },
    listContainer: {padding: '0 4px',},
    listHeader: {marginBottom: '16px',},
    listTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#111111',
        margin: '0 0 4px 0',
    },
    listSubtitle: {
        fontSize: '13px',
        color: '#666666',
        margin: 0,
    },
    scrollableItemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxHeight: '260px',
        overflowY: 'auto',
    },
    listItemCard: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: '12px',
        padding: '12px',
        border: '1px solid #EAEAEA',
        gap: '12px',
        cursor: 'pointer',
    },
    iconBadge: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        color: '#FFFFFF',
    },
    itemMainInfo: {flex: 1,},
    itemTitle: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#222222',
        margin: '0 0 2px 0',
    },
    itemSubtitle: {
        fontSize: '12px',
        color: '#777777',
        margin: '0 0 4px 0',
    },
    itemMeta: {
        fontSize: '11px',
        color: '#999999',
        margin: 0,
    },
    statusTag: {
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    
    /*
    detailPopupCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    */

    detailPopupCard: {
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '12px',
        width: '224x',
        backgroundColor: 'white', 
        borderRadius: '12px',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        border: '1px solid #CCCCCC',
        overflow: 'hidden',
        zIndex: 30,
        padding: '15px'
    },
    
    popupHeaderRow: {
        marginTop: '-15px',
        marginLeft: '-15px',
        marginRight: '-15px',
        paddingBottom: '15px'
    },
    photoCountTag: {
        height: '80px',
        background: 'linear-gradient(135deg,#FEF3C7,#FFFBEB)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closePopupBtn: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#F3F4F6',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
    },
    popupBody: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
    },
    popupTextContent: {flex: 1,},
    popupTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#111111',
        margin: '0 0 4px 0',
    },
    popupSubtitle: {fontSize: '13px',color: '#666666',margin: '0 0 6px 0',},
    popupMeta: {
        fontSize: '12px',
        color: '#888888',
        margin: 0,
    },
    popupFooterRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px',
        borderTop: '1px solid #EEEEEE',
        paddingTop: '12px',
    },
    eyeStyle: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: '#D97706',
        fontSize: '12px',
        fontWeight: 500,
    },
    viewMoreBtn: {
        background: 'none',
        border: 'none',
        color: '#0F7643',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
    },
};





