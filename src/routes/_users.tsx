import { Outlet, defer, useLoaderData, useParams } from "react-router-dom";
import { api } from "../api/api";
import type { User } from "../api/data";
import { queryClient } from "../api/query-client";
import { Layout } from "../components/layout";

export const loader = async () => {
  const cache = queryClient.getQueryData<User[]>(["get-users"]);
  const users =
    cache ||
    queryClient.fetchQuery({
      queryKey: ["get-users"],
      queryFn: api.getUsers,
    });

  return defer({ users });
};

export default function UserRoute() {
  const { users } = useLoaderData() as { users: Promise<User[]> };

  const params = useParams();
  const selectedUserId = params.userId;

  return (
    <Layout isLoading={false} users={users} selectedUserId={selectedUserId}>
      <Outlet />
    </Layout>
  );
}
