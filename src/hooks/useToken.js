import {useState, useEffect} from 'react';

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
        fetch('https://github-oauth-proxy-vercel.vercel.app', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({code}), // ← только code, остальное на сервере
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
