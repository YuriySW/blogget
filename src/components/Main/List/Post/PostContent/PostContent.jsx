import PropTypes from 'prop-types';
import style from './PostContent.module.css';
import {Text} from '../../../../../Ul/Text/Text';

export const PostContent = ({title, author, url, onTitleClick}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onTitleClick();
  };

  return (
    <div className={style.content}>
      <Text As="h2" className={style.title}>
        <Text
          As="a"
          size={18}
          tsize={24}
          className={style.linkPost}
          href={url}
          onClick={handleClick}
        >
          {title}
        </Text>
      </Text>

      <Text
        As="a"
        size={12}
        tsize={14}
        color="orange"
        className={style.linkAuthor}
        href={`https://www.reddit.com/user/${author}`}
      >
        {author}
      </Text>
    </div>
  );
};

PostContent.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};
