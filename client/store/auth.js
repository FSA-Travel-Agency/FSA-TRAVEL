import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const _getUser = (user) => ({ type: GET_USER, user });
const _updateUser = (user) => ({ type: UPDATE_USER, user });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (info, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, info);
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(setAuth(data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const updateUser = (id, userInfo) => {
  return async (dispatch) => {
    try {
      console.log('user info', userInfo);
      const { data } = await axios.put(`/api/users/${id}`, userInfo);
      dispatch(setAuth(data[0]));
    } catch (e) {
      console.error('THERE IS AN ERROR', e);
    }
  };
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case GET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
