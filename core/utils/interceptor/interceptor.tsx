import axios from "axios";
import { getData } from "../asyncStorage/asyncStorage";

export const gsoftAPI = axios.create({
    baseURL: "https://core.gsoft.app/api/gsoft/portal",
});

gsoftAPI.interceptors.request.use(async (config) =>  {
    try {
        // Obtener el token del almacenamiento asíncrono
        const dataUser = await getData('user');
        const token = dataUser.token;

        // Verificar que el token esté disponible
        if (!token) {
            console.error('Token no disponible');
            return config;
        }

        // Establecer el token en las cabeceras de la solicitud
        config.headers["Authorization"] = `Token ${token}`;
        return config;
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return config;
    }
});

gsoftAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);

        // Manejar errores de respuesta
        if (error.response.status == 500) {
            console.log("Server Internal Error (500)");
        }
        if (error.request.status == 0) {
            console.log("Error de conexión, intente nuevamente");
        }
        if (error.response.status == 401) {
            console.log('Unauthorized (401)');
            // Realizar acciones adicionales para el error 401 si es necesario
        }
        return Promise.reject(error);
    }
);