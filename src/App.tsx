import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import Post from './models/Post'
import User from './models/User';
import PostApiService from './services/api/post-api.service';
import UserApiService from './services/api/user-api.service';

export default function App() {
  // Services
  const postApiService = new PostApiService();
  const userApiService = new UserApiService();

  // States
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch posts and users on mount.
    const fetchData = async () => {
      const posts = await postApiService.getAll();
      const users = await userApiService.getAll();

      setPosts(posts);
      setUsers(users);
    };

    fetchData();
  }, []);

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
