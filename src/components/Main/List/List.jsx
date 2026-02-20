// components/Main/List/List.jsx
import {useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {fetchBestPosts, SORT_MAP} from '../../../store/posts/postsActions';
import {usePostModal} from '../../../context/PostModalContext';
import {Post} from './Post/Post';
import {Modal} from '../../Modal/Modal';
import {Preloader} from '../../../Ul/Preloader/Preloader';
import style from './List.module.css';

export const List = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {posts, status, error, page, hasMore} = useSelector(
    (state) => state.posts
  );
  const {selectedPostId, openModal, closeModal} = usePostModal();
  const observerRef = useRef();
  const isLoadingMore = useRef(false);

  const currentSort = SORT_MAP[location.pathname];

  // НЕ загружаем посты на главной странице
  useEffect(() => {
    if (currentSort) {
      dispatch(fetchBestPosts(currentSort, 1));
    }
  }, [dispatch, currentSort]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore.current && currentSort) {
      isLoadingMore.current = true;
      dispatch(fetchBestPosts(currentSort, page + 1, true)).finally(() => {
        isLoadingMore.current = false;
      });
    }
  }, [dispatch, currentSort, page, hasMore]);

  const lastPostRef = useCallback(
    (node) => {
      if (status === 'loading') return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [status, hasMore, loadMore]
  );

  const handleRetry = () => {
    if (currentSort) {
      dispatch(fetchBestPosts(currentSort, 1));
    }
  };

  // Если мы на главной странице (/home или /), ничего не показываем
  if (!currentSort) {
    return null;
  }

  if (status === 'loading' && posts.length === 0) {
    return <Preloader />;
  }

  if (status === 'error' && posts.length === 0) {
    return (
      <div className={style.error}>
        <p className={style.errorText}>Ошибка: {error}</p>
        <button className={style.retryBtn} onClick={handleRetry}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <>
      <ul className={style.list}>
        {posts.map((post, index) => {
          const isLast = index === posts.length - 1;
          return (
            <Post
              key={post.id}
              ref={isLast ? lastPostRef : null}
              postData={{
                id: post.id,
                title: post.title,
                author: post.author,
                ups: post.ups,
                date: post.created_utc * 1000,
                thumbnail: post.thumbnail,
                url: post.url,
              }}
              onTitleClick={() => openModal(post.id)}
            />
          );
        })}
      </ul>

      {hasMore && (
        <div className={style.loadingMore}>
          <Preloader />
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className={style.endMessage}>Вы достигли конца ленты</p>
      )}

      {selectedPostId && <Modal postId={selectedPostId} onClose={closeModal} />}
    </>
  );
};
