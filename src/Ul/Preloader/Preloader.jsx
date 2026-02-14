import style from './Preloader.module.css';
import {ClipLoader} from 'react-spinners';

export const Preloader = () => (
  <div className={style.wrapper}>
    <ClipLoader color="#cc6633" size={50} />
  </div>
);
