import {usePosts} from '../../../context/postsContext';
import {usePostModal} from '../../../context/PostModalContext';
import {Post} from './Post/Post';
import {Modal} from '../../Modal/Modal';
import style from './List.module.css';

export const List = () => {
  const {posts, loading, error} = usePosts();
  const {selectedPostId, openModal, closeModal} = usePostModal();

  if (loading) return <div className={style.center}>Загрузка...</div>;
  if (error) return <div className={style.center}>Ошибка: {error}</div>;

  return (
    <>
      <ul className={style.list}>
        {posts.map((post) => (
          <Post
            key={post.id}
            postData={post}
            onTitleClick={() => openModal(post.id)}
          />
        ))}
      </ul>

      {selectedPostId && <Modal postId={selectedPostId} onClose={closeModal} />}
    </>
  );
};
