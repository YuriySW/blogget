// App.js
import {TokenProvider} from './context/tokenContext';
import {AuthContextProvider} from './context/authContext';
import {PostsProvider} from './context/postsContext';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <TokenProvider>
      <AuthContextProvider>
        <PostsProvider>
          <Header />
          <Main />
        </PostsProvider>
      </AuthContextProvider>
    </TokenProvider>
  );
}

export default App;
