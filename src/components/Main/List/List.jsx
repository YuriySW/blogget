import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const postsData = [
    {
      thumbnail: '',
      title: 'Title1',
      author: 'Nickname1',
      ups: 77,
      date: '2025-03-17T12:27:00Z',
      id: 'abc123',
    },
    {
      thumbnail: '',
      title: 'Title2',
      author: 'Nickname2',
      ups: 14,
      date: '2026-01-27T11:22:00Z',
      id: 'def456',
    },
    {
      thumbnail: '',
      title: 'Title',
      author: 'Nickname3',
      ups: 124,
      date: '2024-02-21T12:27:00Z',
      id: 'ghi789',
    },
    {
      thumbnail: '',
      title: 'Title4',
      author: 'Nickname4',
      ups: 244,
      date: '2023-06-15T11:11:00Z',
      id: 'jkl012',
    },
  ];
  return (
    <ul className={style.list}>
      {postsData.map((postData) => (
        <Post key={postData.id} postData={postData} />
      ))}
    </ul>
  );
};
