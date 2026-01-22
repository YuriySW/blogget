// import style from './Heading.module.css';

// export const Heading = (props) => {
//   return <h1 className={style.heading}>{props.text}Главная</h1>;
// };

// import PropTypes from 'prop-types';
// import style from './Heading.module.css';

// const Heading = ({text}) => {
//   return <h1 className={style.heading}>{text}</h1>;
// };

// Heading.propTypes = {
//   text: PropTypes.string.isRequired,
// };

// export default Heading;

import PropTypes from 'prop-types';
import style from './Heading.module.css';

const Heading = ({text}) => {
  return <h1 className={style.heading}>{text}</h1>;
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
