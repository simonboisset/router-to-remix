import { z } from "zod";
import { userSchema } from "./data";

const getUsers = async () => {
  const res = await fetch("/api/users");
  const json = await res.json();

  return z.array(userSchema).parse(json);
};

const createUser = async ({ age, name }: { name: string; age: string }) => {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ name, age }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return z.object(userSchema.shape).parse(json);
};

const deleteUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  return z.object(userSchema.shape).parse(json);
};

const updateUser = async ({
  age,
  id,
  name,
}: {
  id: string;
  name: string;
  age: string;
}) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, age }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return z.object(userSchema.shape).parse(json);
};

const getUserDetails = async (id: string) => {
  const res = await fetch(`/api/users/${id}`);
  const json = await res.json();
  return userSchema.parse(json);
};

export const api = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserDetails,
};
