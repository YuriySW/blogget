// const initialState = {
//   posts: [],
//   status: 'idle',
//   error: null,
//   after: null,
// };

// export const POSTS_REQUEST = 'POSTS_REQUEST';
// export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
// export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

// export const postsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case POSTS_REQUEST:
//       return {
//         ...state,
//         status: 'loading',
//         error: null,
//       };
//     case POSTS_REQUEST_SUCCESS:
//       return {
//         ...state,
//         status: 'success',
//         posts: action.payload.posts,
//         after: action.payload.after,
//         error: null,
//       };
//     case POSTS_REQUEST_ERROR:
//       return {
//         ...state,
//         status: 'error',
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// postsReducer.js (полный исправленный файл)

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  after: null, // или 1, если используешь page вместо after
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
        // ← КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: добавляем новые посты, а не заменяем
        posts: [...state.posts, ...action.payload.posts],
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
