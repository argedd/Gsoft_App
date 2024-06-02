export const resetForm = () => ({
    type: 'RESET_FORM',
});
export const setDeparment = (department: any) => ({
    type: 'SET_DEPARTMENT',
    payload: department,
  });
  export const setIssue = (issue: any) => ({
    type: 'SET_ISSUE',
    payload: issue,
  });