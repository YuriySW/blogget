import {createStore} from 'redux';

const initialState = {
  comment: 'Привет Redux',
  token: localStorage.getItem('github_access_token') || '',
};

// Action types
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const UPDATE_TOKEN = 'UPDATE_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

// Action creators
export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  token,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
});

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {...state, comment: action.comment};

    case UPDATE_TOKEN:
      if (action.token) {
        localStorage.setItem('github_access_token', action.token);
      }
      return {...state, token: action.token};

    case DELETE_TOKEN:
      localStorage.removeItem('github_access_token');
      return {...state, token: ''};

    default:
      return state;
  }
};

export const store = createStore(rootReducer);
