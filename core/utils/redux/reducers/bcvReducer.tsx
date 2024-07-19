const initialState = {
    tasa:null, 
  };
  
  const bcvReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
   
          
          case 'SET_TASA':
            return {
              ...state,
              tasa: action.payload,
            };

          case 'RESET_FORM_BCV':
            return initialState;
      
      default:
        return state;
    }
  };
  
  export default bcvReducer;
  