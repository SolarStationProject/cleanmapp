import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom'; // ⚠️ HERRAMIENTA CLAVE
import L from 'leaflet';
import { ICONS } from '../assets/icons';

//@ts-ignore
import 'leaflet/dist/leaflet.css';

interface CitizenMapContainerProps {
    onSelectMarker: (idReporte: string) => void;
    idReporteSeleccionado: string | null;
}

export default function CitizenMapContainer({ onSelectMarker, idReporteSeleccionado }: CitizenMapContainerProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    // ⚠️ ESTADO CLAVE: Guardamos los contenedores HTML físicos de Leaflet para inyectarles el TSX
    const [portals, setPortals] = useState<React.ReactPortal[]>([]);

    const defaultLat = -33.4489;
    const defaultLng = -70.6693;

    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const map = L.map(mapContainerRef.current, {
            center: [defaultLat, defaultLng],
            zoom: 15,
            zoomControl: false,
            attributionControl: false
        });

        mapInstanceRef.current = map;

        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
                subdomains: 'abcd',
                maxZoom: 20,
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
            }
        ).addTo(map);

        const puntosMock = [
            { id: '02222222-2222-2222-2222-222222222222', lat: -33.4475, lng: -70.6680, estado: 'Pendiente', icono: '⚠️', titulo: 'Escombros en calle', categoria: 'Escombros', distancia: '120m', tiempo: 'Hace 2h' },
            { id: '07777777-7777-7777-7777-777777777777', lat: -33.4500, lng: -70.6710, estado: 'En proceso', icono: '⚙️', titulo: 'Semáforo dañado', categoria: 'Luminarias', distancia: '450m', tiempo: 'Hace 1h' },
            { id: '01111111-1111-1111-1111-111111111111', lat: -33.4460, lng: -70.6725, estado: 'Pendiente', icono: '⚠️', titulo: 'Bache profundo', categoria: 'Pavimento', distancia: '80m', tiempo: 'Hace 30m' }
        ];

        // Guardaremos la lista de portales reactivos que crearemos para cada marcador
        const nuevosPortales: React.ReactPortal[] = [];

        puntosMock.forEach((punto) => {
            // 1. Creamos un elemento <div> vacío en el DOM nativo
            const contenedorContenido = document.createElement('div');

            // 2. Le pasamos este contenedor vacío a Leaflet
            const customIcon = L.divIcon({
                html: contenedorContenido, // <-- Leaflet ahora renderizará un contenedor vacío controlado por nosotros
                className: 'marcador-portal-contenedor',
                iconSize: [0, 0], // Evita desfases de tamaño heredados por Leaflet
                iconAnchor: [0, 0]
            });

            const marker = L.marker([punto.lat, punto.lng], { icon: customIcon }).addTo(map);

            marker.on('click', () => {
                onSelectMarker(punto.id);
                map.panTo([punto.lat, punto.lng]);
            });

            // 3. ⚠️ EL TRUCO DE TELETRANSPORTE: Enganchamos tu TSX directo al contenedor de Leaflet
            // Evaluamos si este punto específico es el que está seleccionado
            const estaSeleccionado = punto.id === idReporteSeleccionado;

            const portal = createPortal(
                <div>
                    {/* SI ESTÁ SELECCIONADO, INYECTAMOS TU COMPONENTE VISTA A EN TSX PURO */}
                    {estaSeleccionado && (
                        <div>
                            {/* TU VISTA A: FUNCIONA AL 100% CON REACT (EVENTOS, ICONOS, ETC.) */}
                            <div style={styles.detailPopupCard}>
                                <div style={styles.popupHeaderRow}>
                                    <button style={styles.closePopupBtn} onClick={(e) => { 
                                        e.stopPropagation(); // Evita activar el click del mapa
                                        onSelectMarker(''); 
                                    }}><ICONS.X/></button>
                                    <div style={styles.photoCountTag}>
                                        <div style={styles.eyeStyle}><ICONS.Eye/></div>
                                    </div>
                                </div>

                                <div style={styles.popupBody}>
                                    <div style={{ ...styles.iconBadge, backgroundColor: punto.estado === 'Pendiente' ? '#FF9900' : '#0066FF' }}>
                                        <ICONS.AlertTriangle/>
                                    </div>
                                    <div style={styles.popupTextContent}>
                                        <h3 style={styles.popupTitle}>{punto.titulo}</h3>
                                        <p style={styles.popupSubtitle}>{punto.categoria}</p>
                                        <p style={styles.popupMeta}><ICONS.MapPin/> {punto.distancia} <ICONS.Clock/> {punto.tiempo}</p>
                                    </div>
                                </div>

                                <div style={styles.popupFooterRow}>
                                    <span style={{ 
                                        ...styles.statusTag, 
                                        backgroundColor: punto.estado === 'Pendiente' ? '#FFEBD4' : '#E6F0FF', 
                                        color: punto.estado === 'Pendiente' ? '#FF9900' : '#0066FF' 
                                    }}>
                                        {punto.estado}
                                    </span>
                                    <button style={styles.viewMoreBtn} onClick={() => alert(`Detalle ID: ${punto.id}`)}>
                                        Ver detalles ❯
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TU PIN INDICADOR EN TSX PURO (ABAJO DE LA TARJETA) */}
                    <div style={{
                        position: 'absolute',
                        width: '32px',
                        height: '32px',
                        backgroundColor: punto.estado === 'Pendiente' ? '#FF9900' : '#0066FF',
                        borderRadius: '50% 50% 50% 0',
                        transform: 'translateX(-50%) translateY(-100%) rotate(-45deg)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 4px 6px rgba(0,0,0,0.25)',
                        border: '2px solid #FFFFFF'
                    }}>
                        <div style={{ transform: 'rotate(45deg)', fontSize: '14px', color: 'white' }}>
                            {punto.icono}
                        </div>
                    </div>
                </div>,
                contenedorContenido // Destino físico en Leaflet
            );

            nuevosPortales.push(portal);
        });

        // Guardamos los portales en el estado de React para que los dibuje en la app
        setPortals(nuevosPortales);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [idReporteSeleccionado, onSelectMarker]); // Se reconstruyen los portales si cambia el seleccionado

    const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
    const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%', position: 'absolute' }} />

            <div style={styles.zoomControlWrapper}>
                <button onClick={handleZoomIn} style={styles.zoomButton}>+</button>
                <button onClick={handleZoomOut} style={{ ...styles.zoomButton, borderTop: '1px solid #EAEAEA' }}>-</button>
            </div>

            {/* ⚠️ RENDERIZAMOS LOS PORTALES: Aquí es donde React inyecta la magia dentro de Leaflet */}
            {portals}
        </div>
    );
}


const styles: { [key: string]: React.CSSProperties } = {
    mapContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    absoluteCanvas: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    zoomControlWrapper: {
        position: 'absolute',
        bottom: '40px',
        right: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        zIndex: 10,
        overflow: 'hidden',
    },
    zoomButton: {
        width: '40px',
        height: '40px',
        backgroundColor: '#FFFFFF',
        border: 'none',
        fontSize: '22px',
        fontWeight: 'normal',
        color: '#333333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        outline: 'none',
    },





    detailPopupCard: {
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '30px',
        width: '300px',
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
};
