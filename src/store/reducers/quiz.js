import { SET_QUESTIONS, SET_START, SET_NOTA } from "../types";

const initialState = {
  start: null,
  questions: null,
  nota: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_START:
      return {
        ...state,
        start: action.start
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      };
    case SET_NOTA:
      return {
        ...state,
        questions: null,
        nota: action.nota
      };
    default:
      return state;
  }
};
