export const createTodo = (todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    dispatch({ type: 'CREATE_TODO', todo: todo });
  };
};
