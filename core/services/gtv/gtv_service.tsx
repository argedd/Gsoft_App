import { string } from "yup";
import { RootIssues, RootTicket, RootTickets, Timeline } from "../../data/interfaces/tickets_interface";
import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api = gsoftAPI;

 const getInfo = async (id:string): Promise<any> => {

  try {
    const response = await api.get<any>(`/gtv/account/${id}/info/`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener metodos: ' + error);
  }
};

// const saveTickets = async (body:any): Promise<any> => {
//     const response = await api.post<any>(`/tickets/`,body);
//     return response.data; // Devuelve solo los datos de la respuesta

// };


// const getIssues = async (department:any): Promise<RootIssues> => {
//   try {
//     const response = await api.get<RootIssues>(`/departments/issues/?department_id=${department}`);

//     return response.data; // Devuelve solo los datos de la respuesta
//   } catch (error) {
//     throw new Error('Error al obtener asuntos: ' + error);
//   }
// };


// const getTimeLine = async (ticket:any): Promise<Timeline> => {
//   try {
//     const response = await api.get<Timeline>(`/tickets/${ticket}/time_line/`);

//     return response.data; // Devuelve solo los datos de la respuesta
//   } catch (error) {
//     throw new Error('Error al obtener timeline: ' + error);
//   }
// };

// const getTicket = async (ticket:any): Promise<RootTicket> => {
//   try {
//     const response = await api.get<RootTicket>(`/tickets/${ticket}/`);

//     return response.data; // Devuelve solo los datos de la respuesta
//   } catch (error) {
//     throw new Error('Error al obtener timeline: ' + error);
//   }
// };





export{
    getInfo,
 

}
