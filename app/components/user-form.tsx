import type { SerializeFrom } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { User } from "../api/data.server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LoadingButton } from "./ui/loading-button";
import { Skeleton } from "./ui/skeleton";
import { TextField } from "./ui/text-field";

type UserFomrProps = {
  user?: SerializeFrom<User> | null | undefined;
  isCreating?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  isLoading?: boolean;
};

export const UserForm = ({
  user,
  isCreating,
  isDeleting,
  isUpdating,
  isLoading,
}: UserFomrProps) => {
  const [name, setName] = useState(user?.name ?? "");
  const [age, setAge] = useState(user?.age ?? "");
  const submit = useSubmit();
  useEffect(() => {
    setName(user?.name ?? "");
    setAge(user?.age ?? "");
  }, [user]);

  const handleDelete = async () => {
    if (!user?.id) return;
    submit(null, { method: "delete" });
  };

  if (isLoading) {
    return <UserFormSkeleton />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{user?.id ? "Edit User" : "Create User"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method={user?.id ? "PUT" : "POST"}>
          <div className="flex flex-col gap-4">
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isCreating || isUpdating || isDeleting}
            />
            <TextField
              label="Age"
              name="age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              disabled={isCreating || isUpdating || isDeleting}
            />
            <div className="flex flex-row justify-end gap-2">
              <LoadingButton
                variant="destructive"
                color="error"
                type="button"
                className="flex-1"
                onClick={handleDelete}
                loading={!!isDeleting}
                disabled={isCreating || isUpdating || !user?.id}
              >
                Delete
              </LoadingButton>

              <LoadingButton
                variant="default"
                type="submit"
                className="flex-1"
                loading={!!isCreating || !!isUpdating}
                disabled={!name || !age || isDeleting}
              >
                {user?.id ? "Update" : "Create"}
              </LoadingButton>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export const UserFormSkeleton = () => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <Skeleton className="h-6 w-[240px] rounded-lg" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-4">
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <div className="flex flex-row justify-end gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 flex-1 rounded-lg" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const TextFieldSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-[120px] rounded-lg" />
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
);
