// import {Routes, Route} from 'react-router-dom';
// import Header from './components/Header';
// import Main from './components/Main';
// import NotFound from './components/NotFound/NotFound';
// import {Provider} from 'react-redux';
// import {PostModalProvider} from './context/PostModalContext';
// import {store} from './store';
// import {useToken} from './hooks/useToken';

// function AppContent() {
//   useToken();

//   return (
//     <PostModalProvider>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Main />} />
//         <Route path="/home" element={<Main />} />
//         <Route path="/top" element={<Main />} />
//         <Route path="/best" element={<Main />} />
//         <Route path="/hot" element={<Main />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </PostModalProvider>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// export default App;

import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import NotFound from './components/NotFound/NotFound';
import {Provider} from 'react-redux';
import {PostModalProvider} from './context/PostModalContext';
import {store} from './store';
import {useToken} from './hooks/useToken';

// App.js
import {useState, useEffect} from 'react';

function AppContent() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Если есть code в URL — ждём пока useToken обработает
    const params = new URLSearchParams(window.location.search);
    if (!params.get('code')) {
      setReady(true);
    }
  }, []);

  const {token} = useToken();

  useEffect(() => {
    // После того как useToken отработал (код исчез из URL или токен появился)
    const params = new URLSearchParams(window.location.search);
    if (!params.get('code')) {
      setReady(true);
    }
  }, [token]);

  if (!ready) return null; // или <Spinner />

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
