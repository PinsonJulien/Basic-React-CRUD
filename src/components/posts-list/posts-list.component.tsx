import './posts-list.component.scss';
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

  const PostComponent = ({ post }: { post: Post }): JSX.Element => {
    const user = users.find((user: User) => user.id === post.userId);

    return (
      <div className='flex flex-col'>
        <span>
          {post.title}
        </span>
        { 
          user && 
          <span>
            {user.name}
          </span>
        }

      </div>
    );
  }


  return(
    <ul className='flex flex-col gap-3'>
      {
        posts.map((post: Post) => {
          return (
            <li key={post.id}>
              <PostComponent post={post} />
            </li>
          )
        })
      }
    </ul>
  );
}