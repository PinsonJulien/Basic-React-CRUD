import './post-details-modal.scss';
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { capitalizeFirst } from '../../../helpers/strings/string.helper';
import Post from '../../../models/Post';
import React, { SetStateAction, useCallback, useMemo } from 'react';
import User from '../../../models/User';
import UserProfileBadge from '../../users/profile-badge/user-profile-badge.component';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

export interface PostDetailsModalProps {
  detailedPost: Post | null;
  setDetailedPost: React.Dispatch<SetStateAction<Post|null>>;
  users: User[];
  handlePostEditClick: (post: Post) => void;
  handlePostDeleteClick: (post: Post) => void;
};

export default function  PostDetailsModal(
  {detailedPost, setDetailedPost, users, handlePostEditClick, handlePostDeleteClick} : PostDetailsModalProps
): JSX.Element
{
  const handleClose = () => {
    setDetailedPost(null);
  };

  const handleEdit = () => {
    // trigger the edit method from parent
    handlePostEditClick(detailedPost!);
  };

  const handleDelete = () => {
    // Hide the modal and trigger the delete method from parent.
    handlePostDeleteClick(detailedPost!);
  };

  const user = useMemo(() => {
    return users.find((u: User) => u.id === detailedPost?.userId) ?? null;
  }, [users, detailedPost]);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth={true}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography
          variant="h5"
          component="span"
        >
          { capitalizeFirst(detailedPost!.title) }
        </Typography>
        
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          flexWrap='wrap'
        >
          <UserProfileBadge 
            user={user}
          />
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifySelf: 'flex-end', alignSelf: 'flex-end'}}
          >
            <Button
              onClick={handleEdit}
            >
              <EditIcon />
            </Button>
            <Button
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Button>
          </Stack>
        </Stack>

      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body1"
          component="p"
        >
          {detailedPost!.body}
        </Typography>
      </DialogContent>
    </Dialog>
  );

}