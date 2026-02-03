/* eslint-disable max-len */
export const URL = 'https://github.com/login/oauth/access_token';

export const URL_AUTH = 'https://github.com/login/oauth/authorize';

export const CLIENT_ID =
  process.env.NODE_ENV === 'development'
    ? 'Ov23liTcsbK00EfOGNNd' // ← вставь новый Client ID
    : 'Ov23liykBlTJzcLC2HNL'; // ← старый продакшен

export const RESPONSE_TYPE = 'code';

export const RANDOM_STRING = 'random_string_abc123';

export const REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/#/auth'
    : 'https://yuriysw.github.io/blogget/#/auth';

export const PROXY_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://github-oauth-proxy-vercel-dev.vercel.app'
    : 'https://github-oauth-proxy-vercel.vercel.app';

export const SCOPE = 'user';

export const TOKEN_URL = 'https://github.com/login/oauth/access_token';
