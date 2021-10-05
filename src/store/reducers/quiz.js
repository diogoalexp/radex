import { SET_QUESTIONS, SET_START, SET_NOTA, LOGOUT } from "../types";

const initialState = {
  start: null,
  questions: null,
  nota: null
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_START:
      return {
        ...state,
        start: action.start
      };
    case SET_QUESTIONS:
      const filterQuestions  = action.questions.filter(x =>  {
        return x.alternativas && x.alternativas.some(a => a == x.resposta)
      })

      let selectedQuestions = filterQuestions;
      selectedQuestions.forEach(element => {
        element.random = getRandomInt(1, 100000)
      });
      selectedQuestions = selectedQuestions.sort(function (a, b) {
        return a.random - b.random;
      });
      selectedQuestions = selectedQuestions.slice(0, 10);

      return {
        ...state,
        questions: selectedQuestions
      };
    case SET_NOTA:
      return {
        ...state,
        questions: null,
        nota: action.nota
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
