# Router to Remix

This project is for demonstrating how to use Remix for React Router migration SSR.

## Branches

- `main`: The starting point of the project. It uses React for client-side routing with fastify api.
- `react-router`: The second step of the migration. It uses React Router for client-side loader and action paterns with fastify api.
- `remix-spa`: The first step of the migration. It uses Remix for client-side routing with fastify api.
- `remix`: The final version of the project. It uses Remix full-stack framework for routing and server-side rendering.

## How to run

1. Clone the project
2. Checkout to the branch you want to run
3. Run `pnpm install`
4. Start the server with `pnpm dev`
5. If you are running the `main` branch, you need to run the fastify server with `pnpm server` in another terminal.

## Ui

We use Mui for the UI components. You can find the documentation [here](https://mui.com/). This choice is for illustrative purposes because it is a popular library and not easy to integrate with SSR.

## Inspiration

- [React Router tuto](https://reactrouter.com/en/main/start/tutorial)
- [Remix vite setup](https://remix.run/docs/en/main/future/vite)
- [Remix migrating from React Router](https://remix.run/docs/en/main/guides/migrating-react-router-app)
