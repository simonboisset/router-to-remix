import { api } from "app/api/api";
import {
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import { z } from "zod";

import { User } from "app/api/data.server";
import { UserForm } from "../components/user-form";

export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;

  if (!userId) return { user: null };
  const user = await api.getUserDetails(userId);
  return { user };
};

export const clientAction = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = params.userId;
  const formData = await request.formData();
  const name = formData.get("name");
  const age = formData.get("age");
  if (request.method === "POST") {
    const user = z
      .object({ name: z.string(), age: z.string() })
      .parse({ name, age });
    const res = await api.createUser(user);

    return redirect(`/${res.id}`);
  }

  if (request.method === "PUT") {
    const user = z
      .object({ name: z.string(), age: z.string(), id: z.string() })
      .parse({ name, age, id: userId });
    const res = await api.updateUser(user);

    return { user: res };
  }

  if (request.method === "DELETE") {
    if (!userId) throw new Error("User not found");
    await api.deleteUser(userId);

    return redirect("/");
  }
  return {};
};

export default function UserRoute() {
  const { user } = useLoaderData() as { user: null | User };
  const navigation = useNavigation();
  const method = navigation.formMethod;
  const params = useParams();

  const isSubmitting = !!navigation.formAction?.startsWith(
    `/${params.userId || ""}`
  );

  const isUserCreating = method === "post" && isSubmitting;
  const isUserUpdating = method === "put" && isSubmitting;
  const isUserDeleting = method === "delete" && isSubmitting;
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
