import { Person } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "@remix-run/react";

export const SKELETON_ITEMS_COUNT = 4;

type UserItemProps = {
  user: { id: string; name: string };
  selected?: boolean;
};

export const UserItem = ({ user, selected }: UserItemProps) => (
  <ListItem disablePadding>
    <ListItemButton selected={selected} component={Link} to={`/${user.id}`}>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary={user.name} />
    </ListItemButton>
  </ListItem>
);
