const initialState = {
    department:{
      id:'4',
      name:'FINANZAS',
    },
    issue:{
      id:'',
      name:'',
    },
  };
  
  const ticketReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_DEPARTMENT':
        return {
          ...state,
          department: action.payload,
        }; 
        case 'SET_ISSUE':
          return {
            ...state,
            issue: action.payload,
          };    

          case 'RESET_FORM':
            return initialState;
      
      default:
        return state;
    }
  };
  
  export default ticketReducer;
  