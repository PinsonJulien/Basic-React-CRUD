import React, { useState } from "react";
import './post-form-modal.component.scss';
import User from "../../../models/User";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface PostFormFields {
  id: number;
  title: string;
  body: string;
  user: User | null;
};

export interface PostFormErrors {
  title?: string;
  body?: string;
  user?: string; 
};

export interface PostFormModalProps {
  title: string;
  submitButtonName: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  users: User[];
  postForm: PostFormFields;
  setPostForm: React.Dispatch<React.SetStateAction<PostFormFields>>;
  handleSubmit: (postFormFields: PostFormFields) => Promise<boolean> | null;
  validation: (postFormFields: PostFormFields) => PostFormErrors;
};

export default function PostFormModal(
  {
    title, 
    submitButtonName, 
    open, 
    users, 
    setOpen, 
    postForm, 
    setPostForm, 
    handleSubmit, 
    validation
  }: PostFormModalProps
): JSX.Element
{
  const [formErrors, setFormErrors] = useState<PostFormErrors>({});

  const handleClose = () => {
    // Close the dialog and clear the errors.
    setOpen(false);
    setFormErrors({});
  };

  const formSubmit = async () => {
    // Check if the form has any error.
    const errors = validation(postForm);
    setFormErrors(errors);

    // If there's errors, manipulate the dom to show the error messages.
    if (!Object.keys(errors).length) {
      // Call the form submission and clear the form.
      await handleSubmit(postForm);
      
      // Close the modal
      setOpen(false);
    }    
  }

  const handleFieldChange = async (name: string, value: any) => {
    setPostForm({
      ...postForm,
      [name]: value
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>
        <TextField
          id="title"
          name="title"
          autoFocus
          margin="normal"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={postForm.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            handleFieldChange(name, value);
          }}
          error={!!formErrors.title}
          helperText={formErrors.title}
        />

        <TextField
          id="body"
          name="body"
          multiline
          rows="8"
          autoFocus
          margin="normal"         
          label="Body"
          type="text"
          fullWidth
          variant="standard"
          value={postForm.body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            handleFieldChange(name, value);
          }}
          error={!!formErrors.body}
          helperText={formErrors.body}
        />

        <Autocomplete
          options={users}
          value={postForm.user}
          getOptionLabel={(user: User) => user.name}
          onChange={(event, value) => {
            handleFieldChange('user', value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id="user"
              name="user"            
              label="Select author"
              variant="outlined"
              margin="normal"
              error={!!formErrors.user}
              helperText={formErrors.user}
            />
          )}
        />
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2
        }}
      >
        <Button 
          variant="contained"
          onClick={formSubmit}
        >
          {submitButtonName}
        </Button>
        <Button onClick={handleClose}>Cancel</Button>      
      </DialogActions>
    </Dialog>
  );
}