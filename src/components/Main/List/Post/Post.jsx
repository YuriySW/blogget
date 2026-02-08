import PropTypes from 'prop-types';
import style from './Post.module.css';
import notphoto from './img/notphoto.jpg';
import {PostImage} from './PostImage/PostImage';
import {PostContent} from './PostContent/PostContent';
import {DeleteButton} from './DeleteButton/DeleteButton';
import {Rating} from './Rating/Rating';
import {PostDate} from './PostDate/PostDate';

export const Post = ({postData, onTitleClick}) => {
  const {title, author, ups, date, thumbnail, url} = postData;

  return (
    <li className={style.post}>
      <PostImage src={thumbnail || notphoto} alt={title} />
      <PostContent
        title={title}
        author={author}
        url={url}
        onTitleClick={onTitleClick}
      />
      <DeleteButton />
      <Rating ups={ups} />
      <PostDate date={date} />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};
