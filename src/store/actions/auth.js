import * as actionTypes from "../types";
import * as request from "../../data/request";

import moment from "moment";

let timer;

export const tryAutoLogin = () => {
  return async (dispatch) => {
    let userData = await localStorage.getItem("userData");
    if (userData) {
      const { token, userId, expiryDate, refreshToken } = JSON.parse(userData);

      if (moment(expiryDate) > moment() && token && userId)
        return await dispatch(
          setAuthentication(userId, token, refreshToken, moment(expiryDate))
        );
    }

    const userCredential = await localStorage.getItem("userCredential");
    if (userCredential) {
      const { account, password, verifyEmail } = JSON.parse(userCredential);

      return await dispatch(signInWithPassword(account, password));
    }

    dispatch({ type: actionTypes.SET_DID_TRY_AL });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await request.authenticate("signUp", {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    dispatch(sendEmailVerification(response.idToken));
  };
};

export const signInWithPassword = (
  email,
  password,
  saveUserCredential = false,
  verifyEmail = false
) => {
  return async (dispatch) => {
    try {
      const response = await request.authenticate("signInWithPassword", {
        email: email,
        password: password,
        returnSecureToken: true,
      });

      if (verifyEmail) await checkEmailConfirmation(response.idToken);

      if (saveUserCredential) saveCredentialToStorage(email, password, false);

      dispatch(
        setAuthentication(
          response.localId,
          response.idToken,
          response.refreshToken,
          moment().add(parseInt(response.expiresIn), "seconds")
        )
      );
    } catch (err) {
      throw err;
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    const response = await request.authenticate("sendOobCode", {
      requestType: "PASSWORD_RESET",
      email: email,
    });
  };
};

export const sendEmailVerification = (idToken) => {
  return async (dispatch) => {
    const response = await request.authenticate("sendOobCode", {
      requestType: "VERIFY_EMAIL",
      idToken: idToken,
    });
  };
};

export const checkEmailConfirmation = (idToken) => {
  return async (dispatch, getState) => {
    const erro = getState().config.locale.erro;
    const responseVerifyEmail = await request.authenticate("lookup", {
      idToken: idToken,
    });

    if (!responseVerifyEmail?.users[0]?.emailVerified)
      throw new Error(erro.VERIFY_PASSWORD_RESPONSE);
  };
};

export const refreshToken = () => {
  return async (dispatch, getState) => {
    const refreshTokenId = getState().auth.refreshToken;

    const response = await request
      .authenticate("token", {
        grant_type: "refresh_token",
        refresh_token: refreshTokenId,
      })
      .catch((err) => {
        dispatch(logout(true));
        throw err;
      });

    dispatch(
      setAuthentication(
        response.user_id,
        response.id_token,
        response.refresh_token,
        moment().add(parseInt(response.expires_in), "seconds")
      )
    );
  };
};

export const setAuthentication = (userId, token, refreshToken, expiryDate) => {
  saveDataToStorage(token, userId, expiryDate, refreshToken);

  return (dispatch) => {
    dispatch(setRefreshTimer(expiryDate));
    dispatch({
      type: actionTypes.LOGIN,
      userId: userId,
      token: token,
      refreshToken: refreshToken,
    });
  };
};

export const logout = (expired = false) => {
  if (timer) clearTimeout(timer);

  localStorage.removeItem("userData");
  if (!expired) {
    localStorage.removeItem("userCredential");
    return { type: actionTypes.LOGOUT };
  }
  return { type: actionTypes.EXPIRED };
};

const setRefreshTimer = (expiryDate) => {
  if (timer) clearTimeout(timer);

  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(refreshToken());
    }, moment(expiryDate).diff(moment(), "seconds") * 1000 - 10000);
  };
};

const saveDataToStorage = (token, userId, expiryDate, refreshToken) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expiryDate,
      refreshToken,
    })
  );
};

const saveCredentialToStorage = (account, password, verifyEmail) => {
  localStorage.setItem(
    "userCredential",
    JSON.stringify({
      account: account,
      password: password,
      verifyEmail: verifyEmail,
    })
  );
};
