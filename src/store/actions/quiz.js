import * as actionTypes from '../types';

import firebase from 'firebase'

import Perguntas from '../../models/Perguntas'

import moment from 'moment'

export const startTimer = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.SET_START,
        start: moment(),
      });

    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchQuestions = () => {
  return async (dispatch, getState) => {
    try {
      const clinica = getState().user.clinica;
      var db = firebase.firestore();
      let loadedQuestions = [];

      await db.collection("clinicas").doc(clinica).collection("perguntas")
        .withConverter(Perguntas.converter)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            loadedQuestions.push(doc.data());
          });
          dispatch({
            type: actionTypes.SET_QUESTIONS,
            questions: loadedQuestions,
          });
        }).catch((error) => {
          dispatch({
            type: actionTypes.SET_QUESTIONS,
            questions: [],
          });
          throw error;
        });

    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const setNota = (form, nota) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;

      var db = firebase.firestore();

      await db.collection("usuarios").doc(userId).collection("respostas")
        .add({
          form,
          nota,
          data: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          dispatch({
            type: actionTypes.SET_NOTA,
            nota: nota
          });
        }).catch((error) => {
          dispatch({
            type: actionTypes.SET_NOTA,
            nota: null
          });
          throw error;
        });

    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};