import { SET_ARTICLES } from "../types";

const initialState = {
  articles: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.articles
      };    
    default:
      return state;
  }
};
