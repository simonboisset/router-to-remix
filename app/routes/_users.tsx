import { api } from "app/api/api";
import { User } from "app/api/data.server";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { Layout } from "../components/layout";

export const clientLoader = async () => {
  const users = await api.getUsers();
  return { users };
};

export default function UserRoute() {
  const { users } = useLoaderData() as { users: User[] };
  const params = useParams();

  const selectedUserId = params.userId;

  return (
    <Layout users={users} selectedUserId={selectedUserId}>
      <Outlet />
    </Layout>
  );
}
