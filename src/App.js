import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import NotFound from './components/NotFound/NotFound';
import {Provider} from 'react-redux';
import {PostModalProvider} from './context/PostModalContext';
import {store} from './store';
import {useToken} from './hooks/useToken';

function AppContent() {
  useToken();

  return (
    <PostModalProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/top" element={<Main />} />
        <Route path="/best" element={<Main />} />
        <Route path="/hot" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
