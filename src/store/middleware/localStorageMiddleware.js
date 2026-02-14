const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    case 'UPDATE_TOKEN':
      if (action.token) {
        localStorage.setItem('github_access_token', action.token);
      }
      break;
    case 'DELETE_TOKEN':
      localStorage.removeItem('github_access_token');
      break;
    default:
      break;
  }

  return result;
};

export default localStorageMiddleware;
