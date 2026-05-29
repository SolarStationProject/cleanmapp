import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../services/api'

export function useAxios<T>(url: string, params?: Record<string, any>) {
    const [data, setData] = useState<T | null>(null); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        // Axios usa CancelToken para cancelar peticiones si el usuario cambia de pantalla
        const source = axios.CancelToken.source();
        
        setLoading(true);

        // Se usa la instancia 'api'. Ya tiene la IP configurada, solo requiere la ruta (ej: '/api/reports')
        api.get<T>(url, { cancelToken: source.token, params: params })
            .then((res) => {
                // Axios ya convierte la respuesta a JSON automáticamente en res.data
                setData(res.data);
            })
            .catch((err) => {
                // Evitamos guardar el error si la petición fue cancelada a propósito
                if (!axios.isCancel(err)) {
                    setError(err.message || 'Error al obtener datos');
                }
            })
            .finally(() => {
                setLoading(false);
            });

        // Al desmontar la pantalla, se cancela la petición de Axios
        return () => source.cancel('Componente desmontado');
        // Se escucha los cambios en la URL o en los parámetros
    }, [url, JSON.stringify(params)]); 

    return { data, loading, error };
}