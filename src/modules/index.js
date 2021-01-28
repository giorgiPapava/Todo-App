import { combineReducers } from 'redux';
import {reducer as authReducer } from 'modules/Auth';
import {reducer as subcategoriesReducer } from 'modules/Subcategories';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  subcategories: subcategoriesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
