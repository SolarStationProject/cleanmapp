// frontend-mobile/src/app/routes/TabBar.tsx (PARTE 1 DE 2)

interface TabBarProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
}

export default function TabBar({ currentTab, onTabChange }: TabBarProps) {
    // Iconos vectoriales específicos para el menú inferior
    const Icons = {
        Home: () => (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
        Map: () => (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.651A1.125 1.125 0 0 0 3 6.659v11.078c0 .426.24.817.622 1.006l4.875 2.437c.316.159.69.159 1.006 0l4.997-2.498a1.125 1.125 0 0 1 1.006 0Z" />
            </svg>
        ),
        Plus: () => (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        ),
        Bell: () => (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
        ),
        User: () => (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        )
    };

    const tabs = [
        { id: 'home', label: 'Inicio', icon: Icons.Home },
        { id: 'map', label: 'Mapa', icon: Icons.Map },
        { id: 'new-report', label: 'Reportar', icon: Icons.Plus, isCenter: true },
        { id: 'notifications', label: 'Alertas', icon: Icons.Bell },
        { id: 'profile', label: 'Perfil', icon: Icons.User },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '76px',
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
            boxSizing: 'border-box'
        }}>
            {tabs.map((tab) => {
                const isActive = currentTab === tab.id;

                // Diseño especial para el botón central de acción "+"
                if (tab.isCenter) {
                    return (
                        <div key={tab.id} style={{ position: 'relative', width: '60px', height: '60px' }}>
                            <button
                                onClick={() => onTabChange(tab.id)}
                                style={{
                                    position: 'absolute',
                                    top: '-24px',
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
                        onClick={() => onTabChange(tab.id)}
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
                            fontSize: '11px',
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
