import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todoReducer from './todoReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
