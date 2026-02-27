// components/NotFound/NotFound.jsx
import {Link} from 'react-router-dom';
import style from './NotFound.module.css';

const NotFound = () => (
  <div className={style.container}>
    <h1 className={style.title}>404</h1>
    <p className={style.text}>Страница не найдена</p>
    <Link to="/home" className={style.link}>
      Вернуться на главную
    </Link>
  </div>
);

export default NotFound;
