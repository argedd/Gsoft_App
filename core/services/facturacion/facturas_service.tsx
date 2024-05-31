import axios from "axios";
import { Invoice } from "../../data/interfaces/invoice_interface";
import { RootInvoices } from "../../data/interfaces/invoices_interface";
import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api = gsoftAPI;
const validateApi = axios.create({
  baseURL: "https://core.gsoft.app/api/gsoft/",
}); 

const getInvoices = async (contract: number): Promise<RootInvoices> => {
  try {
    const response = await api.get<RootInvoices>(`/invoices/?remove_pagination=true&contract=${contract}`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener las facturas: ' + error);
  }
};

const getInvoice = async (invoice: number): Promise<Invoice> => {
  try {
    const response = await api.get<Invoice>(`/invoices/${invoice}/`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener factura: ' + error);
  }
};


const paymentValidate = async (formValidate: any) => {
   
    return validateApi.post<any>(`payments/pmbd/validate/`, formValidate).then(resp=>{
     
      return resp.data;
    }).catch(err=>{

      return {error:'Pago No encontrado'}
    }); // Devuelve solo los datos de la respuesta
 
};

export{
  getInvoices,
  getInvoice,
  paymentValidate
}
