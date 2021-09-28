import { SET_PERFIL, SET_RESPOSTAS, SET_NOTA, LOGOUT } from "../types";

const initialState = {
  clinica: 'bNB5j36HcXbkEkWysmry',
  perfil: null,
  respostas: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PERFIL:
      return {
        ...state,
        perfil: action.perfil
      };
    case SET_RESPOSTAS:
      return {
        ...state,
        respostas: action.respostas
      };
    case SET_NOTA:
      return {
        ...state,
        respostas: null
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
