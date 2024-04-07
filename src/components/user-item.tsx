import { Person } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const SKELETON_ITEMS_COUNT = 4;

type UserItemProps = {
  user: { id: string; name: string };
  onSelectUser: (id: string) => void;
  selected?: boolean;
};

export const UserItem = ({ user, onSelectUser, selected }: UserItemProps) => (
  <ListItem disablePadding>
    <ListItemButton onClick={() => onSelectUser(user.id)} selected={selected}>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary={user.name} />
    </ListItemButton>
  </ListItem>
);
