import type { SerializeFrom } from "@remix-run/node";
import type { User } from "../api/data.server";
import { UserItem } from "./user-item";
import {
  USER_ITEM_SKELETONS_COUNT,
  UserItemSkeleton,
} from "./user-item-skeleton";

type UserListProps = {
  users: SerializeFrom<User[] | null> | undefined;
  selectedUserId?: string | null;
  isLoading?: boolean;
};

export const UserList = ({ users, selectedUserId, isLoading }: UserListProps) =>
  isLoading
    ? Array.from({ length: USER_ITEM_SKELETONS_COUNT }).map((_, index) => (
        <UserItemSkeleton key={index} />
      ))
    : users?.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          selected={user.id === selectedUserId}
        />
      ));
