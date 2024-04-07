import type { SerializeFrom } from "@remix-run/node";
import {
  type ClientLoaderFunctionArgs,
  Outlet,
  defer,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { server } from "../api/data.server";
import { promiseOf, queryClient } from "../api/query-client";
import { Layout } from "../components/layout";

export const loader = async () => {
  const users = await server.getUsers();
  return users;
};

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const cache = promiseOf(
    queryClient.getQueryData<SerializeFrom<typeof loader>>(["get-users"])
  );
  const users =
    cache ||
    queryClient.fetchQuery({
      queryKey: ["get-users"],
      queryFn: serverLoader<typeof loader>,
    });

  return defer({ users });
};

export default function UserRoute() {
  const { users } = useLoaderData<typeof clientLoader>();

  const params = useParams();
  const selectedUserId = params.userId;

  return (
    <Layout isLoading={false} users={users} selectedUserId={selectedUserId}>
      <Outlet />
    </Layout>
  );
}
