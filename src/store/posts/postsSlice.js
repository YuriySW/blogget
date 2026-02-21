import {createSlice} from '@reduxjs/toolkit';
import {fetchPostsAsync} from './postsThunks';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchPostsAsync.pending, (state, action) => {
        const {isLoadMore} = action.meta.arg;

        if (!isLoadMore) {
          state.status = 'loading';
          state.error = null;
        }
      })

      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        const {posts, page, isLoadMore} = action.payload;

        if (isLoadMore) {
          state.posts = [...state.posts, ...posts];
        } else {
          state.posts = posts;
          state.status = 'success';
        }

        state.page = page;
        state.hasMore = posts.length === 10;
      })

      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
