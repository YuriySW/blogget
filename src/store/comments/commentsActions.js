// store/comments/commentsActions.js
import axios from 'axios';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';
export const COMMENTS_CLEAR = 'COMMENTS_CLEAR';

export const commentsRequest = () => ({
  type: COMMENTS_REQUEST,
});

export const commentsRequestSuccess = (data) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  payload: data,
});

export const commentsRequestError = (error) => ({
  type: COMMENTS_REQUEST_ERROR,
  payload: error,
});

export const commentsClear = () => ({
  type: COMMENTS_CLEAR,
});

const LEMMY_INSTANCE = 'https://lemmy.world';

export const fetchComments = (postId) => async (dispatch) => {
  if (!postId) return;

  dispatch(commentsRequest());

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

    dispatch(
      commentsRequestSuccess({
        postData: post,
        comments,
      })
    );

    return {post, comments};
  } catch (err) {
    console.error('Ошибка загрузки комментариев:', err);
    dispatch(commentsRequestError('Не удалось загрузить комментарии'));
  }
};
