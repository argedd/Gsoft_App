import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api= gsoftAPI;
export const getContracts = async (idClient:number) => {
  try {
    // Realizar la solicitud de inicio de sesión
  

    const response = await api.get(`/contracts/?client=${idClient}`);


    return response.data
 


 
 
 
  } catch (error) {
    // console.error('Error al iniciar sesión:', error);
    // Manejar errores de inicio de sesión
  }
};
