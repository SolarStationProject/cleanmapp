import { useNavigate } from 'react-router-dom';
//import { MyReportsList } from '../../users/MyReportsList';

// Importamos el diccionario de imágenes que ya tienes en tu estructura
import { IMAGES } from "../../../assets/images"; 
import { ICONS } from "../../../assets/icons"
//import { useState } from "react";
import TabBar from "../../ui/TabBar"; 

export default function HomeScreen() {
    const navigate = useNavigate(); // Inicializamos la función de navegación

    // Esta función se encarga de redirigir a las URLs oficiales de tu AppRoutes
    const handleTabChange = (tabId: string) => {
        switch (tabId) {
            case "home":
                navigate("/home");
                break;
            case "my-reports":
                navigate("/my-reports"); // Te manda directo a la lista que mapeamos
                break;
            case "map":
                navigate("/map"); // Te manda al mapa de reportes
                break;
            case "new-report":
                navigate("/map"); // O la ruta que definas para el formulario
                break;
            default:
                break;
        }
    };
    
    const menuItems = [
        {
            id: "new-report",
            icon: ICONS.Plus,
            label: "Nuevo Reporte",
            description: "Reportar vertedero ilegal",
            accent: true,
        },
        {
            id: "my-reports",
            icon: ICONS.FileText,
            label: "Mis Reportes",
            description: "Ver estado de tus reportes",
            badge: 3,
        },
        {
            id: "map",
            icon: ICONS.MapPin,
            label: "Mapa de Reportes",
            description: "Explorar reportes cercanos",
        },
        {
            id: "notifications",
            icon: ICONS.Bell,
            label: "Notificaciones",
            description: "Alertas y actualizaciones",
            badge: 2,
        },
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#f8fafc',
            userSelect: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>

            {/* Header Verde Oscuro Institucional */}
            <div style={{
                backgroundColor: '#005c2e',
                padding: '20px 16px 36px 16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '16px',
                            backgroundColor: '#ffffff',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <img
                                src={IMAGES.logo}
                                alt="Cleanmapp"
                                style={{ width: '180%', height: '180%', objectFit: 'contain' }}
                            />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', margin: 0 }}>Cleanmap</h1>
                            <p style={{ fontSize: '16px', color: '#a7f3d0', opacity: 0.8, margin: 0 }}>Ciudad más limpia</p>
                        </div>
                    </div>

                    {/* Campana de Notificación con Punto de Alerta */}
                    <button style={{
                        position: 'relative',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
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

                {/* Banner de Bienvenida */}
                <div style={{
                    backgroundColor: 'lab(44 -35.92 17)',
                    borderRadius: '24px',
                    padding: '16px',
                    border: '1px solid rgba(16,185,129,0.1)'
                }}>
                    <p style={{ fontSize: '16px', color: 'lab(98.84% .0000298023 -.0000119209)', opacity: 0.7, fontWeight: '400', margin: 0 }}>Bienvenido,</p>
                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginTop: '2px', margin: 0 }}>Juan García</p>
                </div>
            </div>

            {/* Bloque Flotante de Contadores */}
            <div style={{ padding: '0 16px', marginTop: '-20px' }}>
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    border: '1px solid #f1f5f9',
                    padding: '16px'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p style={{ fontSize: '24px', fontWeight: '900', color: '#005c2e', margin: 0 }}>5</p>
                            <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginTop: '4px', margin: 0 }}>Reportes</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9' }}>
                            <p style={{ fontSize: '24px', fontWeight: '900', color: '#10b981', margin: 0 }}>3</p>
                            <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginTop: '4px', margin: 0 }}>Resueltos</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p style={{ fontSize: '24px', fontWeight: '900', color: '#0284c7', margin: 0 }}>2</p>
                            <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginTop: '4px', margin: 0 }}>En proceso</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Listado Principal de Acciones de la Calle con Scroll */}
            <div style={{
                flex: 1,
                padding: '20px 16px 24px 16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                <p style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 4px 4px'
                }}>
                    Acciones principales
                </p>

                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px',
                            borderRadius: '24px',
                            border: 'none',
                            textAlign: 'left',
                            minHeight: '72px',
                            cursor: 'pointer',
                            backgroundColor: item.accent ? '#005c2e' : '#e7ede8',
                            color: item.accent ? '#ffffff' : '#1e293b',
                            boxShadow: item.accent ? '0 4px 6px -1px rgba(0,92,46,0.1)' : 'none'
                        }}
                    >
                        {/* Contenedor del Icono Redondeado */}
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            backgroundColor: item.accent ? 'lab(44 -35.92 17)' : '#d0e0d6',
                            color: item.accent ? '#d0e0d6' : '#005c2e',
                            border: item.accent ? 'none' : '1px solid #f1f5f9'
                        }}>
                            <item.icon />
                        </div>

                        {/* Textos Informativos */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: '700',
                                color: item.accent ? '#ffffff' : '#1e293b',
                                margin: 0
                            }}>
                                {item.label}
                            </p>
                            <p style={{
                                fontSize: '14px',
                                marginTop: '2px',
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: item.accent ? '#a7f3d0' : '#94a3b8'
                            }}>
                                {item.description}
                            </p>
                        </div>

                        {/* Globo de números de Notificaciones / Badges */}
                        {item.badge && (
                            <span style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                fontSize: '15px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                backgroundColor: item.accent ? '#ffffff' : '#005c2e',
                                color: item.accent ? '#005c2e' : '#ffffff'
                            }}>
                                {item.badge}
                            </span>
                        )}

                        {/* Flecha derecha */}
                        <ICONS.ChevronRight />
                    </button>
                ))}

                {/* Sección de Actividad Reciente */}
                <div style={{ paddingTop: '8px', paddingBottom: '65px' }}>
                    <p style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        margin: '0 0 12px 4px'
                    }}>
                        Actividad reciente
                    </p>
                    <div style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                        borderRadius: '24px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        {/* Evento En Proceso */}
                        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#f0f9ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                border: '1px solid #e0f2fe',
                                color: '#0284c7'
                            }}>
                                <ICONS.Clock />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: '16px', fontWeight: '700', color: '#334155', margin: 0 }}>Reporte #2847 actualizado</p>
                                <p style={{ fontSize: '14px', color: '#64748b', marginTop: '2px', margin: 0 }}>Estado: <span style={{ color: '#0284c7', fontWeight: '600' }}>En proceso</span></p>
                                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px', margin: 0 }}>Hace 2 horas</p>
                            </div>
                        </div>
                        
                        {/* Evento Resuelto */}
                        <div style={{ display: 'flex', alignItems: 'start', gap: '12px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#ecfdf5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                border: '1px solid #d1fae5',
                                color: '#10b981'
                            }}>
                                <ICONS.FileText />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: '16px', fontWeight: '700', color: '#334155', margin: 0 }}>Reporte #2801 resuelto</p>
                                <p style={{ fontSize: '14px', color: '#64748b', marginTop: '2px', margin: 0 }}>Limpieza completada con éxito</p>
                                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px', margin: 0 }}>Ayer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Barra Inferior Fija Fuera del Scroll */}
            <TabBar currentTab="home"/>
        </div>
    );
}