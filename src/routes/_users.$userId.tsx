import { Suspense } from "react";
import {
  type ActionFunctionArgs,
  Await,
  type LoaderFunctionArgs,
  defer,
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import { z } from "zod";
import { api } from "../api/api";
import { type User, userSchema } from "../api/data";
import { queryClient } from "../api/query-client";
import { useSnackbar } from "../components/snackbar";
import { UserForm, UserFormSkeleton } from "../components/user-form";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;

  if (!userId) return { user: undefined };
  const cache = queryClient.getQueryData<User>(["get-user-details", userId]);
  const user =
    cache ||
    queryClient.fetchQuery({
      queryKey: ["get-user-details", userId],
      queryFn: () => api.getUserDetails(userId),
    });

  return defer({ user });
};

export const action = async (args: ActionFunctionArgs) => {
  const userId = args.params.userId;
  const formData = await args.request.formData();
  const name = formData.get("name");
  const age = formData.get("age");
  const setSnackbarOpen = useSnackbar.getState().setOpen;

  if (args.request.method === "POST") {
    const user = z
      .object({ name: z.string(), age: z.string() })
      .parse({ name, age });
    const { id } = await api.createUser(user);
    setSnackbarOpen(true, "User created successfully");
    queryClient.setQueryData<User[] | undefined>(["get-users"], (users) => {
      if (!users) return;
      return [...users, { ...user, id }];
    });
    queryClient.setQueryData<User>(["get-user-details", id], { ...user, id });
    queryClient.invalidateQueries({ queryKey: ["get-users"] });
    queryClient.invalidateQueries({
      queryKey: ["get-user-details", id],
    });
    return redirect(`/${id}`);
  }

  if (args.request.method === "PUT") {
    const user = userSchema.parse({ name, age, id: userId });
    await api.updateUser(user);

    setSnackbarOpen(true, "User updated successfully");
    queryClient.setQueryData<User[] | undefined>(["get-users"], (users) => {
      if (!users) return;
      return users.map((usr) => {
        if (usr.id === user.id) {
          return user;
        }
        return usr;
      });
    });
    queryClient.setQueryData<User>(["get-user-details", user.id], user);

    queryClient.invalidateQueries({ queryKey: ["get-users"] });
    queryClient.invalidateQueries({
      queryKey: ["get-user-details", user.id],
    });
    return { user };
  }

  if (args.request.method === "DELETE") {
    if (!userId) throw new Error("User not found");
    const user = await api.deleteUser(userId);
    setSnackbarOpen(true, "User deleted successfully");
    queryClient.setQueryData<User[] | undefined>(["get-users"], (users) => {
      if (!users) return;
      return users.filter((usr) => usr.id !== user.id);
    });

    queryClient.invalidateQueries({ queryKey: ["get-users"] });
    queryClient.invalidateQueries({
      queryKey: ["get-user-details", user.id],
    });
    return redirect("/");
  }
  return {};
};

export default function UserRoute() {
  const { user } = useLoaderData() as { user: Promise<User | undefined> };
  const navigation = useNavigation();
  const method = navigation.formMethod;
  const params = useParams();

  const isSubmitting = !!navigation.formAction?.startsWith(
    `/${params.userId || ""}`
  );

  const isUserCreating = method === "post" && isSubmitting;
  const isUserUpdating = method === "put" && isSubmitting;
  const isUserDeleting = method === "delete" && isSubmitting;

  return (
    <Suspense fallback={<UserFormSkeleton />}>
      <Await resolve={user}>
        {(usr: User | undefined) => (
          <UserForm
            user={usr}
            isCreating={isUserCreating}
            isUpdating={isUserUpdating}
            isDeleting={isUserDeleting}
          />
        )}
      </Await>
    </Suspense>
  );
}
