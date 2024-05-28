// src/redux/reducers/contractReducer.js
const initialState = {
    contract: null,
    data:null,
  };
  
  const contractReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_CONTRACT':
        return {
          ...state,
          contract: action.payload,
        };
        case 'SET_DATA_CONTRACT':
          return {
            ...state,
            data: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default contractReducer;
  