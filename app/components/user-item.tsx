import { Link, useLocation, useNavigation } from "react-router-dom";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export const SKELETON_ITEMS_COUNT = 4;

type UserItemProps = {
  user: { id: string; name: string };
  selected?: boolean;
};

export const UserItem = ({ user, selected }: UserItemProps) => {
  const navigation = useNavigation();
  const location = useLocation();

  const isNavigating =
    !!navigation.location?.pathname &&
    location.pathname !== navigation.location.pathname &&
    navigation.location.pathname.includes(user.id);
  console.log("isNavigating", user.id, location.pathname, selected);

  return (
    <Button asChild variant={selected ? "default" : "outline"}>
      <Link to={`/${user.id}`}>
        {user.name}
        {isNavigating && <Spinner className="ml-4" />}
      </Link>
    </Button>
  );
};
