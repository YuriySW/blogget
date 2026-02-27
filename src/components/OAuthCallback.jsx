// import {Preloader} from './Ul/Preloader/Preloader';

// const OAuthCallback = () => <Preloader />;

// export default OAuthCallback;

// components/OAuthCallback/OAuthCallback.jsx
import Layout from '../Layout';
import Tabs from '../Main/Tabs';
import style from '../Main/Main.module.css';

const OAuthCallback = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
    </Layout>
  </main>
);

export default OAuthCallback;
