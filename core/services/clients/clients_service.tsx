import { Client } from "../../data/interfaces/client_interface";
import { RootContract } from "../../data/interfaces/contract_interface";
import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api= gsoftAPI;
 const getContracts = async (idClient:number) => {
  try {
    // Realizar la solicitud de inicio de sesión
  

    const response = await api.get(`/contracts/?client=${idClient}`);


    return response.data
 
 
 
  } catch (error) {
    // console.error('Error al iniciar sesión:', error);
    // Manejar errores de inicio de sesión
  }
};

 const getContractDetail = async (contract: number): Promise<RootContract> => {
  try {
    const response = await api.get<RootContract>(`/contracts/${contract}/`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener detalles del contrato: ' + error);
  }
};

const validatePassword = async (body:any): Promise<any> => {

  const response = await api.post<any>(`/clients/validate_password/`,body);
  return response.data; // Devuelve solo los datos de la respuesta

};

const setPassword = async (body:any): Promise<any> => {

  const response = await api.post<any>(`/clients/set_password/`,body);
  return response.data; // Devuelve solo los datos de la respuesta

};

const getClient = async (): Promise<Client> => {

  const response = await api.get<Client>(`/clients/`);
  return response.data; // Devuelve solo los datos de la respuesta

};

const setClient = async (id:number,body:any): Promise<any> => {

  const response = await api.patch<any>(`/clients/${id}/`,body);
  return response.data; // Devuelve solo los datos de la respuesta

};


const sendToken = async (body:any): Promise<any> => {

  const response = await api.post<any>(`/clients/firebase_token/`,body);
  return response.data; // Devuelve solo los datos de la respuesta

};

export{
  getContracts,
  getContractDetail,
  validatePassword,
  setPassword,
  getClient,
  setClient,
  sendToken,
}
