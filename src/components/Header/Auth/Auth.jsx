import {useState, useContext} from 'react';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../Ul/Text/Text';
import {useAuth} from '../../../hooks/useAuth';
import {tokenContext} from '../../../context/tokenContext';

export const Auth = () => {
  const {token, delToken} = useContext(tokenContext);
  const {avatar, isLoadingAvatar, setAvatar} = useAuth(token, delToken);

  const [showLogout, setShowLogout] = useState(false);

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
            disabled={isLoadingAvatar}
          >
            {isLoadingAvatar || !avatar ? (
              <div className={style.loader}>
                <div className={style.spinner}></div>
              </div>
            ) : (
              <img
                src={avatar}
                alt="Аватар пользователя"
                className={style.avatar}
                onError={() => setAvatar(null)}
              />
            )}
          </button>

          {showLogout && (
            <button
              className={style.logout}
              onClick={() => {
                delToken();
                setShowLogout(false);
                setAvatar(null);
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
