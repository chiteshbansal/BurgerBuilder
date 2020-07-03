import * as actionTypes from "../actions/actionTypes";
import Axios from "axios";

export const AuthStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const AuthSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    idToken: token,
  };
};

export const AuthFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkAuthTimeOut = (expirationTime) => {
  console.log("timeout expiratio time in second ", expirationTime);
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const Auth = (email, password, isSignUp) => {
  return (dispatch) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaPsCOxmwGa8wT4z4Z2b_AXosa2OHYCkQ";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCaPsCOxmwGa8wT4z4Z2b_AXosa2OHYCkQ";
    }
    Axios.post(url, authData)
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(AuthSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch((error) => {
        console.log("error is", error.response);
        dispatch(AuthFail(error.response.data.error));
      });
    // run some async code to check validations
    dispatch(AuthStart());
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    console.log("insde the checkauthstate");
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("auto logout becase no token found");
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      console.log(
        "date stored in local storeage ",
        localStorage.getItem("expirationDate")
      );
      console.log("future expiration date is ", expirationDate);
      if (expirationDate < new Date()) {
        // login again
      } else {
        const userId = localStorage.getItem("userId");
        console.log("auto sign up");
        dispatch(AuthSuccess(token, userId));
        console.log(
          "new calculated time ",
          expirationDate.getTime(),
          " ",
          new Date().getTime()
        );
        dispatch(
          checkAuthTimeOut(
            expirationDate.getTime() / 1000 - new Date().getTime() / 1000
          )
        );
      }
    }
  };
};
