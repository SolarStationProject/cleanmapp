import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Ubicacion } from '../shared/types';

export const HardwareService = {
    //Obtiene las coordenadas GPS actuales del ciudadano en tiempo real utilizando el hardware del dispositivo.
    //Maneja internamente la solicitud de permisos nativos de ubicación.
    async obtenerUbicacionActual(): Promise<Ubicacion> {
        try {
            // 1. Verificar y solicitar permisos de geolocalización al sistema operativo móvil
            const estadoPermiso = await Geolocation.checkPermissions();

            if (estadoPermiso.location !== 'granted') {
                const solicitud = await Geolocation.requestPermissions({ permissions: ['location'] });
                if (solicitud.location !== 'granted') {
                    throw new Error('El ciudadano denegó los permisos de acceso al GPS.');
                }
            }

            // 2. Obtener posición con alta precisión (esencial para mapeo urbano y PostGIS)
            const posicion = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000 // Máximo 10 segundos de espera para enganchar satélites
            });

            // Retorna la estructura limpia alineada con tus interfaces compartidas
            return {
                comuna: 'Detectando...', // Se resolverá en el backend o mediante geocodificación inversa posterior
                latitud: posicion.coords.latitude,
                longitud: posicion.coords.longitude
            };
        } catch (error: any) {
            console.error('Error en HardwareService.obtenerUbicacionActual:', error);
            throw new Error(error.message || 'No se pudo acceder al GPS del dispositivo.');
        }
    },


    //Abre la cámara nativa del smartphone para capturar la evidencia fotográfica del reporte de basura.
    //Retorna el string Base64 pesado, compatible con tu columna TEXT en PostgreSQL.
    async tomarFotoEvidencia(): Promise<string> {
        try {
            // 1. Verificar y solicitar permisos de cámara al sistema operativo móvil
            const estadoPermiso = await Camera.checkPermissions();

            if (estadoPermiso.camera !== 'granted') {
                const solicitud = await Camera.requestPermissions({ permissions: ['camera'] });
                if (solicitud.camera !== 'granted') {
                    throw new Error('El ciudadano denegó los permisos de acceso a la cámara.');
                }
            }

            // 2. Levantar la interfaz de cámara nativa del celular
            const foto = await Camera.getPhoto({
                quality: 70, // Compresión óptima para no saturar el payload HTTP ni la Base de Datos
                allowEditing: false, // Evita pasos extra innecesarios en la calle
                resultType: CameraResultType.Base64, // String puro ideal para tu interfaz y base de datos
                source: CameraSource.Camera, // Fuerza el uso de la cámara trasera directa, no la galería
                saveToGallery: false // No llena el almacenamiento privado del ciudadano
            });

            if (!foto.base64String) {
                throw new Error('No se generaron datos legibles de la captura.');
            }

            // Retornamos el string listo para ser inyectado en el campo "foto" del formulario
            return `data:image/jpeg;base64,${foto.base64String}`;
        } catch (error: any) {
            console.error('Error en HardwareService.tomarFotoEvidencia:', error);
            throw new Error(error.message || 'Error al interactuar con la cámara nativa.');
        }
    }
};
