import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authRequestAsync, authLogout} from '../store/auth/action';
import {setupAuthInterceptor} from '../api/github';

export const useAuth = (token, delToken) => {
  const dispatch = useDispatch();

  const {
    avatar,
    loading: isLoadingAvatar,
    user,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    setupAuthInterceptor(delToken);
  }, [delToken]);

  useEffect(() => {
    if (!token || avatar !== null) return;
    dispatch(authRequestAsync(token));
  }, [token, avatar, dispatch]);

  const logout = () => {
    delToken();
    dispatch(authLogout());
  };

  return {avatar, isLoadingAvatar, user, logout};
};
