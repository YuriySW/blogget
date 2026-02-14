// import PropTypes from 'prop-types';
// import {useCommentsData} from '../../hooks/useCommentsData';
// import style from './Modal.module.css';
// import {ReactComponent as CloseIcon} from './img/close.svg';
// import {useEffect} from 'react';
// import {Comments} from '../Comments/Comments';
// import {FormComment} from '../FormComment/FormComment';
// import {Swiper, SwiperSlide} from 'swiper/react';
// import {Navigation, Pagination} from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// export const Modal = ({postId, onClose}) => {
//   const {postData, comments, loading, error} = useCommentsData(postId);

//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, [onClose]);

//   // Функция для рендера контента
//   const renderPostContent = () => {
//     if (!postData) return null;

//     // 1. ГАЛЕРЕЯ (несколько изображений)
//     if (postData.is_gallery && postData.gallery_data?.items) {
//       const images = postData.gallery_data.items.map((item) => {
//         const mediaId = item.media_id;
//         const mediaMetadata = postData.media_metadata[mediaId];

//         // Берем самое большое изображение
//         const imageUrl = mediaMetadata.s?.u || mediaMetadata.s?.gif;

//         return {
//           id: mediaId,
//           url: imageUrl?.replace(/&amp;/g, '&'),
//           type: mediaMetadata.e, // "Image" или "AnimatedImage" (GIF)
//         };
//       });

//       return (
//         <Swiper
//           modules={[Navigation, Pagination]}
//           navigation
//           pagination={{clickable: true}}
//           className={style.swiper}
//         >
//           {images.map((image, index) => (
//             <SwiperSlide key={image.id || index}>
//               {image.type === 'AnimatedImage' ? (
//                 <video
//                   src={image.url}
//                   autoPlay
//                   loop
//                   muted
//                   className={style.media}
//                 />
//               ) : (
//                 <img
//                   src={image.url}
//                   alt={`${postData.title} - фото ${index + 1}`}
//                   className={style.media}
//                 />
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       );
//     }

//     // 2. ТЕКСТОВЫЙ ПОСТ
//     if (postData.selftext) {
//       return <p className={style.text}>{postData.selftext}</p>;
//     }

//     // 3. ИЗОБРАЖЕНИЕ (одно)
//     if (postData.post_hint === 'image') {
//       return (
//         <img src={postData.url} alt={postData.title} className={style.media} />
//       );
//     }

//     // 4. GIF / GIFV
//     if (postData.url?.includes('.gif') || postData.url?.includes('.gifv')) {
//       const gifUrl = postData.url.replace('.gifv', '.mp4');

//       if (gifUrl.endsWith('.mp4')) {
//         return (
//           <video
//             src={gifUrl}
//             controls
//             autoPlay
//             loop
//             muted
//             className={style.media}
//           />
//         );
//       }

//       return (
//         <img src={postData.url} alt={postData.title} className={style.media} />
//       );
//     }

//     // 5. ВИДЕО (hosted:video)
//     if (
//       postData.post_hint === 'hosted:video' &&
//       postData.secure_media?.reddit_video
//     ) {
//       return (
//         <video
//           src={postData.secure_media.reddit_video.fallback_url}
//           controls
//           className={style.media}
//         />
//       );
//     }

//     // 6. ВИДЕО (rich:video - YouTube, Vimeo)
//     if (postData.post_hint === 'rich:video' && postData.media?.oembed) {
//       const {html} = postData.media.oembed;
//       return (
//         <div className={style.embed} dangerouslySetInnerHTML={{__html: html}} />
//       );
//     }

//     // 7. Превью (для постов со ссылками)
//     if (postData.preview?.images?.[0]?.source?.url) {
//       const previewUrl = postData.preview.images[0].source.url.replace(
//         /&amp;/g,
//         '&',
//       );
//       return (
//         <img src={previewUrl} alt={postData.title} className={style.media} />
//       );
//     }

//     // 8. Нет контента
//     return <p className={style.noContent}>Нет контента</p>;
//   };

//   return (
//     <div className={style.overlay} onClick={onClose}>
//       <div className={style.modal} onClick={(e) => e.stopPropagation()}>
//         <button className={style.close} onClick={onClose}>
//           <CloseIcon />
//         </button>

//         {loading && <p>Загрузка...</p>}
//         {error && <p>{error}</p>}

//         {postData && !loading && (
//           <>
//             <h2 className={style.title}>{postData.title}</h2>
//             <p className={style.author}>Автор: {postData.author}</p>

