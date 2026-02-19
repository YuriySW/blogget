// import axios from 'axios';

// export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
// export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
// export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';
// export const COMMENTS_CLEAR = 'COMMENTS_CLEAR';

// export const commentsRequest = () => ({
//   type: COMMENTS_REQUEST,
// });

// export const commentsRequestSuccess = (data) => ({
//   type: COMMENTS_REQUEST_SUCCESS,
//   payload: data,
// });

// export const commentsRequestError = (error) => ({
//   type: COMMENTS_REQUEST_ERROR,
//   payload: error,
// });

// export const commentsClear = () => ({
//   type: COMMENTS_CLEAR,
// });

// export const fetchComments = (postId) => async (dispatch) => {
//   if (!postId) return;

//   dispatch(commentsRequest());

//   try {
//     const {data} = await axios.get(
//       `https://www.reddit.com/comments/${postId}.json`
//     );

//     const [postListing, commentsListing] = data;
//     const post = postListing.data.children[0].data;
//     const commentsData = commentsListing.data.children
//       .filter((child) => child.kind === 't1')
//       .map((child) => child.data);

//     dispatch(
//       commentsRequestSuccess({
//         postData: post,
//         comments: commentsData,
//       })
//     );

//     return {post, commentsData};
//   } catch (err) {
//     console.error('Ошибка загрузки комментариев:', err);
//     dispatch(commentsRequestError('Не удалось загрузить комментарии'));
//   }
// };

import axios from 'axios';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';
export const COMMENTS_CLEAR = 'COMMENTS_CLEAR';

export const commentsRequest = () => ({type: COMMENTS_REQUEST});

export const commentsRequestSuccess = (data) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  payload: data,
});

export const commentsRequestError = (error) => ({
  type: COMMENTS_REQUEST_ERROR,
  payload: error,
});

export const commentsClear = () => ({type: COMMENTS_CLEAR});

// Рекурсивная функция для дерева комментариев
const buildCommentTree = (allComments, parentId = null) => {
  return allComments
    .filter((c) => c.comment.parent_id === parentId)
    .map((c) => ({
      id: c.comment.id.toString(),
      author: c.creator?.name || 'Аноним',
      text: c.comment.content || '[удалён]',
      created_utc: Math.floor(new Date(c.comment.published).getTime() / 1000),
      ups: c.counts?.score || 0,
      replies: buildCommentTree(allComments, c.comment.id),
    }));
};

export const fetchComments = (postId) => async (dispatch) => {
  if (!postId) return;

  dispatch(commentsRequest());

  try {
    // Получаем данные поста
    const postRes = await axios.get(
      `https://lemmy.world/api/v3/post?id=${postId}`
    );
    const post = postRes.data.post_view.post;

    const postData = {
      id: post.id.toString(),
      title: post.name,
      author: postRes.data.post_view.creator.name || 'Аноним',
      ups: postRes.data.post_view.counts.score || 0,
      created_utc: Math.floor(new Date(post.published).getTime() / 1000),
      url: post.url || null,
      text: post.body || null,
      thumbnail: post.thumbnail_url || null,
    };

    // Получаем комментарии
    const commentsRes = await axios.get(
      `https://lemmy.world/api/v3/comment/list?post_id=${postId}&limit=50&sort=Hot`
    );

    const commentsTree = buildCommentTree(commentsRes.data.comments);

    dispatch(
      commentsRequestSuccess({
        postData,
        comments: commentsTree,
      })
    );

    return {post: postData, commentsData: commentsTree};
  } catch (err) {
    console.error('Ошибка загрузки комментариев Lemmy:', err);
    dispatch(commentsRequestError('Не удалось загрузить комментарии'));
  }
};
