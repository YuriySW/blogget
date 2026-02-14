import Header from './components/Header';
import Main from './components/Main';
import {Provider} from 'react-redux';
import {PostModalProvider} from './context/PostModalContext';
import {store} from './store';
import {useToken} from './hooks/useToken';

function AppContent() {
  useToken();

  return (
    <PostModalProvider>
      <Header />
      <Main />
    </PostModalProvider>
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
