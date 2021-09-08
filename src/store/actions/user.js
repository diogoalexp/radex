import * as actionTypes from '../types';

import firebase from 'firebase'

import Perfil from "../../models/Perfil";

export const fetchPerfil = () => {
  return async (dispatch, getState) => {
    try {
      var db = firebase.firestore();
      const userId = getState().auth.userId;

      var docRef = db.collection("usuarios").doc(userId);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch({
              type: actionTypes.SET_PERFIL,
              perfil: doc.data(),
            });
          } else {
            // doc.data() will be undefined in this case
            dispatch({
              type: actionTypes.SET_PERFIL,
              perfil: {},
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};


export const setPerfil = (nome, idade, cargo, imgField) => {
  return async (dispatch, getState) => {
    try {
      var db = firebase.firestore();
      const userId = getState().auth.userId;
      const date = firebase.firestore.Timestamp.now();
      let imgBucket = `usuarios/${userId}/perfil`;
      let img = imgField.value;

      if (imgField.touched) {
        const ref = firebase.storage().ref();

        ref
          .child(imgBucket)
          .putString(img, "data_url")
          .then((snapshot) => { });
        img = await ref.child(imgBucket).getDownloadURL();
      }

      db.collection("usuarios")
        .doc(userId)
        .set({
          nome,
          idade,
          cargo,
          img
        })
        .then(() => {
          dispatch({
            type: actionTypes.SET_PERFIL,
            perfil: new Perfil(
              userId,
              nome,
              idade,
              cargo,
              img
            ),
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      console.log('err', err)
      // send to custom analytics server
      throw err;
    }
  };
};
