// store/tokenReducer.js
const initialState = {
  token: localStorage.getItem('github_access_token') || '',
};

const UPDATE_TOKEN = 'UPDATE_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  token,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
});

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {...state, token: action.token};
    case DELETE_TOKEN:
      return {...state, token: ''};
    default:
      return state;
  }
};
