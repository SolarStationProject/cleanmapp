import { useNavigate } from 'react-router-dom';
//import { MyReportsList } from '../../users/MyReportsList';

// Importamos el diccionario de imágenes que ya tienes en tu estructura
import { IMAGES } from "../../assets/images"; 
import { ICONS } from "../../assets/icons"
//import { useState } from "react";

export default function HomePage() {
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
            id: "map",
            icon: ICONS.MapPin,
            label: "Mapa de Reportes",
            description: "Explorar reportes cercanos",
        }
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
                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginTop: '2px', margin: 0 }}>Carlos Méndez</p>
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
                            backgroundColor: '#e7ede8',
                            color: '#1e293b',
                            boxShadow: 'none'
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
                            backgroundColor: '#d0e0d6',
                            color: '#005c2e',
                            border: '1px solid #f1f5f9'
                        }}>
                            <item.icon />
                        </div>

                        {/* Textos Informativos */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: '700',
                                color: '#1e293b',
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
                                color: '#94a3b8'
                            }}>
                                {item.description}
                            </p>
                        </div>

                        {/* Flecha derecha */}
                        <ICONS.ChevronRight />
                    </button>
                ))}
            </div>
        </div>
    );
}