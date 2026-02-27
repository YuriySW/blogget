// import {Preloader} from './Ul/Preloader/Preloader';

// const OAuthCallback = () => <Preloader />;

// export default OAuthCallback;

// components/OAuthCallback/OAuthCallback.jsx
import {Layout} from './Layout/Layout';
import {Tabs} from './Main/Tabs/Tabs';
import style from './Main/Main.module.css';

const OAuthCallback = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
    </Layout>
  </main>
);

export default OAuthCallback;
