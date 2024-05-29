import { Invoice } from "../../../data/interfaces/invoice_interface";

export const setInvoice = (invoice: Invoice) => ({
    type: 'SET_INVOICE',
    payload: invoice,
  });

  export const setAmountBs = (amountBs: any) => ({
    type: 'SET_INVOICE_AMOUNTBS',
    payload: amountBs,
  });

  export const setAmount = (amount: any) => ({
    type: 'SET_INVOICE_AMOUNT',
    payload: amount,
  });

  export const setMethod = (method: any) => ({
    type: 'SET_METHOD',
    payload: method,
  });