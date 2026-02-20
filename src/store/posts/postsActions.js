// store/posts/postsActions.js
import axios from 'axios';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const POSTS_LOAD_MORE = 'POSTS_LOAD_MORE';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsRequestSuccess = (data) => ({
  type: POSTS_REQUEST_SUCCESS,
  payload: data,
});

export const postsRequestError = (error) => ({
  type: POSTS_REQUEST_ERROR,
  payload: error,
});

export const postsLoadMore = (data) => ({
  type: POSTS_LOAD_MORE,
  payload: data,
});

const LEMMY_INSTANCE = 'https://lemmy.world';

// Маппинг путей на Lemmy сортировки
const SORT_MAP = {
  '/home': 'Active',
  '/top': 'TopDay',
  '/best': 'Hot',
  '/hot': 'New',
};

export const fetchBestPosts =
  (sort = 'Hot', page = 1, isLoadMore = false) =>
  async (dispatch) => {
    if (!isLoadMore) {
      dispatch(postsRequest());
    }

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

      if (isLoadMore) {
        dispatch(postsLoadMore({posts, page}));
      } else {
        dispatch(postsRequestSuccess({posts, page}));
      }

      return posts;
    } catch (err) {
      console.error('Ошибка загрузки постов:', err);
      dispatch(postsRequestError('Не удалось загрузить посты'));
    }
  };

export {SORT_MAP};
