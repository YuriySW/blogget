import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const LEMMY_INSTANCE = 'https://lemmy.world';

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async ({sort = 'Hot', page = 1, isLoadMore = false}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(
        `${LEMMY_INSTANCE}/api/v3/post/list?sort=${sort}&limit=10&page=${page}`
      );

      const posts = data.posts.map((item) => ({
        id: item.post.id.toString(),
        title: item.post.name,
        author: item.creator.name,
        created_utc: new Date(item.post.published).getTime() / 1000,
        ups: item.counts.upvotes - item.counts.downvotes,
        thumbnail: item.post.thumbnail_url || null,
        url: item.post.url || item.post.ap_id,
        body: item.post.body,
        comments_count: item.counts.comments,
      }));

      return {posts, page, isLoadMore};
    } catch (error) {
      console.error(error);
      return rejectWithValue('Не удалось загрузить посты');
    }
  }
);
