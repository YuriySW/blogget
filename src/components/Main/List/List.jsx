import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const postData = {
    thumbnail: '',
    title: 'Title',
    author: 'Nickname',
    ups: 24,
    date: '2026-01-27T12:27:00Z',
  };
  return (
    <ul className={style.list}>
      <Post postData={postData} />
    </ul>
  );
};
