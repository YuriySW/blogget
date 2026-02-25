// store/index.js
import {configureStore} from '@reduxjs/toolkit';
import {tokenReducer} from './tokenReducer';
import {commentReducer} from './commentReducer';
import {authReducer} from './auth/authReducer';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentSlice';
import localStorageMiddleware from './middleware/localStorageMiddleware';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './search/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: commentReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
