import {useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {setSort, fetchPostsRequest} from '../../../store/posts/postsSlice';
import {SORT_MAP} from '../../../store/posts/sortMap';
import {usePostModal} from '../../../context/PostModalContext';
import {Post} from './Post/Post';
import {Modal} from '../../Modal/Modal';
import {Preloader} from '../../../Ul/Preloader/Preloader';
import style from './List.module.css';

export const List = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {selectedPostId, openModal, closeModal} = usePostModal();

  const {posts, status, error, page, hasMore, searchQuery} = useSelector(
    (state) => state.posts
  );

  const currentSort = SORT_MAP[location.pathname] || 'Hot';

  const observerRef = useRef(null);
  const isLoadingMore = useRef(false);

  // Смена категории / сортировки
  useEffect(() => {
    if (currentSort) {
      dispatch(setSort(currentSort));
    }
  }, [dispatch, currentSort]);

  const loadMore = useCallback(() => {
    if (!hasMore) {
      console.log('hasMore = false → выходим');
      return;
    }

    if (isLoadingMore.current) {
      console.log('уже загружается → выходим');
      return;
    }

    isLoadingMore.current = true;

    dispatch(
      fetchPostsRequest({
        sort: currentSort,
        page: page + 1,
        searchQuery,
        isLoadMore: true,
      })
    );

    // Сбрасываем флаг через небольшую задержку
    // Это предотвращает множественные вызовы, но позволяет продолжить подгрузку
    setTimeout(() => {
      isLoadingMore.current = false;
    }, 400); // 400 мс — хороший баланс (можно 300–600)
  }, [dispatch, currentSort, page, hasMore, searchQuery]);

  const lastPostRef = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        {
          root: null,
          rootMargin: '300px 0px', // подгружаем заранее, когда до конца осталось 300px
          threshold: 0.01,
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loadMore]
  );

  const handleRetry = () => {
    dispatch(
      fetchPostsRequest({
        sort: currentSort,
        page: 1,
        searchQuery,
        isLoadMore: false,
      })
    );
  };

  if (!currentSort) return null;

  if (status === 'loading' && posts.length === 0) {
    return <Preloader />;
  }

  if (status === 'error' && posts.length === 0) {
    return (
      <div className={style.error}>
        <p>Ошибка: {error}</p>
        <button onClick={handleRetry}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <>
      {searchQuery && (
        <div className={style.searchResultsInfo}>
          Результаты поиска по запросу: <strong>{searchQuery}</strong>
        </div>
      )}
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
          {status === 'loading' ? <Preloader /> : null}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className={style.endMessage}>Вы достигли конца ленты</p>
      )}

      {selectedPostId && <Modal postId={selectedPostId} onClose={closeModal} />}
    </>
  );
};
