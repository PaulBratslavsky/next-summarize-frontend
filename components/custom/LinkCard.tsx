import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LinkCard({
  item,
  className,
}: {
  readonly item: any;
  readonly className?: string;
}) {
  return (
    <Link href={`/dashboard/summaries/${item.id}`}>
      <Card className={cn("relative", className)}>
        <CardHeader>
          <CardTitle className="leading-5">{item.title || "Video Summary"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="w-full mb-4 ">{item.summary.slice(0,164) + " [read more]"}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
}
