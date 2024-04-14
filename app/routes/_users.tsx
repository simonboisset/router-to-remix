import { defer, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { api } from "~/api/api";
import { Layout } from "../components/layout";

export const clientLoader = async () => {
  const users = api.getUsers();
  return defer({ users });
};

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
