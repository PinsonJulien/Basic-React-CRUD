import Post from "../../models/Post";
import User from "../../models/User";

interface PostsListProps {
  posts: Post[];
  users: User[];
};

export default function PostsList(
  {posts, users}: PostsListProps
): JSX.Element 
{
  return(
    <h1>
      Mounted
    </h1>
  );
}