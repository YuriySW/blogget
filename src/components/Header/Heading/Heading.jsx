import style from './Heading.module.css';

export const Heading = (props) => {
  return <h1 className={style.heading}>{props.text}Главная</h1>;
};
