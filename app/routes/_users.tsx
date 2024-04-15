import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { server } from "~/api/data.server";
import { Layout } from "../components/layout";

export const loader = async () => {
  const users = await server.getUsers();
  return { users };
};

export default function UserRoute() {
  const { users } = useLoaderData<typeof loader>();
  const params = useParams();

  const selectedUserId = params.userId;

  return (
    <Layout users={users} selectedUserId={selectedUserId}>
      <Outlet />
    </Layout>
  );
}
