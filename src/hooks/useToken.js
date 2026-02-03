import {useState, useEffect, useRef} from 'react';
import {PROXY_URL} from '../api/const.js';

export const useToken = () => {
  const [token, setToken] = useState(
    () => localStorage.getItem('github_access_token') || '',
  );

  const delToken = () => {
    setToken('');
    localStorage.removeItem('github_access_token');
  };

  const hasAttemptedExchange = useRef(false);

  useEffect(() => {
    if (!window.location.hash.includes('/auth') || token) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    const error = params.get('error');
    if (error) {
      console.error('GitHub auth error:', error);
      return;
    }

    if (hasAttemptedExchange.current) {
      console.warn('Попытка повторного обмена code — пропускаем');
      return;
    }

    hasAttemptedExchange.current = true;

    fetch(PROXY_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code}),
    })
      .then((res) => {
        if (res.status === 401) {
          delToken();
          throw new Error('401 Unauthorized during token exchange');
        }
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.access_token) {
          setToken(data.access_token);
          localStorage.setItem('github_access_token', data.access_token);

          const cleanHash = window.location.hash.split('?')[0];
          window.history.replaceState(
            {},
            '',
            window.location.pathname + cleanHash,
          );
          window.location.hash = '/';
        } else {
          console.error(
            'Не удалось получить токен:',
            data.error_description || data,
          );
        }
      })
      .catch((err) => {
        console.error('Ошибка обмена кода:', err);
      });
  }, [token]);

  return [token, delToken];
};
