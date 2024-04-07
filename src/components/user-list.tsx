import { List } from "@mui/material";
import type { User } from "../api/data";
import { UserItem } from "./user-item";
import {
  USER_ITEM_SKELETONS_COUNT,
  UserItemSkeleton,
} from "./user-item-skeleton";

type UserListProps = {
  users?: User[];
  onSelectUser: (userId: string) => void;
  isLoading: boolean;
  selectedUserId?: string | null;
};

export const UserList = ({
  users,
  onSelectUser,
  isLoading,
  selectedUserId,
}: UserListProps) => (
  <List>
    {isLoading
      ? Array.from({ length: USER_ITEM_SKELETONS_COUNT }).map((_, index) => (
          <UserItemSkeleton key={index} />
        ))
      : users?.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onSelectUser={onSelectUser}
            selected={user.id === selectedUserId}
          />
        ))}
  </List>
);
