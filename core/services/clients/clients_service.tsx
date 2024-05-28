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

export{
  getContracts,
  getContractDetail,
}
