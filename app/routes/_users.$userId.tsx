import { defer } from "@remix-run/node";
import {
  Await,
  type ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { Suspense } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/api/api";

import { UserForm, UserFormSkeleton } from "../components/user-form";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const userId = params.userId;

  if (!userId) return defer({ user: null });
  const user = api.getUserDetails(userId);
  return defer({ user });
};

export const clientAction = async ({
  request,
  params,
}: ClientActionFunctionArgs) => {
  const userId = params.userId;
  const formData = await request.formData();
  const name = formData.get("name");
  const age = formData.get("age");
  if (request.method === "POST") {
    const user = z
      .object({ name: z.string(), age: z.string() })
      .parse({ name, age });
    const res = await api.createUser(user);
    toast("User created successfully");

    return redirect(`/${res.id}`);
  }

  if (request.method === "PUT") {
    const user = z
      .object({ name: z.string(), age: z.string(), id: z.string() })
      .parse({ name, age, id: userId });
    const res = await api.updateUser(user);
    toast("User updated successfully");

    return { user: res };
  }

  if (request.method === "DELETE") {
    if (!userId) throw new Error("User not found");
    await api.deleteUser(userId);
    toast("User deleted successfully");

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

  const isUserCreating = method === "POST" && isSubmitting;
  const isUserUpdating = method === "PUT" && isSubmitting;
  const isUserDeleting = method === "DELETE" && isSubmitting;
  const isLoading = navigation.state !== "idle" && !isSubmitting;
  return (
    <Suspense fallback={<UserFormSkeleton />}>
      <Await resolve={user}>
        {(usr) => (
          <UserForm
            user={usr}
            isCreating={isUserCreating}
            isUpdating={isUserUpdating}
            isDeleting={isUserDeleting}
            isLoading={isLoading}
          />
        )}
      </Await>
    </Suspense>
  );
}
