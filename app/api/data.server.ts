import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.string(),
});

export type User = z.infer<typeof userSchema>;

const users = [
  {
    id: "1",
    name: "John Doe",
    age: "32",
  },
  {
    id: "2",
    name: "Jane Doe",
    age: "31",
  },
  {
    id: "3",
    name: "John Smith",
    age: "33",
  },
  {
    id: "4",
    name: "Jane Smith",
    age: "34",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createUser = async ({
  age,
  name,
}: {
  name: string;
  age: string;
}) => {
  await delay(2000);
  const maxId = users.reduce(
    (max, user) => Math.max(max, Number.parseInt(user.id)),
    0
  );
  const id = (maxId + 1).toString();
  users.push({ id, name, age });
  return { id, name, age };
};

export const deleteUser = async (id: string) => {
  await delay(2000);
  const index = users.findIndex((user) => user.id === id);
  const user = users[index];
  users.splice(index, 1);
  return user;
};

export const updateUser = async ({
  age,
  id,
  name,
}: {
  id: string;
  name: string;
  age: string;
}) => {
  await delay(2000);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users[index] = {
    id,
    name,
    age,
  };
};
const getUsers = async () => {
  await delay(2000);
  return users;
};

const getUserDetails = async (id: string) => {
  await delay(2000);
  console.log("id", id, users);

  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error("User details not found");
  }
  return user;
};

export const server = {
  createUser,
  deleteUser,
  updateUser,
  getUsers,
  getUserDetails,
};
