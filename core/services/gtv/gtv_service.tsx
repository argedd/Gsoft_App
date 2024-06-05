import { string } from "yup";
import { RootIssues, RootTicket, RootTickets, Timeline } from "../../data/interfaces/tickets_interface";
import { gsoftAPI } from "../../utils/interceptor/interceptor";
import { ChannelPackages, Packages } from "../../data/interfaces/gtv_interface";

const api = gsoftAPI;

 const getInfo = async (id:string): Promise<any> => {

  try {
    const response = await api.get<any>(`/gtv/account/${id}/info/`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener metodos: ' + error);
  }
};

const putAccountGtv = async (id:any,body:any): Promise<any> => {
    const response = await api.put<any>(`/gtv/account/${id}/`,body);
    return response.data; // Devuelve solo los datos de la respuesta

};

const deleteDevice = async (body:any): Promise<any> => {
    const response = await api.post<any>(`/gtv/delete_device/`,body);
    return response.data; // Devuelve solo los datos de la respuesta

};

const getPackages = async (): Promise<Packages> => {

    try {
      const response = await api.get<Packages>(`/gtv/package/?status=true`);
      return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
      throw new Error('Error al obtener metodos: ' + error);
    }
  };

  const getChannels = async (): Promise<ChannelPackages> => {

    try {
      const response = await api.get<ChannelPackages>(`/gtv/channels_package/?package=1`);
      return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
      throw new Error('Error al obtener metodos: ' + error);
    }
  }







export{
    getInfo,
    putAccountGtv,
    deleteDevice,
    getPackages,
    getChannels

}
