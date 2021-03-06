import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants';

// Parent login using email/password
export const login = (email, password) => async (dispatch) => {
  console.log('login action attempt', email, password);
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      {
        email,
        password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log('login action fail');
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Clear redux state and redirect to login page
export const logout = () => async (dispatch) => {
  console.log('logout');
  const { data } = await axios.get('/api/users/logout');
  console.log(data);
  dispatch({ type: USER_LOGOUT });
  document.location.href = '/login';
};

// Called on page load, check if token exists and return the user if token is valid
export const checkSession = () => async (dispatch) => {
  console.log('check session');
  try {
    const { data } = await axios.get('/api/users/current-session', {
      crossdomain: true,
    });
    console.log('check data', data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log('login action fail');
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
