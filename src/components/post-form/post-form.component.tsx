import React, { useState } from 'react';
import Post from '../../models/Post';
import User from '../../models/User';
import './post-form.component.scss';

export interface PostFormErrors {
  title?: string;
  body?: string;
  userId?: string;
};

interface PostFormProps {
  users: User[];
  handleSubmit: (post: Partial<Post>) => Promise<boolean>;
  validation: (post: Partial<Post>) => PostFormErrors;
};

export default function PostForm(
  { users, handleSubmit, validation }: PostFormProps
): JSX.Element
{
  // States
  const [title, setTitle] = useState<Post['title']>('');
  const [body, setBody] = useState<Post['body']>('');
  const [userId, setUserId] = useState<string>('');

  // Methods
  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formUserId = parseInt(userId);

    const post: Partial<Post> = {
      title,
      body,
      userId: (!isNaN(formUserId)) ? formUserId : null,
    }

    // Check if the form has any error.
    const formErrors = validation(post);

    // If there's errors, manipulate the dom to show the error messages.
    if (Object.keys(formErrors).length) {
      // Manipulate the DOM
      console.error(formErrors);
      return;
    }

    // Call the form submission and clear the form.
    await handleSubmit(post);
    resetForm();
  }

  const resetForm = () => {
    setTitle('');
    setBody('');
    setUserId('');
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