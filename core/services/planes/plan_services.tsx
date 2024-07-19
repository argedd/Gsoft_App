import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api = gsoftAPI;



const getPlanes = async (contract:string): Promise<any> => {

    const response = await api.get<any>(`/services/client_type/cp/${contract}/`);
    return response.data; // Devuelve solo los datos de la respuesta
 
};

const changePlan = async (contract:any,form:any): Promise<any> => {

    const response = await api.post<any>(`/contracts/change_plan/${contract}/`,form);

    return response.data; 
 
};


export{
    getPlanes,
    changePlan,

}
