import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { User } from "../api/data.server";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { UserList } from "./user-list";

type LayoutProps = {
  users: SerializeFrom<User[]> | undefined;
  children: React.ReactNode;
  selectedUserId?: string | null;
  isLoading?: boolean;
};

export const Layout = ({
  children,
  selectedUserId,
  users,
  isLoading,
}: LayoutProps) => (
  <div className="flex flex-row min-h-screen">
    <nav className="fixed z-10 flex flex-col p-4 gap-4 overflow-y-auto h-screen w-[320px] bg-car shadow-md">
      <h6 className="text-primary text-lg font-bold">Hello Remix!</h6>
      <UserList
        isLoading={isLoading}
        users={users}
        selectedUserId={selectedUserId}
      />
      <Separator />
      <Button asChild>
        <Link to="/">Add</Link>
      </Button>
    </nav>
    <div className="w-[320px]" />
    <main className="flex-1 p-3 bg-gray-100 flex items-center justify-center">
      {children}
    </main>
  </div>
);
