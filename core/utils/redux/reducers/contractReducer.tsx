// src/redux/reducers/contractReducer.js
const initialState = {
    contract: null,
  };
  
  const contractReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_CONTRACT':
        return {
          ...state,
          contract: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default contractReducer;
  