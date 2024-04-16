import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { z } from "zod";
import { server } from "~/api/data.server";
import { UserForm } from "../components/user-form";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;

  if (!userId) return { user: null };
  const user = await server.getUserDetails(userId);
  return { user };
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

    return redirect(`/${res.id}`);
  }

  if (request.method === "PUT") {
    const user = z
      .object({ name: z.string(), age: z.string(), id: z.string() })
      .parse({ name, age, id: userId });
    const res = await server.updateUser(user);

    return { user: res };
  }

  if (request.method === "DELETE") {
    if (!userId) throw new Error("User not found");
    await server.deleteUser(userId);

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
    <UserForm
      user={user}
      isCreating={isUserCreating}
      isUpdating={isUserUpdating}
      isDeleting={isUserDeleting}
      isLoading={isLoading}
    />
  );
}
