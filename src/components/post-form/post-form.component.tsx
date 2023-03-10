import React, { useState } from 'react';
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
  // States
  const [title, setTitle] = useState<Post['title']>('');
  const [body, setBody] = useState<Post['body']>('');
  const [userId, setUserId] = useState<string>('');

  // Methods
  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formUserId = parseInt(userId);

    const post: Partial<Post> = {
      title,
      body,
      userId: (!isNaN(formUserId)) ? formUserId : null,
    }

    console.log(post);
  }

  return (
    <form onSubmit={formSubmit}>
      <div>
        <input 
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="title">
          Title :
        </label>
      </div>

      <div>
        <input 
          type="text"
          id="body"
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <label htmlFor="body">
          Body :
        </label>
      </div>

      <div>
        <select
          id="user"
          name="user"
          value={userId ?? ''}
          onChange={(event) => setUserId(event.target.value)}
        >
          <option value="">Select a user</option>
          {
            users.map((user: User) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))
          }
        </select>
        <label htmlFor="user">
          User :
        </label>
      </div>
      <button type="submit">Create Post</button>
    </form>
  );

}