const initialState = {
    areaCode: '0412',
    sender: null,
  };
  
  const formReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_ACODE':
        return {
          ...state,
          areaCode: action.payload,
        };

        case 'SET_SENDER':
          return {
            ...state,
            sender: action.payload,
          };

          case 'RESET_FORM':
            return initialState;
      
      default:
        return state;
    }
  };
  
  export default formReducer;
  