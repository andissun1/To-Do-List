import { useEffect, useState } from 'react';
import { PostItem } from './components/PostItem';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      if (!response.ok) {
        throw new Error('Проблема с загрузкой постов');
      }

      const data = await response.json();

      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const updatePost = async (id, payload) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...payload,
        }),
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Проблема при запросе на редактирование');
      }

      const newPost = await response.json();

      const postIndex = posts.findIndex((post) => post.id === id);
      const copyPost = [...posts];
      copyPost[postIndex] = newPost;

      setPosts(copyPost);
    } catch (error) {
      setError(error);
    }
  };
  const deletePost = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении заметки');
      }

      setPosts((prevState) => prevState.filter((post) => post.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const createPost = async (payload) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании заметки');
      }

      const newTask = await response.json();
      console.log(newTask);

      setPosts([...posts, newTask]);
    } catch (error) {
      setError(error);
    }
  };

  if (isLoading) {
    return <h1>...Loading</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <PostItem
          {...post}
          key={post.id}
          deletePost={deletePost}
          updatePost={updatePost}
          createPost={createPost}
        />
      ))}
    </ul>
  );
}
