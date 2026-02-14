import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateToken, deleteToken} from '../store/tokenReducer';
import {PROXY_URL} from '../api/const.js';

export const useGetToken = () => {
  const token = useSelector((state) => state.token.token);
  return token;
};

export const useSetToken = () => {
  const dispatch = useDispatch();

  const setToken = (token) => {
    dispatch(updateToken(token));
  };

  const delToken = () => {
    dispatch(deleteToken());
  };

  return {setToken, delToken};
};

export const useToken = () => {
  const token = useGetToken();
  const {setToken, delToken} = useSetToken();
  const hasAttemptedExchange = useRef(false);

  useEffect(() => {
    const handleTokenExchange = async () => {
      const isAuthRoute = window.location.hash.includes('/auth');
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const error = params.get('error');

      if (!isAuthRoute || !code) return;

      // Если была ошибка от GitHub
      if (error) {
        console.error('GitHub auth error:', error);
        return;
      }

      // Предотвращаем повторный обмен
      if (hasAttemptedExchange.current) {
        console.warn('Попытка повторного обмена code — пропускаем');
        return;
      }

      hasAttemptedExchange.current = true;
      console.log('Начинаем обмен кода на токен...');

      try {
        const res = await fetch(PROXY_URL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({code}),
        });

        if (res.status === 401) {
          delToken();
          throw new Error('401 Unauthorized during token exchange');
        }

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();

        if (data.access_token) {
          console.log('Токен успешно получен!');
          setToken(data.access_token);

          // Очищаем URL от параметров
          const cleanHash = window.location.hash.split('?')[0];
          window.history.replaceState(
            {},
            '',
            window.location.pathname + cleanHash
          );
          window.location.hash = '/';
        } else {
          console.error(
            'Не удалось получить токен:',
            data.error_description || data
          );
        }
      } catch (err) {
        console.error('Ошибка обмена кода:', err);
      }
    };

    handleTokenExchange();
  }, []);

  return {token, delToken};
};
