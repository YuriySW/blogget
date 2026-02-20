// store/posts/postsReducer.js
const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  error: null,
  page: 1,
  hasMore: true,
};

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const POSTS_LOAD_MORE = 'POSTS_LOAD_MORE';

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
        page: action.payload.page,
        hasMore: action.payload.posts.length === 10,
        error: null,
      };
    case POSTS_LOAD_MORE:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        page: action.payload.page,
        hasMore: action.payload.posts.length === 10,
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
