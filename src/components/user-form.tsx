import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, Skeleton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { User } from "../api/data";

type UserFomrProps = {
  user?: User;
  isLoading?: boolean;
  isCreating?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  onCreate?: (props: { name: string; age: string }) => void;
  onUpdate?: (props: { id: string; name: string; age: string }) => void;
  onDelete?: (id: string) => void;
};

export const UserForm = ({
  user,
  isLoading,
  isCreating,
  isDeleting,
  isUpdating,
  onCreate,
  onUpdate,
  onDelete,
}: UserFomrProps) => {
  const [name, setName] = useState(user?.name ?? "");
  const [age, setAge] = useState(user?.age ?? "");

  useEffect(() => {
    setName(user?.name ?? "");
    setAge(user?.age ?? "");
  }, [user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.id) {
      onUpdate?.({ id: user.id, name, age });
    } else {
      onCreate?.({ name, age });
    }
  };
  if (isLoading) {
    return <UserFormSkeleton />;
  }
  return (
    <Card sx={{ maxWidth: 440, width: "100%" }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextField
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isLoading || isCreating || isUpdating || isDeleting}
            />
            <TextField
              label="Age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              disabled={isLoading}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <LoadingButton
                variant="outlined"
                color="error"
                type="button"
                loading={isDeleting}
                disabled={isCreating || isUpdating || isLoading || !user?.id}
                onClick={() => {
                  if (user?.id) {
                    onDelete?.(user.id);
                  }
                }}
              >
                Delete
              </LoadingButton>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isCreating || isUpdating}
                disabled={isLoading || !name || !age || isDeleting}
              >
                {user?.id ? "Update" : "Create"}
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

const UserFormSkeleton = () => (
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
