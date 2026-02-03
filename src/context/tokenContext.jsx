import React from 'react';
import PropTypes from 'prop-types';
import {useToken} from '../hooks/useToken';

export const tokenContext = React.createContext({});

export const TokenProvider = ({children}) => {
  const [token, delToken] = useToken();

  return (
    <tokenContext.Provider value={{token, delToken}}>
      {children}
    </tokenContext.Provider>
  );
};

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
