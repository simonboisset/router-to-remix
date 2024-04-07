import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../api/api";
import type { User } from "../api/data";
import { Layout } from "../components/layout";
import { useSnackbar } from "../components/snackbar";
import { UserForm } from "../components/user-form";

export const Route = () => {
  const setSnackbarOpen = useSnackbar((state) => state.setOpen);
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryFn: api.getUsers,
    queryKey: ["get-users"],
  });

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: user, isLoading: isUserDetailsLoading } = useQuery({
    queryFn: () =>
      selectedUserId ? api.getUserDetails(selectedUserId) : undefined,
    queryKey: ["get-user-details", selectedUserId],
    enabled: Boolean(selectedUserId),
  });

  const { isPending: isUserCreating, mutate: createUser } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: api.createUser,
    onSuccess: ({ id, age, name }) => {
      setSnackbarOpen(true, "User created successfully");
      queryClient.setQueryData<User[] | undefined>(["get-users"], (users) => {
        if (!users) return;
        return [...users, { id, age, name }];
      });

      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      queryClient.invalidateQueries({
        queryKey: ["get-user-details", selectedUserId],
      });
      setSelectedUserId(id);
    },
  });

  const { isPending: isUserUpdating, mutate: updateUser } = useMutation({
    mutationKey: ["update-user", selectedUserId],
    mutationFn: api.updateUser,
    onSuccess: ({ age, id, name }) => {
      setSnackbarOpen(true, "User updated successfully");
      queryClient.setQueryData<User[] | undefined>(["get-users"], (users) => {
        if (!users) return;
        return users.map((usr) => {
          if (usr.id === id) {
            return { id, age, name };
          }
          return usr;
        });
      });

      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      queryClient.invalidateQueries({
        queryKey: ["get-user-details", selectedUserId],
      });
    },
  });

  const { isPending: isUserDeleting, mutate: deleteUser } = useMutation({
    mutationKey: ["delete-user", selectedUserId],
    mutationFn: api.deleteUser,
    onSuccess: ({ id }) => {
      setSnackbarOpen(true, "User deleted successfully");
      queryClient.setQueryData<User[] | undefined>(["get-users"], (users) => {
        if (!users) return;
        return users.filter((usr) => usr.id !== id);
      });
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      queryClient.invalidateQueries({
        queryKey: ["get-user-details", selectedUserId],
      });
      setSelectedUserId(null);
    },
  });

  return (
    <Layout
      isLoading={isLoading}
      users={users}
      selectedUserId={selectedUserId}
      setSelectedUserId={setSelectedUserId}
    >
      <UserForm
        user={user}
        isCreating={isUserCreating}
        isUpdating={isUserUpdating}
        isDeleting={isUserDeleting}
        onCreate={createUser}
        onUpdate={updateUser}
        onDelete={deleteUser}
        isLoading={isUserDetailsLoading}
      />
    </Layout>
  );
};
