import * as actionTypes from '../types';

import firebase from 'firebase'

import Perfil from "../../models/Perfil";
import Respostas from "../../models/Respostas";

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
      let imgBucket = `usuarios/${userId}/perfil`;
      let img = null;

      if (imgField?.touched) {
        img = imgField?.value;
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
          img: img
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
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchRespostas = () => {
  return async (dispatch, getState) => {
    try {
      var db = firebase.firestore();
      const userId = getState().auth.userId;

      let loadedRespostas = [];
      await db.collection("usuarios").doc(userId).collection("respostas")
        .withConverter(Respostas.converter)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            loadedRespostas.push(doc.data());
          });
          dispatch({
            type: actionTypes.SET_RESPOSTAS,
            respostas: loadedRespostas,
          });
        }).catch((error) => {
          dispatch({
            type: actionTypes.SET_RESPOSTAS,
            respostas: [],
          });
          throw error;
        });

    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};