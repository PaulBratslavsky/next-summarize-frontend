import Link from "next/link";
import { MountainIcon } from "@/components/icons/MountainIcon";

export default function Logo({ dark = false }) {
  return (
    <Link className="flex items-center gap-2" href="/">
      <MountainIcon className={`h-6 w-6 ${dark ? "text-white" : ""}`} />
      <span className="text-lg font-semibold">Summarize AI</span>
    </Link>
  );
}
