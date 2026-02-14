import style from './FormComment.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '../../Ul/Text/Text';
import {updateComment} from '../../store/commentReducer';

export const FormComment = () => {
  const value = useSelector((state) => state.comment.comment);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Новый комментарий:', value);
  };

  const handleChange = (e) => {
    dispatch(updateComment(e.target.value));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Text As="h3" size={14} tsize={18}>
        Ваш комментарий
      </Text>
      <textarea
        className={style.textarea}
        placeholder="Напишите комментарий..."
        value={value}
        onChange={handleChange}
      />
      <button className={style.btn} type="submit">
        Отправить
      </button>
    </form>
  );
};
