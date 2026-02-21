import {createSlice} from '@reduxjs/toolkit';
import {commentsRequestAsync} from './commentThunks';

const initialState = {
  postData: null,
  comments: [],
  status: 'idle',
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsClear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentsRequestAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(commentsRequestAsync.fulfilled, (state, action) => {
        state.postData = action.payload.post;
        state.comments = action.payload.comments;
        state.status = 'success';
        state.error = null;
      })
      .addCase(commentsRequestAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const {commentsClear} = commentsSlice.actions;
export default commentsSlice.reducer;
