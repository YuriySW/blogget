// import {useEffect, useRef} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchBestPosts} from '../../../store/posts/postsActions';
// import {usePostModal} from '../../../context/PostModalContext';
// import {Post} from './Post/Post';
// import {Modal} from '../../Modal/Modal';
// import {Preloader} from '../../../Ul/Preloader/Preloader';
// import style from './List.module.css';

// export const List = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token.token);
//   const {posts, status, error} = useSelector((state) => state.posts);
//   const {selectedPostId, openModal, closeModal} = usePostModal();
//   const endList = useRef(null);

//   useEffect(() => {
//     dispatch(fetchBestPosts(token));
//   }, [dispatch, token]);

//   const handleRetry = () => {
//     dispatch(fetchBestPosts(token));
//   };

//   // Функция для получения изображения поста
//   const getPostImage = (post) => {
//     // 1. Проверяем preview (лучшее качество)
//     if (post.preview?.images?.[0]?.source?.url) {
//       return post.preview.images[0].source.url.replace(/&amp;/g, '&');
//     }

//     // 2. Проверяем thumbnail (если это реальный URL)
//     if (
//       post.thumbnail &&
//       post.thumbnail.startsWith('http') &&
//       !['self', 'default', 'nsfw', 'spoiler'].includes(post.thumbnail)
//     ) {
//       return post.thumbnail;
//     }

//     // 3. Для постов с изображениями
//     if (post.post_hint === 'image' && post.url) {
//       return post.url;
//     }

//     // 4. Нет изображения
//     return null;
//   };

//   if (status === 'loading') {
//     return <Preloader />;
//   }

//   if (status === 'error') {
//     return (
//       <div className={style.error}>
//         <p className={style.errorText}>Ошибка: {error}</p>
//         <button className={style.retryBtn} onClick={handleRetry}>
//           Попробовать снова
//         </button>
//       </div>
//     );
//   }

//   if (status === 'success' && posts.length === 0) {
//     return <p className={style.empty}>Нет доступных постов</p>;
//   }

//   return (
//     <>
//       <ul className={style.list}>
//         {posts.map((post) => (
//           <Post
//             key={post.id}
//             postData={{
//               id: post.id,
//               title: post.title,
//               author: post.author,
//               ups: post.ups,
//               date: post.created_utc * 1000,
//               thumbnail: getPostImage(post),
//               url: post.url,
//             }}
//             onTitleClick={() => openModal(post.id)}
//           />
//         ))}
//         <li ref={endList} className={style.end} />
//       </ul>
//       {selectedPostId && <Modal postId={selectedPostId} onClose={closeModal} />}
//     </>
//   );
// };

import {useEffect, useRef, useCallback} from 'react';
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
  const {posts, status, error, after} = useSelector((state) => state.posts);
  const {selectedPostId, openModal, closeModal} = usePostModal();

  const endList = useRef(null);
  const isFetching = useRef(false);
  const hasMore = useRef(true); // флаг, есть ли ещё посты

  // Функция загрузки с debounce
  const loadMore = useCallback(() => {
    if (status === 'loading' || isFetching.current || !hasMore.current) return;

    isFetching.current = true;

    dispatch(fetchBestPosts(token, after)).then((newPosts) => {
      if (newPosts?.length < 10) {
        hasMore.current = false; // если вернулось меньше лимита — конец
      }
      isFetching.current = false;
    });
  }, [dispatch, token, after, status]);

  // Первичная загрузка
  useEffect(() => {
    if (posts.length === 0 && status !== 'loading') {
      loadMore();
    }
  }, [loadMore, posts.length, status]);

  // Бесконечный скролл
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: '200px 0px', // подгружаем за 200px до конца
        threshold: 0, // срабатывает сразу, как элемент коснулся viewport
      }
    );

    if (endList.current) {
      observer.observe(endList.current);
    }

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [loadMore]);

  const handleRetry = () => {
    hasMore.current = true;
    dispatch(fetchBestPosts(token, after));
  };

  const getPostImage = (post) => {
    let src = post.thumbnail || post.url || null;
    if (src && !src.startsWith('http')) {
      src = `https://lemmy.world${src}`;
    }
    // Временный прокси для обхода CORS/403 на внешних картинках
    if (src) {
      return `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=400&q=85`;
    }
    return null; // или твой notphoto
  };

  // Удаляем дубликаты по id (на всякий случай)
  const uniquePosts = posts.reduce((acc, post) => {
    if (!acc.some((p) => p.id === post.id)) {
      acc.push(post);
    }
    return acc;
  }, []);

  if (status === 'loading' && uniquePosts.length === 0) {
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

  if (uniquePosts.length === 0) {
    return <p className={style.empty}>Нет доступных постов</p>;
  }

  return (
    <>
      <ul className={style.list}>
        {uniquePosts.map((post) => (
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
        {hasMore.current && <li ref={endList} className={style.end} />}
        {status === 'loading' && posts.length > 0 && (
          <li className={style.loaderBottom}>
            <Preloader />
          </li>
        )}
      </ul>

      {selectedPostId && <Modal postId={selectedPostId} onClose={closeModal} />}
    </>
  );
};
