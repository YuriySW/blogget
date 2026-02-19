import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBestPosts} from '../../../store/posts/postsActions';
import {usePostModal} from '../../../context/PostModalContext';
import {Post} from './Post/Post';
import {Modal} from '../../Modal/Modal';
import {Preloader} from '../../../Ul/Preloader/Preloader';
import style from './List.module.css';

export const List = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const {posts, status, error} = useSelector((state) => state.posts);
  const {selectedPostId, openModal, closeModal} = usePostModal();
  const endList = useRef(null);

  useEffect(() => {
    dispatch(fetchBestPosts(token));
  }, [dispatch, token]);

  const handleRetry = () => {
    dispatch(fetchBestPosts(token));
  };

  // Функция для получения изображения поста
  const getPostImage = (post) => {
    // 1. Проверяем preview (лучшее качество)
    if (post.preview?.images?.[0]?.source?.url) {
      return post.preview.images[0].source.url.replace(/&amp;/g, '&');
    }

    // 2. Проверяем thumbnail (если это реальный URL)
    if (
      post.thumbnail &&
      post.thumbnail.startsWith('http') &&
      !['self', 'default', 'nsfw', 'spoiler'].includes(post.thumbnail)
    ) {
      return post.thumbnail;
    }

    // 3. Для постов с изображениями
    if (post.post_hint === 'image' && post.url) {
      return post.url;
    }

    // 4. Нет изображения
    return null;
  };

  if (status === 'loading') {
    return <Preloader />;
  }

  if (status === 'error') {
    return (
      <div className={style.error}>
        <p className={style.errorText}>Ошибка: {error}</p>
        <button className={style.retryBtn} onClick={handleRetry}>
          Попробовать снова
        </button>
      </div>
    );
  }

  if (status === 'success' && posts.length === 0) {
    return <p className={style.empty}>Нет доступных постов</p>;
  }

  return (
    <>
      <ul className={style.list}>
        {posts.map((post) => (
          <Post
            key={post.id}
            postData={{
              id: post.id,
              title: post.title,
              author: post.author,
              ups: post.ups,
              date: post.created_utc * 1000,
              thumbnail: getPostImage(post),
              url: post.url,
            }}
            onTitleClick={() => openModal(post.id)}
          />
        ))}
        <li ref={endList} className={style.end} />
      </ul>
      {selectedPostId && <Modal postId={selectedPostId} onClose={closeModal} />}
    </>
  );
};
