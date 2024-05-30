import { RootMethods } from "../../data/interfaces/methods_interface";
import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api = gsoftAPI;

 const getMehotds = async (): Promise<RootMethods> => {
  try {
    const response = await api.get<RootMethods>(`/payments/methods/`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener metodos: ' + error);
  }
};



export{
    getMehotds,
}
