// App.js
import {TokenProvider} from './context/tokenContext';
import {AuthContextProvider} from './context/authContext';
import {PostsProvider} from './context/postsContext';
import Header from './components/Header';
import Main from './components/Main';
import {PostModalProvider} from './context/PostModalContext';

function App() {
  return (
    <TokenProvider>
      <AuthContextProvider>
        <PostsProvider>
          <PostModalProvider>
            <Header />
            <Main />
          </PostModalProvider>
        </PostsProvider>
      </AuthContextProvider>
    </TokenProvider>
  );
}

export default App;
