const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed',
      };
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      };
    case 'SIGN_OUT_SUCCESS':
      console.log('signed out');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('signed up');
      return {
        ...state,
        authError: null,
      };
    case 'SIGNUP_ERROR':
      console.log("couldn't sign up");
      return {
        ...state,
        authError: action.error.message,
      };
    default:
      return state;
  }
};

export default authReducer;
