import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const postApiService = useMemo(() => {
    return new PostApiService();
  }, []);
  
  const userApiService = useMemo(() => {
    return new UserApiService();
  }, []); 
  
  const postLocalStorageService = useMemo(() => {
    return new PostLocalStorageService();
  }, []);

  // States
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Map<number, User>>(new Map());
  
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
    // Fetch users and posts on mount.

    const fetchData = async () => {
      const users = await userApiService.getAll();

      const usersMap = new Map<number, User>();
      users.forEach((user: User) => {
        usersMap.set(user.id, user);
      });
  
      setUsers(usersMap);

      // Try to get the data from the localstorage, if it's empty, call the API.
      let posts = postLocalStorageService.getAll();

      if (!posts.length) {
        posts = await postApiService.getAll();
        postLocalStorageService.add(...posts);
      }

      // Insert the User field to all posts.
      posts = posts.map((post: Post) => ({
        ...post,
        user: (post.userId) ? usersMap.get(post.userId) : undefined,
      }));

      setPosts(posts);
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
  const handlePostEditClick = useCallback((updatedPost: Post): void  => {
    // Use the post data to fill the form.
    const { id, title, body, userId } = updatedPost;

    const user = (userId) ? users.get(userId) : null;

    setPostForm({
      id,
      title,
      body,
      user: user ?? null
    });

    setPostFormOptions({
      title: 'Post edit',
      submitButtonName: 'Edit',
      method: updatePost,
    });

    // Open the modal
    setOpenPostFormModal(true);
  }, [users]);

  const handlePostDeleteClick = useCallback( async (deletedPost: Post): Promise<void> => {
    const { id } = deletedPost;
    // Delete the post using the API.
    await postApiService.deletebyId(id);

    // Remove it from the localStorage and refreshs the posts
    postLocalStorageService.delete(id);
    setPosts(postLocalStorageService.getAll());
  }, [postApiService, postLocalStorageService]);

  const formValidation = useCallback((postFormFields: PostFormFields): PostFormErrors => {
    const { title, body, user } = postFormFields;
    const errors: PostFormErrors = {};

    if (title === '')
      errors.title = "Title must be filled.";

    if (body === '')
      errors.body = "Body must be filled.";

    if (user) {
      if (!users.has(user.id))
        errors.user = "The user must exist.";
    }

    return errors;
  }, [users]);

  const isPostValid = useCallback((postFormFields: PostFormFields): boolean => {
    return Object.keys(formValidation(postFormFields)).length === 0;
  }, [formValidation]);

  const createPost = useCallback(async (postFormFields: PostFormFields): Promise<boolean> => {

    // First check if the given Post data is valid.
    if (!isPostValid(postFormFields))
      return false;

    const { title, body, user } = postFormFields;
  
    const post: Partial<Post> = {
      title,
      body,
      userId: (user) ? user.id : undefined,
    };

    // Attempt to create it using the API.
    const newPost = await postApiService.create(post);

    if (!newPost) 
      return false;

    if (newPost.userId)
      newPost.user = users.get(newPost.userId);

    // On success add it to localstorage and refresh posts using the localstorage.
    postLocalStorageService.add(newPost);
    setPosts(postLocalStorageService.getAll());

    return true;
  }, [isPostValid, postLocalStorageService, postApiService]);

  const updatePost = useCallback(async (postFormFields: PostFormFields): Promise<boolean> => {
    // First check if the given Post data is valid.
    if (!isPostValid(postFormFields))
      return false;

    const { id, title, body, user } = postFormFields;
    
    const post: Partial<Post> = {
      id,
      title,
      body,
      userId: (user) ? user.id : undefined,
    };
    
    const updatedPost = await postApiService.updateById(id, post);

    if (!updatedPost) 
      return false;

    if (updatedPost.userId)
      updatedPost.user = users.get(updatedPost.userId);

    // On success modify the post in the localStorage and refresh posts using the localstorage.
    postLocalStorageService.update(updatedPost);
    setPosts(postLocalStorageService.getAll());

    return true;
  }, [postLocalStorageService, postApiService]);

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
