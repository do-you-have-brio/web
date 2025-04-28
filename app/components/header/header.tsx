import { Button } from "@/components/ui/button";
import { AvatarButton } from "./avatar-button";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "../theme/toggle";

export function Header() {
  const session = {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://example.com/avatar.jpg",
    },
  };

  return (
    <header className="flex justify-between w-full items-center border-b p-4">
      <Link to={"/"}>
        <h1 className="text-xl font-bold text-blue-600">Why Runner</h1>
      </Link>
      <div className="flex gap-4 ">
        {session ? (
          <AvatarButton session={session} />
        ) : (
          <Link to="/auth/signin" className="text-blue-500">
            <Button variant="outline">Login</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
