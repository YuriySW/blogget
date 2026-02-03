import style from './List.module.css';
import Post from './Post';
import {usePosts} from '../../../context/postsContext';

export const List = () => {
  const {posts, loading, error} = usePosts();

  if (loading) {
    return <div className={style.center}>Загрузка...</div>;
  }

  if (error) {
    return <div className={style.center}>Ошибка: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className={style.center}>Нет постов</div>;
  }

  return (
    <ul className={style.list}>
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </ul>
  );
};
