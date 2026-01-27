import PropTypes from 'prop-types';
import style from './PostContent.module.css';

export const PostContent = ({title, author}) => (
  <div className={style.content}>
    <h2 className={style.title}>
      <a className={style.linkPost} href="#post">
        {title}
      </a>
    </h2>
    <a className={style.linkAuthor} href="#author">
      {author}
    </a>
  </div>
);

PostContent.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
