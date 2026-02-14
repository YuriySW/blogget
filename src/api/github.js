import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export const setupAuthInterceptor = (delToken) => {
  githubApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        delToken();
      }
      return Promise.reject(error);
    }
  );
};

export const getUserData = (token) =>
  githubApi.get('/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });
