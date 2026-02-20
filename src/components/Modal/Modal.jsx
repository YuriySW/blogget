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
import {Preloader} from '../../Ul/Preloader/Preloader';

export const Modal = ({postId, onClose}) => {
  const dispatch = useDispatch();
  const {postData, comments, status, error} = useSelector(
    (state) => state.comments
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

  const renderPostContent = () => {
    if (!postData) return null;

    // Картинка, если есть thumbnail или url — картинка
    if (
      postData.thumbnail ||
      (postData.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(postData.url))
    ) {
      const imgSrc = postData.thumbnail || postData.url;
      return <img src={imgSrc} alt={postData.title} className={style.media} />;
    }

    // Текст поста
    if (postData.text) {
      return <div dangerouslySetInnerHTML={{__html: postData.text}} />;
    }

    // Ссылка
    if (postData.url) {
      return (
        <p>
          <a href={postData.url} target="_blank" rel="noopener noreferrer">
            Открыть: {postData.url}
          </a>
        </p>
      );
    }

    return <p className={style.noContent}>Нет дополнительного контента</p>;
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
            <p className={style.author}>
              Автор: {postData.author} ·{' '}
              {new Date(postData.created_utc * 1000).toLocaleString()}
            </p>
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
