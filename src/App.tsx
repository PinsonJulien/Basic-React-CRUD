import { useEffect, useState } from 'react';
import './App.scss';
import Post from './models/Post';
import User from './models/User';
import PostApiService from './services/api/post-api.service';
import UserApiService from './services/api/user-api.service';
import PostLocalStorageService from './services/local-storage/post-local-storage.service';
import PostFormModal, { PostFormErrors, PostFormFields, PostFormModalProps } from './components/posts/form-modal/post-form-modal.component';
import Button from '@mui/material/Button';
import PostsList from './components/posts/list/posts-list.component';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function App(): JSX.Element {
  // Services
  const postApiService = new PostApiService();
  const userApiService = new UserApiService();
  const postLocalStorageService = new PostLocalStorageService();

  // States
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const [openPostFormModal, setOpenPostFormModal] = useState<boolean>(false);

  const [postForm, setPostForm] = useState<PostFormFields>({
    id: 0,
    title: '',
    body: '',
    user: null,
  });

  const [postFormOptions, setPostFormOptions] = useState<{
    title: string;
    submitButtonName: string;
    method: PostFormModalProps['handleSubmit'];
  }>({
    title: '',
    submitButtonName: '',
    method: () => null,
  });

  useEffect(() => {
    // Fetch posts and users on mount.
    const fetchData = async () => {
      // Try to get the data from the localstorage, if it's empty, call the API.
      let posts = postLocalStorageService.getAll();

      if (!posts.length) {
        posts = await postApiService.getAll();
        postLocalStorageService.add(...posts);
      }

      setPosts(posts);
      
      const users = await userApiService.getAll();
      setUsers(users);
    };

    fetchData();
  }, []);

  const handlePostCreateClick = () => {
    setPostForm({
      id: 0,
      title: '',
      body: '',
      user: null,
    });

    setPostFormOptions({
      title: 'Create a new post',
      submitButtonName: 'Create',
      method: createPost,
    });

    // Open the modal
    setOpenPostFormModal(true);
  };

  // Handlers for update / delete buttons.
  const handlePostEditClick = (updatedPost: Post): void  => {
    // Use the post data to fill the form.
    const { id, title, body, userId } = updatedPost;

    const user = users.find((u: User) => u.id === userId);

    setPostForm({
      id,
      title,
      body,
      user: null
    });

    setPostFormOptions({
      title: 'Post edit',
      submitButtonName: 'Edit',
      method: updatePost,
    });

    // Open the modal
    setOpenPostFormModal(true);
  };

  const handlePostDeleteClick = async (deletedPost: Post): Promise<void> => {
    const { id } = deletedPost;
    // Delete the post using the API.
    await postApiService.deletebyId(id);

    // Remove it from the localStorage and refreshs the posts
    postLocalStorageService.delete(id);
    setPosts(postLocalStorageService.getAll());
  };

  const createPost = async (postFormFields: PostFormFields): Promise<boolean> => {
    // First check if the given Post data is valid.
    if (!isPostValid(postFormFields))
      return false;

    const { title, body, user } = postFormFields;
  
    const post: Partial<Post> = {
      title,
      body,
      userId: (user) ? user.id : null,
    };

    // Attempt to create it using the API.
    const newPost = await postApiService.create(post);

    if (!newPost) 
      return false;

    // On success add it to localstorage and refresh posts using the localstorage.
    postLocalStorageService.add(newPost);
    setPosts(postLocalStorageService.getAll());

    return true;
  }

  const updatePost = async (postFormFields: PostFormFields): Promise<boolean> => {
    // First check if the given Post data is valid.
    if (!isPostValid(postFormFields))
      return false;

    const { id, title, body, user } = postFormFields;
    
    const post: Partial<Post> = {
      id,
      title,
      body,
      userId: (user) ? user.id : null,
    };
    
    const updatedPost = await postApiService.updateById(id, post);

    if (!updatedPost) 
      return false;

    // On success modify the post in the localStorage and refresh posts using the localstorage.
    postLocalStorageService.update(updatedPost);
    setPosts(postLocalStorageService.getAll());

    return true;
  }

  const formValidation = (postFormFields: PostFormFields): PostFormErrors => {
    const { title, body, user } = postFormFields;
    const errors: PostFormErrors = {};

    if (title === '')
      errors.title = "Title must be filled.";

    if (body === '')
      errors.body = "Body must be filled.";

    if (user) {
      const userExists = users.find((u: User) => u.id === user.id);
      if (!userExists)
        errors.user = "The user must exist.";
    }

    return errors;
  }

  const isPostValid = (postFormFields: PostFormFields): boolean => {
    return Object.keys(formValidation(postFormFields)).length === 0;
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          padding: 2,
          justifyContent: 'center'
        }}
      >
        <Button
          variant='contained' 
          onClick={handlePostCreateClick}
        >
          Create a new post
        </Button>
      </Box>

      <PostsList
        posts={posts} 
        users={users} 
        handlePostEditClick={handlePostEditClick}
        handlePostDeleteClick={handlePostDeleteClick}
      />

      <PostFormModal
        title={postFormOptions.title}
        submitButtonName={postFormOptions.submitButtonName}
        open={openPostFormModal}
        setOpen={setOpenPostFormModal}
        users={users}
        postForm={postForm}
        setPostForm={setPostForm}
        handleSubmit={postFormOptions.method}
        validation={formValidation}
      />
    </Container>
  )
}
