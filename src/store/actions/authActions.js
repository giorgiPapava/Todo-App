import firebase, { auth } from 'firebase/app';

export const signIn = (credintials) => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credintials.email, credintials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_ERROR', error });
      });
  };
};

export const signInWithGoogle = (provider) => {
  return (dispatch, getState) => {
    const provider = new auth.GoogleAuthProvider();
    console.log(provider);
    auth()
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(function (error) {
        dispatch({ type: 'LOGIN_ERROR', error });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGN_OUT_SUCCESS' });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((response) => {
        return firebase
          .firestore()
          .collection('users')
          .doc(response.user.uid)
          .set({
            firstname: newUser.firstname,
            lastname: newUser.lastname,
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((error) => {
        dispatch({ type: 'SIGNUP_ERROR', error });
      });
  };
};
