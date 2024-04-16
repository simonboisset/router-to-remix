import {
  type ClientLoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { server } from "~/api/data.server";
import { UserFormSkeleton } from "~/components/user-form";
import { Layout } from "../components/layout";

export const loader = async () => {
  const users = await server.getUsers();
  return { users };
};

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const res = await serverLoader<typeof loader>();
  return res;
};

export const HydrateFallback = () => (
  <Layout isLoading users={[]} selectedUserId={""}>
    <UserFormSkeleton />
  </Layout>
);

export default function UserRoute() {
  const { users } = useLoaderData<typeof clientLoader>();
  const params = useParams();

  const selectedUserId = params.userId;

  return (
    <Layout users={users} selectedUserId={selectedUserId}>
      <Outlet />
    </Layout>
  );
}
