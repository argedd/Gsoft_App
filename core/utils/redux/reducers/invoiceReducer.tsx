// src/redux/reducers/invoiceReducer.js
const initialState = {
    data:null,
    amountBs:0,
    amount:0,
    method:1,
  };
  
  const invoiceReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_INVOICE':
        return {
          ...state,
          data: action.payload,
        };
        case 'SET_INVOICE_AMOUNTBS':
          return {
            ...state,
            amountBs: action.payload,
          };
          case 'SET_INVOICE_AMOUNT':
            return {
              ...state,
              amount: action.payload,
            };
            case 'SET_METHOD':
              return {
                ...state,
                method: action.payload,
              };
      default:
        return state;
    }
  };
  
  export default invoiceReducer;
  