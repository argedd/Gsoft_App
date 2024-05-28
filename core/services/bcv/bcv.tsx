import axios from "axios";
import { RootBcv } from "../../data/interfaces/bcv_interface";

const api = axios.create({
    baseURL: "https://core.gsoft.app/api/gsoft/services",
});

const getTasaBcv = async (): Promise<RootBcv> => {
    try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // Formatea la fecha a YYYY-MM-DD

        const response = await api.get<RootBcv>(`/dollar/?fecha=${formattedDate}`);
    
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        throw new Error('Error al obtener tasa bcv : ' + error);
    }
};

export {
    getTasaBcv,
};
