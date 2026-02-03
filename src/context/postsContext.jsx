import {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {useBestPosts} from '../hooks/useBestPosts';

export const postsContext = createContext({});

export const PostsProvider = ({children}) => {
  const value = useBestPosts();

  return (
    <postsContext.Provider value={value}>{children}</postsContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePosts = () => {
  const context = useContext(postsContext);
  if (!context) {
    throw new Error('usePosts должен использоваться внутри PostsProvider');
  }
  return context;
};
