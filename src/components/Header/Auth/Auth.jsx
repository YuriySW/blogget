import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../Ul/Text/Text';

export const Auth = ({token, delToken}) => {
  const [showLogout, setShowLogout] = useState(false);
  const [avatar, setAvatar] = useState(null); // null = ещё не загружали
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

  useEffect(() => {
    if (token && avatar === null) {
      // загружаем только один раз после появления token
      setIsLoadingAvatar(true);

      fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })
        .then((res) => {
          if (res.status === 401) {
            delToken();
            return null;
          }
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (data && data.avatar_url) {
            setAvatar(`${data.avatar_url}?s=40`);
          } else {
            setAvatar('https://via.placeholder.com/40?text=?'); // fallback
          }
        })
        .catch((err) => {
          console.error('Ошибка загрузки аватарки:', err);
          setAvatar('https://via.placeholder.com/40?text=Err');
        })
        .finally(() => {
          setIsLoadingAvatar(false);
        });
    }
    // eslint-disable-next-line max-len
  }, [token, delToken, avatar]); // avatar в зависимостях предотвращает повторные запросы

  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className={style.container}>
      {token ? (
        <div className={style.authWrap}>
          <button
            className={style.avatarBtn}
            onClick={handleAvatarClick}
            aria-label="Открыть меню выхода"
            // eslint-disable-next-line max-len
            disabled={isLoadingAvatar} // опционально: отключаем кнопку пока грузится
          >
            {isLoadingAvatar ? (
              <div className={style.loader}>
                {/* Простой CSS-круглый спиннер */}
                <div className={style.spinner}></div>
              </div>
            ) : (
              <img
                src={avatar || 'https://via.placeholder.com/40?text=?'} // fallback пока null
                alt="Аватар пользователя"
                className={style.avatar}
                onError={() =>
                  setAvatar('https://via.placeholder.com/40?text=Err')
                }
              />
            )}
          </button>

          {showLogout && (
            <button
              className={style.logout}
              onClick={() => {
                delToken();
                setShowLogout(false);
                setAvatar(null); // сброс аватарки при логауте
              }}
            >
              Выйти
            </button>
          )}
        </div>
      ) : (
        <Text As="a" href={urlAuth}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
  delToken: PropTypes.func.isRequired,
};
