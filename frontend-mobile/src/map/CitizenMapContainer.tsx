import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom'; // ⚠️ HERRAMIENTA CLAVE
import L from 'leaflet';
import { ICONS } from '../assets/icons';

//@ts-ignore
import 'leaflet/dist/leaflet.css';

interface CitizenMapContainerProps {
    onSelectMarker: (idReporte: string) => void;
    idReporteSeleccionado: string | null;
}

// Interfaz para vincular el nodo físico del DOM con los datos del punto
interface MarcadorPortal {
    punto: typeof puntosMock[number];
    contenedorElemento: HTMLDivElement;
}

const puntosMock = [
    { id: '02222222-2222-2222-2222-222222222222', lat: -33.4475, lng: -70.6680, estado: 'Pendiente', icono: '⚠️', titulo: 'Escombros en calle', distancia: '120m', tiempo: 'Hace 2h' },
    { id: '07777777-7777-7777-7777-777777777777', lat: -33.4500, lng: -70.6710, estado: 'En proceso', icono: '⚙️', titulo: 'Semáforo dañado', distancia: '450m', tiempo: 'Hace 1h' },
    { id: '01111111-1111-1111-1111-111111111111', lat: -33.4460, lng: -70.6725, estado: 'Pendiente', icono: '⚠️', titulo: 'Basural en vereda', distancia: '80m', tiempo: 'Hace 30m' }
];

export default function CitizenMapContainer({ onSelectMarker, idReporteSeleccionado }: CitizenMapContainerProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    
    // Estado para guardar las referencias de los portales
    const [listaMarcadores, setListaMarcadores] = useState<MarcadorPortal[]>([]);

    // Guardamos la función en un Ref para poder usarla dentro del efecto sin que actúe como dependencia
    const onSelectMarkerRef = useRef(onSelectMarker);
    useEffect(() => {
        onSelectMarkerRef.current = onSelectMarker;
    }, [onSelectMarker]);

    const defaultLat = -33.4489;
    const defaultLng = -70.6693;

    // ⚡ SOLUCIÓN DEFINITIVA: Dependencias vacías [] garantiza que el mapa se crea UNA sola vez y jamás se reconstruye
    useLayoutEffect(() => {
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

        const marcadoresIniciales: MarcadorPortal[] = puntosMock.map((punto) => {
            const contenedorContenido = document.createElement('div');

            const customIcon = L.divIcon({
                html: contenedorContenido,
                className: 'marcador-portal-contenedor',
                iconSize: [0,0],
                iconAnchor: [0,0]
            });

            const marker = L.marker([punto.lat, punto.lng], { icon: customIcon }).addTo(map);

            marker.on('click', () => {
                // Usamos la referencia persistente para evitar re-crear el mapa
                onSelectMarkerRef.current(punto.id);
                map.panTo([punto.lat, punto.lng]); 
            });

            return { punto, contenedorElemento: contenedorContenido };
        });

        setListaMarcadores(marcadoresIniciales);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // 👈 Array vacío: Inmutable durante todo el ciclo de vida

    // Reacciona al cambio de selección externa exclusivamente para desplazar la vista con panTo sin alterar el DOM
    useEffect(() => {
        if (!mapInstanceRef.current || !idReporteSeleccionado) return;
        
        const puntoActivo = puntosMock.find(p => p.id === idReporteSeleccionado);
        if (puntoActivo) {
            mapInstanceRef.current.panTo([puntoActivo.lat, puntoActivo.lng]);
        }
    }, [idReporteSeleccionado]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' , overflowY: 'auto'}}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '80%' }} />

            {listaMarcadores.map(({ punto, contenedorElemento }) => {
                const estaSeleccionado = punto.id === idReporteSeleccionado;

                return createPortal(
                    <div key={punto.id}>
                        {estaSeleccionado && (
                            <div style={styles.detailPopupCard}>
                                <div style={styles.popupHeaderRow}>
                                    <button style={styles.closePopupBtn} onClick={(e) => { 
                                        e.stopPropagation(); 
                                        onSelectMarker(''); 
                                    }}><ICONS.X/></button>
                                    <div style={styles.photoCountTag}>
                                        <div style={styles.eyeStyle}><ICONS.Eye/></div>
                                    </div>
                                </div>

                                <div style={styles.popupBody}>
                                    <div style={{ ...styles.iconBadge, backgroundColor: punto.estado === 'Pendiente' ? '#FF9900' : '#0066FF' }}>
                                        { punto.estado === 'Rechazado' ? null : 
                                        punto.estado === 'Pendiente' ? null :
                                        punto.estado === 'Verificado' ? null : null
                                        }
                                        <ICONS.AlertTriangle/>
                                    </div>
                                    <div style={styles.popupTextContent}>
                                        <h3 style={styles.popupTitle}>{punto.titulo}</h3>
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
                        )}

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
                    contenedorElemento
                );
            })}
            {/* VISTA B: LISTA GENERAL DE REPORTES CERCANOS */}
            <div style={styles.listContainer}>
                <div style={styles.listHeader}>
                    <h2 style={styles.listTitle}>Reportes cercanos</h2>
                    {/* Usamos el largo dinámico de los puntos reales */}
                    {/*<p style={styles.listSubtitle}>{puntosMock.length} reportes en tu zona</p>*/}
                </div>

                <div style={styles.scrollableItemsContainer}>
                    {/* Iteramos sobre listaMarcadores extrayendo directamente las propiedades del objeto 'punto' */}
                    {listaMarcadores.map(({ punto: item }) => (
                        <div 
                            key={item.id} 
                            style={styles.listItemCard} 
                            onClick={() => onSelectMarker(item.id)} // ⚡ Sincroniza con el mapa abriendo la tarjeta y disparando panTo
                        >
                            <div style={{
                                ...styles.iconBadge,
                                backgroundColor: item.estado === 'Pendiente' ? '#FF9900' : '#0066FF'
                            }}>
                                {item.estado === 'Pendiente' ? '⚠️' : '⚙️'}
                            </div>

                            <div style={styles.itemMainInfo}>
                                <h4 style={styles.itemTitle}>{item.titulo.substring(0, 15)}...</h4>
                                <p style={styles.itemMeta}>📍 {item.distancia} • 🕒 {item.tiempo}</p>
                            </div>

                            <span style={{
                                ...styles.statusTag,
                                backgroundColor: item.estado === 'Pendiente' ? '#FFEBD4' : '#E6F0FF',
                                color: item.estado === 'Pendiente' ? '#FF9900' : '#0066FF'
                            }}>
                                {item.estado}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
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
        width: '250px',
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
    statusTag: {
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    listContainer: {padding: '0 4px',},
    listHeader: {marginBottom: '16px',},
    //Aquí abajo cambiar
    listTitle: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        margin: '15px 0 4px 4px'
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
};
