import { combineReducers } from 'redux'
import { reducer as authReducer } from 'modules/Auth'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer
