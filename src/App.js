import {useToken} from './hooks/useToken';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [token, delToken] = useToken();

  return (
    <>
      <Header token={token} delToken={delToken} />
      <Main />
    </>
  );
}

export default App;
