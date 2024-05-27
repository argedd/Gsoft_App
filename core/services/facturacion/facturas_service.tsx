import { RootInvoices } from "../../data/interfaces/invoices_interface";
import { gsoftAPI } from "../../utils/interceptor/interceptor";

const api = gsoftAPI;

export const getInvoices = async (contract: number): Promise<RootInvoices> => {
  try {
    const response = await api.get<RootInvoices>(`/invoices/?remove_pagination=true&contract=${contract}`);
    return response.data; // Devuelve solo los datos de la respuesta
  } catch (error) {
    throw new Error('Error al obtener las facturas: ' + error);
  }
};
