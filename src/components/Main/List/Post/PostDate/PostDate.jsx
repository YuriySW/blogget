import PropTypes from 'prop-types';
import style from './PostDate.module.css';
import formatDate from '../../../../../utils/formatDate';

export const PostDate = ({date}) => (
  <time className={style.date} dateTime={date}>
    {formatDate(date)}
  </time>
);

PostDate.propTypes = {
  date: PropTypes.string.isRequired,
};
