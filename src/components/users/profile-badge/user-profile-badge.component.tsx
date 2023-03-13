import './user-profile-badge.component.scss';
import User from "../../../models/User";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { capitalizeFirst } from "../../../helpers/strings/string.helper";
import { useMemo } from 'react';

export interface UserProfileBadgeProps {
  user: User | null;
}

export default function UserProfileBadge(
  {user} : UserProfileBadgeProps
): JSX.Element 
{ 
  const userName = useMemo(() => {
    return (user) 
    ? capitalizeFirst(user.name) 
    : 'Anonymous';
  }, [user]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Avatar
        sx={{
          width: 30,
          height: 30,
        }}
      >
        { userName.charAt(0) }
      </Avatar>

      <Typography
        variant="subtitle2"
        component="span"
      >
        { userName }
      </Typography>
    </Box>
  );
}