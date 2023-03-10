import { useEffect, useState } from 'react';
import './App.scss';
import Post from './models/Post';
import User from './models/User';
import PostApiService from './services/api/post-api.service';
import UserApiService from './services/api/user-api.service';
import PostsList from './components/posts-list/posts-list.component';
import PostForm, { PostFormErrors, PostFormFields } from './components/post-form/post-form.component';

export default function App(): JSX.Element {
  // Services
  const postApiService = new PostApiService();
  const userApiService = new UserApiService();

  // States
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const [postForm, setPostForm] = useState<PostFormFields>({
    id: 0,
    title: '',
    body: '',
    userId: ''
  });

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

  // Handlers for update / delete buttons.
  const handlePostEditClick = (updatedPost: Post): void  => {
    // Use the post data to fill the form.
    const { id, title, body, userId } = updatedPost;

    setPostForm({
      id,
      title,
      body,
      userId: (userId) ? userId.toString() : '',
    });

    // Open the modal

    // TODO
  };

  const handlePostDeleteClick = async (deletedPost: Post): Promise<void> => {
    const { id } = deletedPost;
    // Delete the post using the API.
    await postApiService.deletebyId(id);

    // Remove it from the list.
    const tmpPosts = posts.filter((post: Post) => post.id !== id);
    setPosts(tmpPosts);
  };

  const createPost = async (post: Partial<Post>): Promise<boolean> => {
    // First check if the given Post data is valid.
    if (!isPostValid(post))
      return false;

    // Attempt to create it using the API.
    const newPost = await postApiService.create(post);

    if (!newPost) return false;

    // On success add it to the list of posts.
    const tmpPosts = [...posts];
    tmpPosts.push(newPost);
    setPosts(tmpPosts);

    return true;
  }

  const updatePost = async (): Promise<boolean> => {
    const { id, title, body, userId } = postForm;

    const formUserId = parseInt(userId);
    const post: Partial<Post> = {
      title,
      body,
      userId: (!isNaN(formUserId)) ? formUserId : null,
    };

    // First check if the given Post data is valid.
    if (!isPostValid(post))
      return false;
    
    const updatedPost = await postApiService.updateById(id, post);

    if (!updatedPost) return false;

    // On success modify the post from the list of posts.
    const tmpPosts = [...posts];
    const index = tmpPosts.findIndex((post: Post) => post.id === id);

    tmpPosts[index] = updatedPost;
    setPosts(tmpPosts);

    return true;
  }

  const formValidation = (post: Partial<Post>): PostFormErrors => {
    const errors: PostFormErrors = {};

    const { title, body, userId } = post;

    if (title === '')
      errors.title = "Title must be filled.";
    
    if (body === '')
      errors.body = "Body must be filled.";
    
    if (userId) {
      const userExists = users.find((user) => user.id === userId);
      if (!userExists)
        errors.userId = "The user must exist.";
    }

    return errors;
  }

  const isPostValid = (post: Partial<Post>): boolean => {
    return Object.keys(formValidation(post)).length === 0;
  }

  return (
    <div>
      <h1>Posts</h1>

      <div>
        <h2>Create post</h2>
        <PostForm 
          users={users}
          postForm={postForm}
          setPostForm={setPostForm}
          handleSubmit={createPost} 
          validation={formValidation} 
        />
      </div>

      <PostsList 
        posts={posts} 
        users={users} 
        handlePostEditClick={handlePostEditClick}
        handlePostDeleteClick={handlePostDeleteClick}
      />
    </div>
  )
}
