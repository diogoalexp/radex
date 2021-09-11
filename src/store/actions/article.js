import * as actionTypes from '../types';

import firebase from 'firebase'

import Artigos from '../../models/Artigos'


export const fetchArticles = () => {
  return async (dispatch, getState) => {
    try {
      var db = firebase.firestore();
      let loadedArticles = [];

      await db.collection("artigos")
        .withConverter(Artigos.converter)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            loadedArticles.push(doc.data());
          });
          dispatch({
            type: actionTypes.SET_ARTICLES,
            articles: loadedArticles,
          });
        }).catch((error) => {
          dispatch({
            type: actionTypes.SET_ARTICLES,
            articles: [],
          });
          throw error;
        });
        
    } catch (err) {
  // send to custom analytics server
  throw err;
}
  };
};