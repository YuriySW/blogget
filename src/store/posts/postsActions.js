// import axios from 'axios';

// export const POSTS_REQUEST = 'POSTS_REQUEST';
// export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
// export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

// export const postsRequest = () => ({
//   type: POSTS_REQUEST,
// });

// export const postsRequestSuccess = (data) => ({
//   type: POSTS_REQUEST_SUCCESS,
//   payload: data,
// });

// export const postsRequestError = (error) => ({
//   type: POSTS_REQUEST_ERROR,
//   payload: error,
// });

// export const fetchBestPosts =
//   (token, after = '') =>
//   async (dispatch) => {
//     dispatch(postsRequest());

//     try {
//       const url = `https://www.reddit.com/best.json?limit=10${
//         after ? `&after=${after}` : ''
//       }`;

//       const {data} = await axios.get(url);

//       const posts = data.data.children.map((child) => child.data);

//       dispatch(
//         postsRequestSuccess({
//           posts,
//           after: data.data.after,
//         })
//       );

//       return posts;
//     } catch (err) {
//       console.error('Ошибка загрузки постов:', err);
//       dispatch(postsRequestError('Не удалось загрузить посты'));
//     }
//   };

import axios from 'axios';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

export const postsRequest = () => ({type: POSTS_REQUEST});

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
      const page = after ? Number(after) : 1;
      const url = `https://lemmy.world/api/v3/post/list?sort=Hot&limit=10&page=${page}`;

      const {data} = await axios.get(url);

      // posts приходят в data.posts — массив объектов
      const posts = data.posts.map((p) => ({
        id: p.post.id.toString(),
        title: p.post.name,
        author: p.creator?.name || 'Аноним',
        ups: p.counts?.score || 0, // или p.counts.upvotes - p.counts.downvotes
        created_utc: Math.floor(new Date(p.post.published).getTime() / 1000),
        thumbnail: p.post.thumbnail_url || null,
        url: p.post.url || null,
        text: p.post.body || null,
        permalink: `/post/${p.post.id}`, // относительный путь
        community: p.community?.name || '',
      }));

      dispatch(
        postsRequestSuccess({
          posts,
          after: (page + 1).toString(),
        })
      );

      return posts;
    } catch (err) {
      console.error('Ошибка загрузки постов Lemmy:', err);
      dispatch(postsRequestError('Не удалось загрузить посты'));
    }
  };
