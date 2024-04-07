import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, Skeleton, TextField } from "@mui/material";
import type { SerializeFrom } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { User } from "../api/data.server";

type UserFomrProps = {
  user?: SerializeFrom<User> | null | undefined;
  isCreating?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
};

export const UserForm = ({
  user,

  isCreating,
  isDeleting,
  isUpdating,
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

  return (
    <Card sx={{ maxWidth: 440, width: "100%" }}>
      <CardContent>
        <Form method={user?.id ? "PUT" : "POST"}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <LoadingButton
                variant="outlined"
                color="error"
                type="button"
                onClick={handleDelete}
                loading={isDeleting}
                disabled={isCreating || isUpdating || !user?.id}
              >
                Delete
              </LoadingButton>

              <LoadingButton
                variant="contained"
                type="submit"
                loading={isCreating || isUpdating}
                disabled={!name || !age || isDeleting}
              >
                {user?.id ? "Update" : "Create"}
              </LoadingButton>
            </Box>
          </Box>
        </Form>
      </CardContent>
    </Card>
  );
};

export const UserFormSkeleton = () => (
  <Card sx={{ maxWidth: 440, width: "100%" }}>
    <CardContent>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Skeleton variant="rounded" width={100} height={40} />
          <Skeleton variant="rounded" width={100} height={40} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const TextFieldSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, with: "100%" }}>
    <Skeleton variant="rounded" width={100} height={10} />
    <Skeleton variant="rounded" width={"100%"} height={40} />
  </Box>
);
