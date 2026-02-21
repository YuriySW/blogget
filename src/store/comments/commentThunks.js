import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const LEMMY_INSTANCE = 'https://lemmy.world';

export const commentsRequestAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId, {rejectWithValue}) => {
    if (!postId) return rejectWithValue('Нет postId');

    try {
      const {data} = await axios.get(
        `${LEMMY_INSTANCE}/api/v3/post?id=${postId}`
      );

      const {data: commentsData} = await axios.get(
        `${LEMMY_INSTANCE}/api/v3/comment/list?post_id=${postId}&sort=Hot&limit=50`
      );

      const post = {
        id: data.post_view.post.id.toString(),
        title: data.post_view.post.name,
        author: data.post_view.creator.name,
        body: data.post_view.post.body,
        url: data.post_view.post.url,
        thumbnail_url: data.post_view.post.thumbnail_url,
      };

      const comments = commentsData.comments.map((item) => ({
        id: item.comment.id.toString(),
        author: item.creator.name,
        body: item.comment.content,
        created_utc: new Date(item.comment.published).getTime() / 1000,
        ups: item.counts.upvotes - item.counts.downvotes,
      }));

      return {post, comments};
    } catch (error) {
      console.error(error);
      return rejectWithValue('Не удалось загрузить комментарии');
    }
  }
);
