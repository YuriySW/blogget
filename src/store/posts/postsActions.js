export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

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

export const fetchBestPosts =
  (token, after = '') =>
  async (dispatch) => {
    dispatch(postsRequest());

    try {
      const url = `https://www.reddit.com/best.json?limit=10${after ? `&after=${after}` : ''}`;

      const headers = {
        'User-Agent': 'MyRedditClient/0.1 (educational project)',
      };

      const response = await fetch(url, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const posts = data.data.children.map((child) => child.data);

      dispatch(
        postsRequestSuccess({
          posts,
          after: data.data.after,
        })
      );

      return posts;
    } catch (err) {
      console.error('Ошибка загрузки постов:', err);
      dispatch(postsRequestError('Не удалось загрузить посты'));
      throw err;
    }
  };
