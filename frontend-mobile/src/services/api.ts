import axios from 'axios';

// En desarrollo con emuladores/celulares reales:
// - Si usas emulador de Android, 'localhost' no funciona, debes usar 'http://10.0.2'
// - Si pruebas en dispositivo físico, usa la IP privada de tu PC (ej: 'http://1.xx')
//export const API_URL = 'http://localhost:3000'; //local
export const API_URL = 'http://{tu_ip_webnative}:3000'; //usar Ip de webnative u otro entorno de ejecución móvil

export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/*
// Interceptor para inyectar automáticamente el Token de sesión en cada petición
api.interceptors.request.use(
    (config) => {
        // Obtenemos el token guardado por el AuthProvider (se adapta a tu lógica de guardado)
        const token = localStorage.getItem('cleanmap_token'); 
        
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
*/
