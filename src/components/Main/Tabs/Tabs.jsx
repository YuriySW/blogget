// components/Main/Tabs/Tabs.jsx
import {NavLink, useLocation} from 'react-router-dom';
import style from './Tabs.module.css';
import {useState, useEffect} from 'react';
import {assignId} from '../../../utils/generateRandomId';
import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as Top} from './img/top.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as Hot} from './img/hot.svg';
import {ReactComponent as Best} from './img/best.svg';
import {debounceRaf} from '../../../utils/debounce';
import {Text} from '../../../Ul/Text/Text';

const LIST = [
  {value: 'Главная', Icon: HomeIcon, path: '/home'},
  {value: 'Топ', Icon: Top, path: '/top'},
  {value: 'Лучшие', Icon: Best, path: '/best'},
  {value: 'Горячие', Icon: Hot, path: '/hot'},
].map(assignId);

export const Tabs = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);

  const selectedTab =
    LIST.find((item) => item.path === location.pathname) || LIST[0];

  const handleResize = () => {
    if (document.documentElement.clientWidth <= 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {isDropdown && (
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text medium left>
              {selectedTab.value}
            </Text>
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}
      {(isDropdownOpen || !isDropdown) && (
        <ul className={style.list}>
          {LIST.map((item) => {
            const {value, id, Icon, path} = item;
            return (
              <li className={style.item} key={id}>
                <NavLink
                  to={path}
                  className={({isActive}) =>
                    `${style.btn} ${isActive ? style.active : ''}`
                  }
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Text left medium>
                    {value}
                  </Text>
                  <Icon width={30} height={30} />
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
