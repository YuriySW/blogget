// import {useLocation} from 'react-router-dom';
// import style from './Main.module.css';
// import Layout from '../Layout';
// import Tabs from './Tabs';
// import List from './List';

// export const Main = () => {
//   const location = useLocation();
//   const isHomePage = location.pathname === '/' || location.pathname === '/home';

//   return (
//     <main className={style.main}>
//       <Layout>
//         <Tabs />
//         {isHomePage ? (
//           <div className={style.welcome}>
//             <h1 className={style.title}>Стартовая страница</h1>
//             <p className={style.subtitle}>Добро пожаловать!</p>
//             <p className={style.text}>Выберите категорию</p>
//           </div>
//         ) : (
//           <List />
//         )}
//       </Layout>
//     </main>
//   );
// };
import {useLocation} from 'react-router-dom';
import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import {useToken} from '../../hooks/useToken';

export const Main = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const {token, loading} = useToken(); // получаем токен

  return (
    <main className={style.main}>
      <Layout>
        <Tabs />
        {isHomePage ? (
          <div className={style.welcome}>
            <h1 className={style.title}>Стартовая страница</h1>
            <p className={style.subtitle}>Добро пожаловать!</p>
            <p className={style.text}>Выберите категорию</p>
            {/* Показываем List только если токен получен */}
            {token && <List />}
            {loading && <p>Загрузка постов...</p>}
          </div>
        ) : (
          <List />
        )}
      </Layout>
    </main>
  );
};
