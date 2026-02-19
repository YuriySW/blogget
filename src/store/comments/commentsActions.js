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

export const fetchComments = (postId) => async (dispatch) => {
  if (!postId) return;

  dispatch(commentsRequest());

  try {
    const {data} = await axios.get(
      `https://www.reddit.com/comments/${postId}.json`
    );

    const [postListing, commentsListing] = data;
    const post = postListing.data.children[0].data;
    const commentsData = commentsListing.data.children
      .filter((child) => child.kind === 't1')
      .map((child) => child.data);

    dispatch(
      commentsRequestSuccess({
        postData: post,
        comments: commentsData,
      })
    );

    return {post, commentsData};
  } catch (err) {
    console.error('Ошибка загрузки комментариев:', err);
    dispatch(commentsRequestError('Не удалось загрузить комментарии'));
  }
};
