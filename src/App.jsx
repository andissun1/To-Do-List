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

  // const updatePost = async () => {
  //   try {
  //   } catch (error) {}
  // };
  const deletePost = async (id) => {
    try {
    } catch (error) {}
  };
  // const createPost = async () => {
  //   try {
  //   } catch (error) {}
  // };

  if (isLoading) {
    return <h1>...Loading</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <PostItem {...post} key={post.id} deletePost={deletePost} />
      ))}
    </ul>
  );
}
