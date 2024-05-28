// src/redux/reducers/invoiceReducer.js
const initialState = {
    data:null,
  };
  
  const invoiceReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_INVOICE':
        return {
          ...state,
          data: action.payload,
        };
    
      default:
        return state;
    }
  };
  
  export default invoiceReducer;
  