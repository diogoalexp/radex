import * as actionTypes from '../types';

import firebase from 'firebase'

export const tryAutoLogin = () => {
  console.log('tryAutoLogin');
  return async dispatch => {
    try {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const response = user.toJSON();
          if (response.emailVerified)
            dispatch({
              type: actionTypes.LOGIN,
              userId: response.uid,
              token: response.stsTokenManager?.accessToken,
              refreshToken: response.stsTokenManager?.refreshToken,
              displayName: response.displayName,
              photoURL: response.photoURL,
              phoneNumber: response.phoneNumber
            });
        } else {
          dispatch({ type: actionTypes.SET_DID_TRY_AL });
        }
      })

      setTimeout(() => {
        dispatch({ type: actionTypes.SET_DID_TRY_AL });
      }, 5000);

    } catch (error) {
      dispatch({ type: actionTypes.SET_DID_TRY_AL });
      throw error;
    }
  }
};

export const createUserWithEmailAndPassword = (email, password) => {
  console.log('createUserWithEmailAndPassword');
  return async dispatch => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
        })
        .catch((error) => {
          throw error;
        });

      dispatch(sendEmailVerification());
    } catch (error) {
      throw error;
    }
  };
};

export const signInWithEmailAndPassword = (email, password) => {
  return async (dispatch, getState) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
          if (!response || !response.user)
            throw Error("Erro de conexão");

          const user = response.user.toJSON()

          if (!user.emailVerified) {
            dispatch(sendEmailVerification());
            throw Error("Conta não verificada. Uma validação foi enviada para o seu e-mail.");
          }

          // dispatch({
          //   type: actionTypes.LOGIN,
          //   userId: user.uid,
          //   token: user.stsTokenManager?.accessToken,
          //   refreshToken: user.stsTokenManager?.refreshToken,
          //   displayName: user.displayName,
          //   photoURL: user.photoURL,
          //   phoneNumber: user.phoneNumber
          // });
        })
        .catch((error) => {
          throw error;
        });;
    } catch (error) {
      throw error;
    }
  };
};

export const forgotPassword = (email) => {
  console.log('forgotPassword');
  return async dispatch => {
    try {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          // Password reset email sent!
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  };
};

export const sendEmailVerification = (idToken) => {
  console.log('sendEmailVerification');
  return async dispatch => {
    try {
      await firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          // Email verification sent!
        });
    } catch (error) {
      throw error;
    }
    return;
  };
};

export const signOut = () => {
  console.log('signOut');
  return async dispatch => {
    try {
      firebase.auth().signOut().then(() => {
        dispatch({ type: actionTypes.LOGOUT });
      }).catch((error) => {
        throw error;
      });
    } catch (error) {
      dispatch({ type: actionTypes.LOGOUT });
      throw error;
    }
  }
};