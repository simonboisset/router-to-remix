import { List } from "@mui/material";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import type { User } from "../api/data";
import { UserItem } from "./user-item";
import {
  USER_ITEM_SKELETONS_COUNT,
  UserItemSkeleton,
} from "./user-item-skeleton";

type UserListProps = {
  users?: Promise<User[]>;
  isLoading: boolean;
  selectedUserId?: string | null;
};

export const UserList = ({
  users,
  isLoading,
  selectedUserId,
}: UserListProps) => (
  <Suspense
    fallback={Array.from({ length: USER_ITEM_SKELETONS_COUNT }).map(
      (_, index) => (
        <UserItemSkeleton key={index} />
      )
    )}
  >
    <Await resolve={users}>
      {(usersList: User[]) => (
        <List>
          {isLoading
            ? Array.from({ length: USER_ITEM_SKELETONS_COUNT }).map(
                (_, index) => <UserItemSkeleton key={index} />
              )
            : usersList?.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  selected={user.id === selectedUserId}
                />
              ))}
        </List>
      )}
    </Await>
  </Suspense>
);
