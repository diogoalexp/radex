import { LOGIN, LOGOUT, SET_DID_TRY_AL, EXPIRED } from "../types";

const initialState = {
  token: null,
  refreshToken: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        refreshToken: action.refreshToken,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case EXPIRED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
