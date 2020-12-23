import firebase, { auth } from 'firebase/app';

import { constants } from 'modules/Auth'

export const signIn = (credintials) => {
  return (dispatch, getState) => {
    dispatch({ type: constants.AUTH_LOADING })
    firebase
      .auth()
      .signInWithEmailAndPassword(credintials.email, credintials.password)
      .then(({ user }) => {
        dispatch({ type: constants.LOGIN_SUCCESS, user });
      })
      .catch((error) => {
        dispatch({ type: constants.LOGIN_ERROR, error });
      });
  };
};

export const signInWithGoogle = (provider) => {
  return (dispatch, getState) => {
    dispatch({ type: constants.AUTH_LOADING })
    const provider = new auth.GoogleAuthProvider();
    auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch({ type: constants.LOGIN_SUCCESS, user });
      })
      .catch(function (error) {
        dispatch({ type: constants.LOGIN_ERROR, error });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    dispatch({ type: constants.AUTH_LOADING })
    firebase
      .auth()
      .signOut()
      .then((e) => {
        dispatch({ type: constants.SIGN_OUT_SUCCESS });
      });
  };
};

export const signUp = (newUser) => {
  return async (dispatch, getState) => {
    try {
    dispatch({ type: constants.AUTH_LOADING })
    await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    await firebase.auth().currentUser.updateProfile({
          displayName: newUser.firstname + ' ' + newUser.lastname
    })
    dispatch({ type: constants.LOGIN_SUCCESS, user: firebase.auth().currentUser });
    dispatch({ type: constants.SIGNUP_SUCCESS });

   } catch (error) {
    dispatch({ type: constants.SIGNUP_ERROR, error });
    }
  }
}

export const resetErrors = () => {
  return (dispatch) => {
    dispatch({ type: constants.RESET_ERRORS})
  }
}

