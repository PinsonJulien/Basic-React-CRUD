import Post from '../../models/Post';
import User from '../../models/User';
import './post-form.component.scss';

interface PostFormProps {
  users: User[];
  createPost: (post: Post) => void;
};

export default function PostForm(
  { users, createPost } : PostFormProps
): JSX.Element
{

  return (
    <form></form>
  );

}