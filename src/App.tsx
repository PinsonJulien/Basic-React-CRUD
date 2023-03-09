import { useEffect, useState } from 'react';
import './App.scss';
import Post from './models/Post';
import User from './models/User';
import PostApiService from './services/api/post-api.service';
import UserApiService from './services/api/user-api.service';
import PostsList from './components/posts-list/posts-list.component';

export default function App(): JSX.Element {
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

  return (
    <div>
      <h1>Posts</h1>
      <PostsList posts={posts} users={users} />
    </div>
  )
}
