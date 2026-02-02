import {useState, useEffect} from 'react';
import {CLIENT_ID, TOKEN_URL, REDIRECT_URI} from '../api/const';

const CLIENT_SECRET = '1985b8735992b446f3dea15e5ba8e10bc61ff90a';

export const useToken = () => {
  const [token, setToken] = useState(
    () => localStorage.getItem('github_access_token') || '',
  );

  const delToken = () => {
    setToken('');
    localStorage.removeItem('github_access_token');
  };

  useEffect(() => {
    if (window.location.pathname.includes('/auth') && !token) {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const error = params.get('error');

      if (error) {
        console.error('GitHub auth error:', error);
        return;
      }

      if (code) {
        fetch(`https://cors-anywhere.herokuapp.com/${TOKEN_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line quote-props
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
          }),
        })
          .then((res) => {
            // eslint-disable-next-line max-len
            // Важно! Проверяем статус 401 здесь тоже (хотя для обмена кода редко, но на всякий)
            if (res.status === 401) {
              delToken();
              throw new Error('401 Unauthorized during token exchange');
            }
            return res.json();
          })
          .then((data) => {
            if (data.access_token) {
              setToken(data.access_token);
              localStorage.setItem('github_access_token', data.access_token);
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname,
              );
            } else {
              console.error(
                'Не удалось получить токен:',
                data.error_description || data,
              );
            }
          })
          .catch((err) => console.error('Ошибка обмена кода:', err));
      }
    }
  }, [token]);

  return [token, delToken]; // ← возвращаем delToken вместо setToken
};
