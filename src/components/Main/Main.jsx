import style from './Main.module.css';
import Layout from '../Layout';

export const Main = () => {
  return (
    <main className={style.main}>
      <Layout>Main Content</Layout>
    </main>
  );
};
