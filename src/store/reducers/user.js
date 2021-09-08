import { SET_PERFIL } from "../types";

const initialState = {
  perfil: null,
  avaliacoes: null,
  scoreTotal: null,
  scoreLast: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PERFIL:
      return {
        ...state,
        perfil: action.perfil
      };
    default:
      return state;
  }
};
