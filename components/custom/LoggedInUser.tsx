import { logoutAction } from "@/data/actions/auth-actions";
import { LogoutIcon } from "@/components/icons/LogoutIcon";
import Link from "next/link";

interface AuthUserProps {
  username: string;
  email: string;
}

function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">
        <LogoutIcon className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  );
}

export function LoggedInUser({ userData }: { readonly userData: AuthUserProps }) {
  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/account"
        className="font-semibold hover:text-primary"
      >
        {userData.username}
      </Link>
      <LogoutButton />
    </div>
  );
}
