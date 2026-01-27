import PropTypes from 'prop-types';
import style from './PostImage.module.css';

export const PostImage = ({src, alt}) => (
  <img className={style.img} src={src} alt={alt} />
);

PostImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
