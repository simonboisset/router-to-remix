import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  SerializeFrom,
} from "@remix-run/node";
import {
  Await,
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
  defer,
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { Suspense } from "react";
import { z } from "zod";
import { type User, server } from "../api/data.server";
import { promiseOf, queryClient } from "../api/query-client";
import { useSnackbar } from "../components/snackbar";
import { UserForm, UserFormSkeleton } from "../components/user-form";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;

  if (!userId) return null;
  const user = await server.getUserDetails(userId);
  return user;
};

export const clientLoader = async ({
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const userId = params.userId;

  if (!userId) return { user: undefined };
  const cache = promiseOf(
    queryClient.getQueryData<SerializeFrom<typeof loader>>([
      "get-user-details",
      userId,
    ])
  );
  const user =
    cache ||
    queryClient.fetchQuery({
      queryKey: ["get-user-details", userId],
      queryFn: serverLoader<typeof loader>,
    });

  return defer({ user });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const userId = params.userId;
  const formData = await request.formData();
  const name = formData.get("name");
  const age = formData.get("age");
  if (request.method === "POST") {
    const user = z
      .object({ name: z.string(), age: z.string() })
      .parse({ name, age });
    const res = await server.createUser(user);
    return res;
  }
  if (request.method === "PUT") {
    const user = z
      .object({ name: z.string(), age: z.string(), id: z.string() })
      .parse({ name, age, id: userId });
    const res = await server.updateUser(user);
    return res;
  }
  if (request.method === "DELETE") {
    if (!userId) throw new Error("User not found");
    const res = await server.deleteUser(userId);
    return res;
  }
  throw redirect("/");
};

export const clientAction = async ({
  request,
  params,
  serverAction,
}: ClientActionFunctionArgs) => {
  const user = await serverAction<typeof action>();
  const setSnackbarOpen = useSnackbar.getState().setOpen;

  if (request.method === "POST") {
    setSnackbarOpen(true, "User created successfully");
    queryClient.setQueryData<User[] | undefined>(["get-users"], (users) => {
      if (!users) return;
      return [...users, user];
    });
    queryClient.setQueryData<User>(["get-user-details", user.id], user);
    queryClient.invalidateQueries({ queryKey: ["get-users"] });
    queryClient.invalidateQueries({
      queryKey: ["get-user-details", user.id],
    });
    return redirect(`/${user.id}`);
  }

  if (request.method === "PUT") {
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

  if (request.method === "DELETE") {
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
  const { user } = useLoaderData<typeof clientLoader>();
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
        {(usr) => (
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
