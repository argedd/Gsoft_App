// src/redux/actions/contractActions.js
export const setContract = (contract: number) => ({
    type: 'SET_CONTRACT',
    payload: contract,
  });

  export const setDataContract = (contract: any) => ({
    type: 'SET_DATA_CONTRACT',
    payload: contract,
  });
  
  