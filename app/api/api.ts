import { z } from "zod";

export const promiseOf = async <T>(promise: T) => {
  return promise;
};

const getUsersSchema = z.object({
  users: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      age: z.string(),
    })
  ),
});

const getUsers = async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  return getUsersSchema.parse(data).users;
};

const userDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.string(),
});

const getUserDetails = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return userDetailsSchema.parse(data);
};

const createUser = async ({ name, age }: { name: string; age: string }) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age }),
  });
  const data = await response.json();
  return userDetailsSchema.parse(data);
};

const updateUser = async ({
  id,
  name,
  age,
}: {
  id: string;
  name: string;
  age: string;
}) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age }),
  });
  const data = await response.json();
  return userDetailsSchema.parse(data);
};

const deleteUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return userDetailsSchema.parse(data);
};

export const api = {
  getUsers,
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
};
