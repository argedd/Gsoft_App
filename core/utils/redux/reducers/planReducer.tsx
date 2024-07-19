const initialState = {
    plan:null,
    client_type:null,
    clients:null
 
  };
  
  const planReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_PLAN':
        return {
          ...state,
          plan: action.payload,
        }; 
        case 'SET_CLIENT_TYPE':
          return {
            ...state,
            client_type: action.payload,
          };
          
          case 'SET_CLIENTS':
            return {
              ...state,
              clients: action.payload,
            };

          case 'RESET_FORM_PLAN':
            return initialState;
      
      default:
        return state;
    }
  };
  
  export default planReducer;
  