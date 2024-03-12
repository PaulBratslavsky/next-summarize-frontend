import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/custom/Logo";
import { LoggedInUser } from "@/components/custom/LoggedInUser";
import { SummarizeForm } from "./forms/SummarizeForm";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function TopNav() {
  const user = await getUserMeLoader();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo />
      { user.ok && <SummarizeForm /> }
      <div className="flex items-center gap-4">
        {user.ok 
          ? <LoggedInUser userData={user.data} />
          : <Link href="/login"><Button>Login</Button></Link>}
      </div>
    </div>
  );
}
