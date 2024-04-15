import { api } from "app/api/api";
import { User } from "app/api/data.server";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Layout } from "../components/layout";

export const clientLoader = async () => {
  const users = await api.getUsers();
  return { users };
};

export default function UserRoute() {
  const [users, setUsers] = useState<User[] | null>(null);
  const params = useParams();
  useEffect(() => {
    const init = async () => {
      const users = await api.getUsers();
      setUsers(users);
    };
    init();
  }, [params]);

  const selectedUserId = params.userId;

  return (
    <Layout users={users} selectedUserId={selectedUserId}>
      <Outlet />
    </Layout>
  );
}
