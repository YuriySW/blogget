import {all} from 'redux-saga/effects';
import {watchPosts, watchSearch, watchSort} from './searchSaga';

export default function* rootSaga() {
  yield all([watchPosts(), watchSearch(), watchSort()]);
}
