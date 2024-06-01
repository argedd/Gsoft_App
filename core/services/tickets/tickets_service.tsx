import { RootTickets } from "../../data/interfaces/tickets_interface";
import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api = gsoftAPI;

 const getTickets = async (): Promise<RootTickets> => {
  try {
    const response = await api.get<RootTickets>(`/tickets/`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener metodos: ' + error);
  }
};

const saveTickets = async (body:any): Promise<any> => {
    const response = await api.post<any>(`/tickets/`,body);
    return response.data; // Devuelve solo los datos de la respuesta

};





export{
    getTickets,
    saveTickets,

}
