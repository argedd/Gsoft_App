export const resetFormPlan = () => ({
    type: 'RESET_FORM_PLAN',
});
export const setPlan = (plan: any) => ({
    type: 'SET_PLAN',
    payload: plan,
  });
  export const setClientType = (client_type: any) => ({
    type: 'SET_CLIENT_TYPE',
    payload: client_type,
  });
  export const setClients = (clients: any) => ({
    type: 'SET_CLIENTS',
    payload: clients,
  });