import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { constants } from 'modules/Auth'

import swallSuccess from 'utils/swalSuccess';
import swallFailure from 'utils/swalFailure';

const initialState = {
  authError: null,
  user: {},
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_ERROR:
      swallFailure(action.error.message);
      return {
        ...state,
        loading: false,
        authError: action.error.message,
      };
    case constants.LOGIN_SUCCESS:
      swallSuccess('Welcome Back!');

      return {
        ...state,
        authError: null,
        loading: false,
        user: action.user
      };
    case constants.SIGN_OUT_SUCCESS:
      swallSuccess('Bye bye :)');
      return initialState;
    case constants.SIGNUP_SUCCESS:
      swallSuccess('Welcome!');

      return {
        ...state,
        loading: false,
        authError: null,
      };
    case constants.SIGNUP_ERROR:
      swallFailure(action.error.message);
      return {
        ...state,
        loading: false,
        authError: action.error.message,
      };
    case constants.AUTH_LOADING:
      return {
        ...state,
        loading: true
      }
    case constants.RESET_ERRORS:
      return {
        ...state,
        authError: null
      }
    default:
      return state;
  }
};

const authPersistConfig = {
  key: 'auth',
  storage
}

export default persistReducer(authPersistConfig, authReducer);
