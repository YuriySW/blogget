import {useState, useEffect} from 'react';

export const useCommentsData = (postId) => {
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.reddit.com/comments/${postId}.json`,
          {
            headers: {
              'User-Agent': 'MyRedditClient/0.1 (educational project)',
            },
          },
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const [postListing, commentsListing] = await response.json();

        const post = postListing.data.children[0].data;

        const commentsData = commentsListing.data.children
          .filter((child) => child.kind === 't1')
          .map((child) => child.data);

        setPostData(post);
        setComments(commentsData);
      } catch (err) {
        console.error('useCommentsData error:', err);
        setError('Не удалось загрузить комментарии');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return {postData, comments, loading, error};
};
