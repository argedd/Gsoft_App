import { Invoice } from "../../../data/interfaces/invoice_interface";

export const setInvoice = (invoice: Invoice) => ({
    type: 'SET_INVOICE',
    payload: invoice,
  });