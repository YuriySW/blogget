import {useState, useEffect} from 'react';

export const useBestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchBest = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://www.reddit.com/best.json?limit=10',
          {
            headers: {
              'User-Agent': 'MyRedditClient/0.1 (educational project)',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (ignore) return;

        const formatted = data.data.children.map((child) => {
          const p = child.data;
          return {
            id: p.id,
            title: p.title,
            author: p.author,
            ups: p.ups || 0,
            date: p.created_utc * 1000,
            thumbnail:
              p.thumbnail && p.thumbnail.startsWith('http')
                ? p.thumbnail
                : null,
            url: `https://reddit.com${p.permalink}`,
          };
        });

        setPosts(formatted);
      } catch (err) {
        if (!ignore) {
          console.error('useBestPosts → ошибка:', err);
          setError('Не удалось загрузить посты');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchBest();

    return () => {
      ignore = true;
    };
  }, []);

  return {posts, loading, error};
};
