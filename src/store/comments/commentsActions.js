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

// Async action
export const fetchComments = (postId) => async (dispatch) => {
  if (!postId) return;

  dispatch(commentsRequest());

  try {
    const response = await fetch(
      `https://www.reddit.com/comments/${postId}.json`,
      {
        headers: {
          'User-Agent': 'MyRedditClient/0.1 (educational project)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const [postListing, commentsListing] = await response.json();
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
    throw err;
  }
};
