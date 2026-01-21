import style from './Logo.module.css';
// import logo from './img/logo.svg';

// export const Logo = () => {
//   return (
//     <a className={style.link} href="/">
//       <img className={style.logo} src={logo} alt="Blogget Logo" />
//     </a>
//   );
// };
export const Logo = () => {
  return (
    <a className={style.link} href="/">
      <img className={style.logo} src="/img/logo.svg" alt="Blogget Logo" />
    </a>
  );
};
