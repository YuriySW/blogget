import Header from './components/Header';
import Main from './components/Main';
import {Provider} from 'react-redux';
import {AuthContextProvider} from './context/authContext';
import {PostsProvider} from './context/postsContext';
import {PostModalProvider} from './context/PostModalContext';
import {store} from './store';
import {useToken} from './hooks/useToken';

function AppContent() {
  useToken();

  return (
    <AuthContextProvider>
      <PostsProvider>
        <PostModalProvider>
          <Header />
          <Main />
        </PostModalProvider>
      </PostsProvider>
    </AuthContextProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
