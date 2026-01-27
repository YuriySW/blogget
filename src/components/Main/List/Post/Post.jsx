import PropTypes from 'prop-types';
import style from './Post.module.css';
import notphoto from './img/notphoto.jpg';
import {PostImage} from './PostImage/PostImage';
import {PostContent} from './PostContent/PostContent';
import {DeleteButton} from './DeleteButton/DeleteButton';
import {Rating} from './Rating/Rating';
import {PostDate} from './PostDate/PostDate';

export const Post = ({postData}) => {
  const {title, author, ups, date} = postData;

  return (
    <li className={style.post}>
      <PostImage src={notphoto} alt={title} />

      <PostContent title={title} author={author} />

      <DeleteButton />

      <Rating ups={ups} />

      <PostDate date={date} />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
