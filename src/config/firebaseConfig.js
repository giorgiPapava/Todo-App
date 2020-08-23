import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAE_kGqfen5vUnJi5DGeqqGtAjAafIajTA',
  authDomain: 'todo-app-fa6eb.firebaseapp.com',
  databaseURL: 'https://todo-app-fa6eb.firebaseio.com',
  projectId: 'todo-app-fa6eb',
  storageBucket: 'todo-app-fa6eb.appspot.com',
  messagingSenderId: '23540514081',
  appId: '1:23540514081:web:2f95d350dd39ffc338d260',
  measurementId: 'G-MHJSF9EDLC',
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export default firebase;
