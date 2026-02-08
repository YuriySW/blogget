import style from './FormComment.module.css';

import {useRef} from 'react';

export const FormComment = () => {
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textareaRef.current.value.trim();
    if (text) {
      console.log('Новый комментарий:', text);
      textareaRef.current.value = '';
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h3>Ваш комментарий</h3>
      <textarea
        ref={textareaRef}
        className={style.textarea}
        placeholder="Напишите комментарий..."
      />
      <button className={style.btn} type="submit">
        Отправить
      </button>
    </form>
  );
};
