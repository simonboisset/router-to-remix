import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const users = [
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

export const createUser = (name: string, age: string) => {
  const maxId = users.reduce(
    (max, user) => Math.max(max, Number.parseInt(user.id)),
    0
  );
  const id = (maxId + 1).toString();
  users.push({ id, name, age });
  return id;
};

export const deleteUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  const user = users[index];
  users.splice(index, 1);
  return user;
};

export const updateUser = (id: string, name: string, age: string) => {
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
