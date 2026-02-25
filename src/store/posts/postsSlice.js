import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  searchQuery: '',
  sort: 'Hot',
  page: 1,
  hasMore: true,
  status: 'idle', // idle / loading / success / error
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload.trim();
      state.page = 1;
      state.posts = [];
      state.hasMore = true;
      state.status = 'loading';
    },

    setSort(state, action) {
      state.sort = action.payload;
      state.page = 1;
      state.posts = [];
      state.hasMore = true;
      state.status = 'loading';
    },

    clearPosts(state) {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
      state.status = 'idle';
      state.error = null;
    },

    fetchPostsRequest(state, action) {
      const {isLoadMore = false} = action.payload || {};
      if (!isLoadMore) {
        state.status = 'loading';
        state.error = null;
      }
    },

    fetchPostsSuccess(state, action) {
      const {posts, page, isLoadMore = false} = action.payload;
      if (isLoadMore) {
        state.posts = [...state.posts, ...posts];
      } else {
        state.posts = posts;
        state.status = 'success';
      }
      state.page = page;
      state.hasMore = posts.length === 10;
      state.error = null;
    },

    fetchPostsFailure(state, action) {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setSort,
  clearPosts,
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
