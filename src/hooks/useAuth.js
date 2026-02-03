import {useState, useEffect} from 'react';

export const useAuth = (token, delToken) => {
  const [avatar, setAvatar] = useState(null);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

  useEffect(() => {
    if (!token || avatar !== null) return;

    setIsLoadingAvatar(true);

    fetch('https://api.github.com/user', {
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
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.avatar_url) {
          setAvatar(`${data.avatar_url}?s=40`);
        }
      })
      .catch((err) => {
        console.error('Ошибка загрузки аватарки:', err);
      })
      .finally(() => {
        setIsLoadingAvatar(false);
      });
  }, [token, delToken]);

  return {avatar, isLoadingAvatar, setAvatar};
};
