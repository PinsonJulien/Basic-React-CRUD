import React from 'react';
import Post from '../../models/Post';
import User from '../../models/User';
import './post-form.component.scss';

export interface PostFormFields {
  title: string;
  body: string;
  userId: string;
}

export interface PostFormErrors {
  title?: string;
  body?: string;
  userId?: string; 
};

interface PostFormProps {
  users: User[];
  postForm: PostFormFields;
  setPostForm: React.Dispatch<React.SetStateAction<PostFormFields>>;
  handleSubmit: (post: Partial<Post>) => Promise<boolean>;
  validation: (post: Partial<Post>) => PostFormErrors;
};

export default function PostForm(
  { users, postForm, setPostForm, handleSubmit, validation }: PostFormProps
): JSX.Element
{
  // Methods
  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formUserId = parseInt(postForm.userId);

    const post: Partial<Post> = {
      title: postForm.title,
      body: postForm.body,
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
  }

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    setPostForm({
      ...postForm,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <form onSubmit={formSubmit}>
      <div>
        <input 
          type="text"
          id="title"
          name="title"
          value={postForm.title}
          onChange={handleFieldChange}
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
          value={postForm.body}
          onChange={handleFieldChange}
        />
        <label htmlFor="body">
          Body :
        </label>
      </div>

      <div>
        <select
          id="userId"
          name="userId"
          value={postForm.userId}
          onChange={handleFieldChange}
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