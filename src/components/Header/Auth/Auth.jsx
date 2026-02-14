import {useState} from 'react';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../Ul/Text/Text';
import {useAuth} from '../../../hooks/useAuth';
import {useGetToken, useSetToken} from '../../../hooks/useToken';
import {AuthLoader} from '../../../Ul/AuthLoader/AuthLoader';

export const Auth = () => {
  const token = useGetToken();
  const {delToken} = useSetToken();
  const {avatar, isLoadingAvatar, logout} = useAuth(token, delToken);
  const [showLogout, setShowLogout] = useState(false);

  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    logout();
    setShowLogout(false);
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
              <AuthLoader />
            ) : (
              <img
                src={avatar}
                alt="Аватар пользователя"
                className={style.avatar}
              />
            )}
          </button>
          {showLogout && (
            <button className={style.logout} onClick={handleLogout}>
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
