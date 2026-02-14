const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  after: null,
};

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'success',
        posts: action.payload.posts,
        after: action.payload.after,
        error: null,
      };
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    default:
      return state;
  }
};
