import { action, thunk } from 'easy-peasy';
import axios from '../axios-orders';

export default {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
  sessionTimeout: null,
  // actions
  authStart: action(state => {
    state.loading = true;
    state.error = null;
  }),

  authSuccess: action((state, { idToken, userId }) => {
    state.token = idToken;
    state.userId = userId;
    state.error = null;
    state.loading = false;
  }),

  authFail: action((state, payload) => {
    state.error = payload;
    state.loading = false;
  }),

  authLogout: action(state => {
    state.token = null;
    state.userId = null;
    clearTimeout(state.sessionTimeout);
  }),

  setAuthRedirectPath: action((state, path) => {
    state.authRedirectPath = path;
  }),

  setSessionTimeout: action((state, payload) => {
    if (state.sessionTimeout) {
      clearTimeout(state.sessionTimeout);
    }
    state.sessionTimeout = payload;
  }),

  logout: thunk(actions => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    actions.authLogout();
  }),

  checkAuthTimeout: thunk((actions, payload) => {
    const timeout = setTimeout(() => {
      actions.logout();
    }, payload * 1000);
    actions.setSessionTimeout(timeout);
  }),

  authUser: thunk(async (actions, { email, password, isSignup }) => {
    actions.authStart();

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
      actions.authSuccess({ idToken: response.data.idToken, userId: response.data.localId });
      actions.checkAuthTimeout(response.data.expiresIn);
    } catch (err) {
      actions.authFail(err.response.data.error);
    }
  }),

  authCheckState: thunk(actions => {
    const token = localStorage.getItem('token');
    if (!token) {
      actions.logout();
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        actions.authSuccess({ idToken: token, userId });
        actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000);
      } else {
        actions.logout();
      }
    }
  })
};
