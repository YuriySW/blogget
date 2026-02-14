import {getUserData} from '../../api/github';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authRequestSuccess = (data) => ({
  type: AUTH_REQUEST_SUCCESS,
  payload: data,
});

export const authRequestError = (error) => ({
  type: AUTH_REQUEST_ERROR,
  payload: error,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const authRequestAsync = (token) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const {data} = await getUserData(token);
    dispatch(authRequestSuccess(data));
    return data;
  } catch (err) {
    console.error('Ошибка загрузки данных пользователя:', err);
    dispatch(authRequestError(err.message));
    throw err;
  }
};
