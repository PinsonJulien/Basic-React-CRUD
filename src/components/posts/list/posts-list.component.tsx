import React, { useEffect, useMemo, useState } from "react";
import Post from "../../../models/Post";
import User from "../../../models/User";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { capitalizeFirst } from "../../../helpers/strings/string.helper";
import UserProfileBadge from "../../users/profile-badge/user-profile-badge.component";
import PostDetailsModal from "../details-modal/post-details-modal";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export interface PostsListProps {
  posts: Post[];
  users: Map<number, User>;

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

  // Sort posts by ID desc
  const sortedPosts = useMemo(() => {
    return posts.sort((a, b) => b.id - a.id);
  }, [posts]);

  // Generate the list element.
  const listElement = useMemo(() => {
    return (
      <List>
      {
        sortedPosts.map((post: Post, index: number) => {
          const user = (post.userId) 
            ? users.get(post.userId) ?? null 
            : null;
                    
          return (
            <React.Fragment key={post.id}>
              <ListItem
                sx={{
                  justifyContent: 'space-between'
                }}
              >
                <Stack>
                  <Typography
                    component="span"
                    variant="body1"
                    gutterBottom
                  >
                    { capitalizeFirst(post.title) }
                  </Typography>
                  <UserProfileBadge 
                    user={user}
                  />

                </Stack>

                <Button 
                  onClick={() => handleOpen(post)}
                >
                  Read more
                </Button>
              </ListItem>
              
              { index !== posts.length -1 && <Divider /> }
      
            </React.Fragment>
          );
        })
      }
      </List>
    );
  }, [sortedPosts, users]);
  
  return (
    <React.Fragment>
      { listElement }

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