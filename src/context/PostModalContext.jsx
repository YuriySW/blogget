import {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';

const PostModalContext = createContext();

export const PostModalProvider = ({children}) => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const openModal = (postId) => setSelectedPostId(postId);
  const closeModal = () => setSelectedPostId(null);

  return (
    <PostModalContext.Provider value={{selectedPostId, openModal, closeModal}}>
      {children}
    </PostModalContext.Provider>
  );
};

PostModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePostModal = () => {
  const context = useContext(PostModalContext);
  if (!context) {
    throw new Error('usePostModal must be used within PostModalProvider');
  }
  return context;
};
