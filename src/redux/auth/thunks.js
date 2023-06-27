import {
  loginError,
  loginPending,
  loginSuccess,
  logoutError,
  logoutPending,
  logoutSuccess,
  getAuthenticationPending,
  getAuthenticationSuccess,
  getAuthenticationError
} from 'redux/auth/actions';

import { firebaseApp } from '../../helper/firebase';

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    try {
      await firebaseApp.auth().signOut();
      dispatch(logoutSuccess());
      sessionStorage.removeItem('token', '');
      sessionStorage.removeItem('role', '');
      return { error: false, message: 'Log Out Successfully' };
    } catch (error) {
      console.log(error);
      dispatch(logoutError(error));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthenticationPending());
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, { headers: { token } });
      const res = (await response).json();
      dispatch(getAuthenticationSuccess(res.data));
      return res.data;
    } catch (error) {
      return dispatch(getAuthenticationError(error.toString()));
    }
  };
};

export const login = (credentials) => {
  console.log(credentials);
  return async (dispatch) => {
    dispatch(loginPending);
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      console.log(firebaseResponse);
      const token = await firebaseResponse.user.getIdToken();
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      console.log = token;
      return dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};
