import { effect } from 'easy-peasy';
import axios from '../axios-orders';

export default {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
  sessionTimeout: null,
  // actions
  authStart: state => {
    state.loading = true;
    state.error = null;
  },

  authSuccess: (state, { idToken, userId }) => {
    state.token = idToken;
    state.userId = userId;
    state.error = null;
    state.loading = false;
  },

  authFail: (state, payload) => {
    state.error = payload;
    state.loading = false;
  },

  authLogout: state => {
    state.token = null;
    state.userId = null;
    clearTimeout(state.sessionTimeout);
  },

  setAuthRedirectPath: (state, path) => {
    state.authRedirectPath = path;
  },

  setSessionTimeout: (state, payload) => {
    if (state.sessionTimeout) {
      clearTimeout(state.sessionTimeout);
    }
    state.sessionTimeout = payload;
  },

  logout: effect(dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    dispatch.auth.authLogout();
  }),

  checkAuthTimeout: effect((dispatch, payload) => {
    const timeout = setTimeout(() => {
      dispatch.auth.logout();
    }, payload * 1000);
    dispatch.auth.setSessionTimeout(timeout);
  }),

  authUser: effect(async (dispatch, { email, password, isSignup }) => {
    dispatch.auth.authStart();

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCqSZr6RibUy5-fBM0YvGo4g-YxvhLo7-4';
    if (!isSignup) {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCqSZr6RibUy5-fBM0YvGo4g-YxvhLo7-4';
    }

    try {
      const response = await axios.post(url, authData);

      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch.auth.authSuccess({ idToken: response.data.idToken, userId: response.data.localId });
      dispatch.auth.checkAuthTimeout(response.data.expiresIn);
    } catch (err) {
      dispatch.auth.authFail(err.response.data.error);
    }
  }),

  authCheckState: effect(dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch.auth.logout();
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch.auth.authSuccess({ idToken: token, userId });
        dispatch.auth.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000);
      } else {
        dispatch.auth.logout();
      }
    }
  })
};
