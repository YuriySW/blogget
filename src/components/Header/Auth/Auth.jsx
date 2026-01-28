import PropTypes from 'prop-types';
import style from './Auth.module.css';
import {ReactComponent as AuthIcon} from './img/login.svg';

export const Auth = ({auth}) => (
  <button className={style.button}>
    {auth ? auth : <AuthIcon className={style.svg} />}
  </button>
);

Auth.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.node]),
};
