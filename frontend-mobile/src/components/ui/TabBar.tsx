import { useNavigate } from "react-router-dom";
import { ICONS } from "../../assets/icons"

interface TabBarProps {
    currentTab: string;
}

export default function TabBar({ currentTab }: TabBarProps) {
    const navigate = useNavigate(); // Inicializamos el enrutador nativo

    // 2. SOLUCIÓN: Lógica unificada para viajar a tus rutas de AppRoutes.tsx al pulsar la barra
    const handleTabClick = (tabId: string) => {
        switch (tabId) {
            case "home":
                navigate("/home");
                break;
            case "my-reports":
                navigate("/my-reports"); // Te manda a la pantalla de tus denuncias
                break;
            case "map":
            case "new-report":
                navigate("/map"); // Te manda al mapa nativo que ya tienes configurado
                break;
            default:
                break;
        }
    };

    const tabs = [
        { id: 'home', label: 'Inicio', icon: ICONS.Home },
        { id: 'map', label: 'Mapa', icon: ICONS.Map },
        { id: 'new-report', label: 'Reportar', icon: ICONS.Plus, isCenter: true },
        { id: 'my-reports', label: 'Mis reportes', icon: ICONS.FileText },
        { id: 'profile', label: 'Perfil', icon: ICONS.User },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: 'calc(76px + env(safe-area-inset-bottom, 0px))',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 8px',
            zIndex: 1000,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxSizing: 'border-box',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}>
            {tabs.map((tab) => {
                const isActive = currentTab === tab.id;

                // Diseño especial para el botón central de acción "+"
                if (tab.isCenter) {
                    return (
                        <div key={tab.id} style={{ position: 'relative', width: '60px', height: '60px' }}>
                            <button
                                onClick={() => handleTabClick(tab.id)}
                                style={{
                                    position: 'absolute',
                                    top: '0px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    backgroundColor: '#005c2e',
                                    color: '#ffffff',
                                    border: '1px solid #ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 10px rgba(0, 92, 46, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.1s ease',
                                    padding: 0
                                }}
                            >
                                <tab.icon />
                            </button>
                        </div>
                    );
                }

                // Diseño estándar para el resto de botones laterales
                return (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            background: 'none',
                            border: 'none',
                            width: '60px',
                            height: '100%',
                            cursor: 'pointer',
                            padding: '4px 0',
                            color: isActive ? '#005c2e' : '#94a3b8',
                            transition: 'color 0.1s ease'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isActive ? '#005c2e' : '#94a3b8'
                        }}>
                            <tab.icon />
                        </div>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: isActive ? '700' : '500',
                            whiteSpace: 'nowrap'
                        }}>
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
