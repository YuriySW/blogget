import {useEffect} from 'react';
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

  useEffect(() => {
    dispatch(fetchBestPosts(token));
  }, [dispatch, token]);

  if (status === 'loading') {
    return <Preloader />;
  }

  if (status === 'error') {
    return (
      <div className={style.error}>
        <p className={style.errorText}>Ошибка: {error}</p>
        <button
          className={style.retryBtn}
          onClick={() => dispatch(fetchBestPosts(token))}
        >
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
              thumbnail:
                post.thumbnail && post.thumbnail.startsWith('http')
                  ? post.thumbnail
                  : null,
              url: post.url,
            }}
            onTitleClick={() => openModal(post.id)}
          />
        ))}
      </ul>
      {selectedPostId && <Modal postId={selectedPostId} onClose={closeModal} />}
    </>
  );
};
