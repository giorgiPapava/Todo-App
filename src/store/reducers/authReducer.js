import swallSuccess from 'utils/swalSuccess';
import swallFailure from 'utils/swalFailure';

const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      swallFailure(action.error.message);
      return {
        ...state,
        authError: 'Login failed',
      };
    case 'LOGIN_SUCCESS':
      swallSuccess('Welcome Back!');

      return {
        ...state,
        authError: null,
      };
    case 'SIGN_OUT_SUCCESS':
      swallSuccess('Bye bye :)');
      return state;
    case 'SIGNUP_SUCCESS':
      swallSuccess('Welcome!');

      return {
        ...state,
        authError: null,
      };
    case 'SIGNUP_ERROR':
      swallFailure(action.error.message);
      return {
        ...state,
        authError: action.error.message,
      };
    default:
      return state;
  }
};

export default authReducer;
