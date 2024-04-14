import Fastify from "fastify";
import { z } from "zod";
import { server } from "./app/api/data.server";

const fastify = Fastify({
  logger: true,
});

fastify.get("/api/users", async () => {
  const users = await server.getUsers();
  return users;
});

fastify.post("/api/users", async (request: any) => {
  const { name, age } = z
    .object({ name: z.string(), age: z.string() })
    .parse(request.body);
  const id = server.createUser({ name, age });
  return { id, name, age };
});

fastify.delete("/api/users/:id", async (request: any) => {
  const id = z.object({ id: z.string() }).parse(request.params).id;
  const user = server.deleteUser(id);
  return user;
});

fastify.put("/api/users/:id", async (request: any) => {
  const id = z.object({ id: z.string() }).parse(request.params).id;
  const { name, age } = z
    .object({ name: z.string(), age: z.string() })
    .parse(request.body);
  await server.updateUser({ id, name, age });
  return { id, name, age };
});

fastify.get("/api/users/:id", async (request: any) => {
  const id = z.object({ id: z.string() }).parse(request.params).id;
  const user = server.getUserDetails(id);
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
