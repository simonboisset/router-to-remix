import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const promiseOf = async <T>(promise: T) => {
  return promise;
};
