import {put, debounce, takeLatest, call, select} from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  setSearchQuery,
  setSort,
  clearPosts,
} from '../posts/postsSlice';

const LEMMY_INSTANCE = 'https://lemmy.world';

function fetchPostsApi({sort, page, searchQuery = ''}) {
  if (searchQuery.trim()) {
    return axios.get(`${LEMMY_INSTANCE}/api/v3/search`, {
      params: {
        q: searchQuery,
        type: 'Posts',
        sort,
        limit: 10,
        page,
      },
    });
  }

  return axios.get(`${LEMMY_INSTANCE}/api/v3/post/list`, {
    params: {
      sort,
      limit: 10,
      page,
    },
  });
}

function* fetchPostsSaga(action) {
  try {
    const {sort, page, searchQuery = '', isLoadMore = false} = action.payload;

    const {data} = yield call(fetchPostsApi, {sort, page, searchQuery});

    const posts = data.posts.map((item) => ({
      id: item.post.id.toString(),
      title: item.post.name,
      author: item.creator?.name || 'anonymous',
      created_utc: new Date(item.post.published).getTime() / 1000,
      ups: item.counts.upvotes - item.counts.downvotes,
      thumbnail: item.post.thumbnail_url || null,
      url: item.post.url || item.post.ap_id,
    }));

    yield put(fetchPostsSuccess({posts, page, isLoadMore}));
  } catch (error) {
    console.error(error);
    yield put(fetchPostsFailure('Не удалось загрузить посты'));
  }
}

function* searchSaga(action) {
  yield put(clearPosts());

  const currentSort = yield select((state) => state.posts.sort);

  yield put(
    fetchPostsRequest({
      sort: currentSort,
      page: 1,
      searchQuery: action.payload,
      isLoadMore: false,
    })
  );
}

function* sortSaga(action) {
  yield put(clearPosts());

  const currentSearch = yield select((state) => state.posts.searchQuery);

  yield put(
    fetchPostsRequest({
      sort: action.payload,
      page: 1,
      searchQuery: currentSearch,
      isLoadMore: false,
    })
  );
}

export function* watchPosts() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
}

export function* watchSearch() {
  yield debounce(600, setSearchQuery.type, searchSaga);
}

export function* watchSort() {
  yield takeLatest(setSort.type, sortSaga);
}
