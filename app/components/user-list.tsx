import { List } from "@mui/material";
import type { SerializeFrom } from "@remix-run/node";
import { Await } from "@remix-run/react";
import { Suspense } from "react";
import type { User } from "../api/data.server";
import { UserItem } from "./user-item";
import {
  USER_ITEM_SKELETONS_COUNT,
  UserItemSkeleton,
} from "./user-item-skeleton";

type UserListProps = {
  users: Promise<SerializeFrom<User[] | null> | undefined>;
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
      {(usersList) => (
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
