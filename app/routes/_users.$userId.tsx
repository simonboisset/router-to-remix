import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import {
  Await,
  type ClientActionFunctionArgs,
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { Suspense } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { server } from "../api/data.server";
import { UserForm, UserFormSkeleton } from "../components/user-form";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;

  if (!userId) return defer({ user: null });
  const user = server.getUserDetails(userId);
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
  serverAction,
}: ClientActionFunctionArgs) => {
  const user = await serverAction<typeof action>();

  if (request.method === "POST") {
    toast("User created successfully");

    return redirect(`/${user.id}`);
  }

  if (request.method === "PUT") {
    toast("User updated successfully");

    return { user };
  }

  if (request.method === "DELETE") {
    toast("User deleted successfully");

    return redirect("/");
  }
  return {};
};

export default function UserRoute() {
  const { user } = useLoaderData<typeof loader>();
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
