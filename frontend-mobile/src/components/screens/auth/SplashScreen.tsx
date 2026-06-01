import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../../assets/images'

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            userSelect: 'none',
            fontFamily: 'system-ui, sans-serif'
        }}>
            {/* Contenedor del Logo (Reemplaza el emoji por tu etiqueta <img> cuando quieras) */}
            <div style={{marginBottom: '20px'}}>
                <img
                    src={IMAGES.logo}
                    alt="Cleanmapp"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
}

