import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_ERROR,
  AUTH_LOGOUT,
} from './action';

const initialState = {
  user: null,
  avatar: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        avatar: action.payload?.avatar_url
          ? `${action.payload.avatar_url}?s=40`
          : null,
        error: null,
      };
    case AUTH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
