/* eslint-disable max-len */
export const URL = 'https://github.com/login/oauth/access_token';

export const URL_AUTH = 'https://github.com/login/oauth/authorize';

export const CLIENT_ID = 'Ov23liykBlTJzcLC2HNL';

export const RESPONSE_TYPE = 'code'; // для Authorization Code Flow (стандартный и безопасный)

export const RANDOM_STRING = 'random_string_abc123'; // state для защиты от CSRF, можно сгенерировать случайно

export const REDIRECT_URI = 'http://localhost:3000/auth';

export const SCOPE = 'user'; // или 'user:email read:org' — через пробел, если нужно больше

export const TOKEN_URL = 'https://github.com/login/oauth/access_token';
