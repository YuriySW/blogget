import style from './Tabs.module.css';
import PropTypes from 'prop-types';
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
  {value: 'Главная', Icon: HomeIcon},
  {value: 'Топ', Icon: Top},
  {value: 'Лучшие', Icon: Best},
  {value: 'Горячие', Icon: Hot},
].map(assignId);

export const Tabs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [selectedTab, setSelectedTab] = useState(LIST[0]);

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

  const handleTabSelect = (item) => {
    setSelectedTab(item);
    setIsDropdownOpen(false);
  };

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
            const {value, id, Icon} = item;
            return (
              <li className={style.item} key={id}>
                <button
                  className={style.btn}
                  onClick={() => handleTabSelect(item)}
                >
                  <Text left medium>
                    {value}
                  </Text>
                  <Icon width={30} height={30} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
};
