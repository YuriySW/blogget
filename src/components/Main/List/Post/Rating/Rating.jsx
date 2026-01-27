import PropTypes from 'prop-types';
import style from './Rating.module.css';

export const Rating = ({ups, onUpvote, onDownvote}) => (
  <div className={style.rating}>
    <button
      className={style.up}
      aria-label="Повысить рейтинг"
      onClick={onUpvote}
    />
    <p className={style.ups}>{ups}</p>
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
