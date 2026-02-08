import style from './Comments.module.css';

import PropTypes from 'prop-types';

import {Text} from '../../Ul/Text/Text';
import {PostDate} from '../../components/Main/List/Post/PostDate/PostDate';

export const Comments = ({comments}) => {
  if (!comments || comments.length === 0) {
    return <p>Нет комментариев</p>;
  }

  return (
    <ul className={style.list}>
      {comments.map((comment) => (
        <li key={comment.id} className={style.item}>
          <Text As="h3" className={style.author} size={18} tsize={22}>
            {comment.author}
          </Text>
          <p className={style.comment}>{comment.body}</p>
          <PostDate date={comment.created_utc * 1000} />
        </li>
      ))}
    </ul>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};
