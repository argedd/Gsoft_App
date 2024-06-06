import { RootMethods } from "../../data/interfaces/methods_interface";
import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api = gsoftAPI;

 const getMethods = async (): Promise<RootMethods> => {
  try {
    const response = await api.get<RootMethods>(`/payments/methods/`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener metodos: ' + error);
  }
};

const saveMethods = async (body:any): Promise<any> => {
  
    const response = await api.post<any>(`/payments/methods/`,body);
    return response.data; // Devuelve solo los datos de la respuesta

};

const editMethods = async (id:any,body:any): Promise<any> => {

    const response = await api.patch<any>(`/payments/methods/${id}/`,body);
    return response.data; // Devuelve solo los datos de la respuesta

};


const deleteMethod = async (id:any): Promise<any> => {

    const response = await api.delete<any>(`/payments/methods/${id}/`);
    return response.data; // Devuelve solo los datos de la respuesta

};



export{
  getMethods,
  saveMethods,
  editMethods,
  deleteMethod
}
