import React from "react";
import Post from "../../models/Post";
import User from "../../models/User";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export interface PostFormFields {
  id: number;
  title: string;
  body: string;
  userId: string;
};

export interface PostFormErrors {
  title?: string;
  body?: string;
  userId?: string; 
};

interface PostFormModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  users: User[];
  postForm: PostFormFields;
  setPostForm: React.Dispatch<React.SetStateAction<PostFormFields>>;
  handleSubmit: (post: Partial<Post>) => Promise<boolean>;
  validation: (post: Partial<Post>) => PostFormErrors;
};

export default function PostFormModal(
  {open, users, setOpen, postForm, setPostForm, handleSubmit, validation}: PostFormModalProps
): JSX.Element
{

  const formTitle = 'Example';
  const submitButtonName = 'CLICK';

  const handleClose = () => {
    setOpen(false);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    setPostForm({
      ...postForm,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {formTitle}
      </DialogTitle>
      <DialogContent>
        <TextField 
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={postForm.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleFieldChange(e);
          }}
        />

        <TextField
          multiline
          autoFocus
          margin="dense"
          id="body"
          label="Body"
          type="text"
          fullWidth
          variant="standard"
          value={postForm.body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleFieldChange(e);
          }}
        />

        <InputLabel id="select-user-id-label">Age</InputLabel>
        <Select
          id="userId"
          labelId="select-user-id-label"
          value={postForm.userId}
          onChange={(id, payload) => {
            console.log(id)
            console.log(payload)
            /*const target = event.currentTarget;

            console.log(target)
            let e: React.ChangeEvent<HTMLInputElement> = event as React.ChangeEvent<HTMLInputElement>;
            console.log(e)
            handleFieldChange(e);*/
          }}
        >
          <MenuItem value="">
            None
          </MenuItem>
          
          {
            users.map((user: User) => (
              <MenuItem
                key={user.id}
                value={user.id}
              >
                { user.name }
              </MenuItem>
            ))
          }

        </Select>

      </DialogContent>

      <DialogActions>
        <Button>{submitButtonName}</Button>
        <Button onClick={handleClose}>Cancel</Button>      
      </DialogActions>
    </Dialog>
  );
}