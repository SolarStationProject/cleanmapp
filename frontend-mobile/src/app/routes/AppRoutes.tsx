import { Routes, Route, Navigate } from 'react-router-dom';
//import { AuthProvider } from '../providers/AuthProvider';
//import { TrackingProvider } from '../providers/TrackingProvider';

// Importación ficticia de tus pantallas (ajusta las rutas a tus archivos reales)
import SplashScreen from '../../components/screens/auth/SplashScreen';
//import LoginScreen from '../../views/auth/LoginScreen';
//import RegisterScreen from '../../views/auth/RegisterScreen';
import HomeScreen from '../../components/screens/main/HomeScreen';
import MyReportsList from '../../components/screens/main/MyReportsList';
import MapScreen from '../../components/screens/main//MapScreen';
//import ProfileScreen from '../../views/main/ProfileScreen';

export default function AppRoutes() {
    return (
        //<AuthProvider>
            <Routes>
                {/* === RUTAS PÚBLICAS (AUTENTICACIÓN) === */}
                <Route path="/" element={<SplashScreen/>} />
                {/*<Route path="/login" element={<LoginScreen />} />*/}
                {/*<Route path="/register" element={<RegisterScreen />} />*/}

                {/* === RUTAS PRIVADAS (REQUIEREN INTEGRACIÓN O LOGIN) === */}
                {/* Envolvemos el mapa y el home en el TrackingProvider para activar el GPS de Capacitor */}
                
                <Route path="/home" element={
                    //<TrackingProvider>
                        <HomeScreen />
                    //</TrackingProvider>
                } />
                
                <Route path="/map" element={
                    //<TrackingProvider>
                        <MapScreen />
                    //</TrackingProvider>
                } />

                <Route path="/my-reports" element={
                    //<TrackingProvider>
                        <MyReportsList />
                    //</TrackingProvider>
                } />

                {/*
                <Route path="/perfil" element={<ProfileScreen />} />
                */}
                {/* === REDIRECCIÓN POR DEFECTO === */}
                {/* Si el usuario escribe cualquier cosa rara, lo manda al Home o Login */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        //</AuthProvider>
    );
}
