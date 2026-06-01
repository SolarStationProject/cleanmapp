import { Routes, Route, Navigate } from 'react-router-dom';
//import { AuthProvider } from '../providers/AuthProvider';
//import { TrackingProvider } from '../providers/TrackingProvider';

// Importación ficticia de tus pantallas (ajusta las rutas a tus archivos reales)
//import LoginScreen from '../../views/auth/LoginScreen';
//import RegisterScreen from '../../views/auth/RegisterScreen';
import HomeScreen from '../../pages/main/HomePage';
import ReportDetail from '../../pages/main/ReportDetail';
import MapScreen from '../../pages/main/MapPage';
//import ProfileScreen from '../../views/main/ProfileScreen';

export default function AppRoutes() {
    return (
        //<AuthProvider>
            <Routes>
                {/* === RUTAS PÚBLICAS (AUTENTICACIÓN) === */}

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

                <Route path="/other-report-detail" element={
                    //<TrackingProvider>
                        <ReportDetail />
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