//             <div className={style.content}>{renderPostContent()}</div>

//             <Comments comments={comments} />
//             <FormComment />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// Modal.propTypes = {
//   postId: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// components/Modal/Modal.jsx
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchComments,
  commentsClear,
} from '../../store/comments/commentsActions';
import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import {Comments} from '../Comments/Comments';
import {FormComment} from '../FormComment/FormComment';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import {Preloader} from '../../Ul/Preloader/Preloader';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Modal = ({postId, onClose}) => {
  const dispatch = useDispatch();
  const {postData, comments, status, error} = useSelector(
    (state) => state.comments,
  );

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }

    return () => {
      dispatch(commentsClear());
    };
  }, [postId, dispatch]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Функция для рендера контента
  const renderPostContent = () => {
    if (!postData) return null;

    // 1. ГАЛЕРЕЯ (несколько изображений)
    if (postData.is_gallery && postData.gallery_data?.items) {
      const images = postData.gallery_data.items.map((item) => {
        const mediaId = item.media_id;
        const mediaMetadata = postData.media_metadata[mediaId];

        // Берем самое большое изображение
        const imageUrl = mediaMetadata.s?.u || mediaMetadata.s?.gif;

        return {
          id: mediaId,
          url: imageUrl?.replace(/&amp;/g, '&'),
          type: mediaMetadata.e, // "Image" или "AnimatedImage" (GIF)
        };
      });

      return (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{clickable: true}}
          className={style.swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id || index}>
              {image.type === 'AnimatedImage' ? (
                <video
                  src={image.url}
                  autoPlay
                  loop
                  muted
                  className={style.media}
                />
              ) : (
                <img
                  src={image.url}
                  alt={`${postData.title} - фото ${index + 1}`}
                  className={style.media}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    // 2. ТЕКСТОВЫЙ ПОСТ
    if (postData.selftext) {
      return <p className={style.text}>{postData.selftext}</p>;
    }

    // 3. ИЗОБРАЖЕНИЕ (одно)
    if (postData.post_hint === 'image') {
      return (
        <img src={postData.url} alt={postData.title} className={style.media} />
      );
    }

    // 4. GIF / GIFV
    if (postData.url?.includes('.gif') || postData.url?.includes('.gifv')) {
      const gifUrl = postData.url.replace('.gifv', '.mp4');

      if (gifUrl.endsWith('.mp4')) {
        return (
          <video
            src={gifUrl}
            controls
            autoPlay
            loop
            muted
            className={style.media}
          />
        );
      }

      return (
        <img src={postData.url} alt={postData.title} className={style.media} />
      );
    }

    // 5. ВИДЕО (hosted:video)
    if (
      postData.post_hint === 'hosted:video' &&
      postData.secure_media?.reddit_video
    ) {
      return (
        <video
          src={postData.secure_media.reddit_video.fallback_url}
          controls
          className={style.media}
        />
      );
    }

    // 6. ВИДЕО (rich:video - YouTube, Vimeo)
    if (postData.post_hint === 'rich:video' && postData.media?.oembed) {
      const {html} = postData.media.oembed;
      return (
        <div className={style.embed} dangerouslySetInnerHTML={{__html: html}} />
      );
    }

    // 7. Превью (для постов со ссылками)
    if (postData.preview?.images?.[0]?.source?.url) {
      const previewUrl = postData.preview.images[0].source.url.replace(
        /&amp;/g,
        '&',
      );
      return (
        <img src={previewUrl} alt={postData.title} className={style.media} />
      );
    }

    // 8. Нет контента
    return <p className={style.noContent}>Нет контента</p>;
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.close} onClick={onClose}>
          <CloseIcon />
        </button>

        {status === 'loading' && (
          <div className={style.loadingContainer}>
            <Preloader />
          </div>
        )}

        {status === 'error' && (
          <div className={style.errorContainer}>
            <p className={style.errorText}>{error}</p>
            <button
              className={style.retryBtn}
              onClick={() => dispatch(fetchComments(postId))}
            >
              Попробовать снова
            </button>
          </div>
        )}

        {status === 'success' && postData && (
          <>
            <h2 className={style.title}>{postData.title}</h2>
            <p className={style.author}>Автор: {postData.author}</p>

            <div className={style.content}>{renderPostContent()}</div>

            <Comments comments={comments} />
            <FormComment />
          </>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  postId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
