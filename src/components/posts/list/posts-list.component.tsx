import React, { useEffect, useState } from "react";
import Post from "../../../models/Post";
import User from "../../../models/User";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { capitalizeFirst } from "../../../helpers/strings/string.helper";
import UserProfileBadge from "../../users/profile-badge/user-profile-badge.component";
import PostDetailsModal from "../details-modal/post-details-modal";

export interface PostsListProps {
  posts: Post[];
  users: User[];

  handlePostEditClick: (post: Post) => void;
  handlePostDeleteClick: (post: Post) => void;
}

export default function PostsList(
  { posts, users, handlePostEditClick, handlePostDeleteClick }: PostsListProps
): JSX.Element
{
  // States
  const [detailedPost, setDetailedPost] = useState<Post|null>(null);

  useEffect(() => {
    // Update the detailed post whenever the list of posts changed.
    // This should trigger when a post was edited.
    let post = detailedPost;
    if (post) {
      post = posts.find((p: Post) => p.id === post!.id) ?? null;
      setDetailedPost(post);
    }
  }, [posts]);

  // Functions
  const handleOpen = (post: Post) => {
    setDetailedPost(post);
  };

  const handleClose = () => {
    setDetailedPost(null);
  };

  const handleEdit = (post: Post) => {
    // trigger the edit method from parent
    handlePostEditClick(post);
  };

  const handleDelete = (post: Post) => {
    // Hide the modal and trigger the delete method from parent.
    handlePostDeleteClick(post);
  };

  const getUserFromPost = (post: Post): User | null => {
    const user = users.find((user: User) => user.id === post.userId);
    return user ?? null;
  };

  return (
    <React.Fragment>
      <List>
        {
          posts.map((post: Post, index: number) => {
            const user = getUserFromPost(post);

            return (
              <React.Fragment key={post.id}>
                <ListItem>
                  <ListItemText
                    primary={ capitalizeFirst(post.title) }
                    secondary={
                      <React.Fragment>
                        <UserProfileBadge 
                          user={user}
                        />
                      </React.Fragment>
                    }
                  />
                  <Button 
                    onClick={() => handleOpen(post)}
                  >
                    Read more
                  </Button>
                </ListItem>
                
                {
                  index !== posts.length -1 && (
                    <Divider />
                  )
                }
              </React.Fragment>
            );
          })
        }
      </List>
      
      {
        detailedPost && (
          <PostDetailsModal
            detailedPost={detailedPost}
            setDetailedPost={setDetailedPost}
            users={users}
            handlePostEditClick={handlePostEditClick}
            handlePostDeleteClick={handlePostDeleteClick}
          />
        )
      }

    </React.Fragment>
  );
}