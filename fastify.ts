import Fastify from "fastify";
import { z } from "zod";
import { createUser, deleteUser, updateUser, users } from "./src/api/data";

const fastify = Fastify({
  logger: true,
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

fastify.get("/api/users", async () => {
  await delay(2000);
  return users;
});

fastify.post("/api/users", async (request) => {
  await delay(2000);
  const { name, age } = z
    .object({ name: z.string(), age: z.string() })
    .parse(request.body);
  const id = createUser(name, age);
  return { id, name, age };
});

fastify.delete("/api/users/:id", async (request) => {
  await delay(2000);
  const id = z.object({ id: z.string() }).parse(request.params).id;
  const user = deleteUser(id);
  return user;
});

fastify.put("/api/users/:id", async (request) => {
  await delay(2000);
  const id = z.object({ id: z.string() }).parse(request.params).id;
  const { name, age } = z
    .object({ name: z.string(), age: z.string() })
    .parse(request.body);
  updateUser(id, name, age);
  return { id, name, age };
});

fastify.get("/api/users/:id", async (request) => {
  await delay(2000);
  const id = z.object({ id: z.string() }).parse(request.params).id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
