import PropTypes from 'prop-types';
import style from './Rating.module.css';
import {Text} from '../../../../../Ul/Text/Text';

export const Rating = ({ups, onUpvote, onDownvote}) => (
  <div className={style.rating}>
    <button
      className={style.up}
      aria-label="Повысить рейтинг"
      onClick={onUpvote}
    />
    <Text As="p" bold color="grey8f" size={12} tsize={16}>
      {ups}
    </Text>
    <button
      className={style.down}
      aria-label="Понизить рейтинг"
      onClick={onDownvote}
    />
  </div>
);

Rating.propTypes = {
  ups: PropTypes.number.isRequired,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
};

Rating.defaultProps = {
  onUpvote: () => {},
  onDownvote: () => {},
};
