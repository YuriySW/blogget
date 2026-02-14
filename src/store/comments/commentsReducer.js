const initialState = {
  postData: null,
  comments: [],
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  error: null,
};

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';
export const COMMENTS_CLEAR = 'COMMENTS_CLEAR';

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'success',
        postData: action.payload.postData,
        comments: action.payload.comments,
        error: null,
      };
    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case COMMENTS_CLEAR:
      return initialState;
    default:
      return state;
  }
};
