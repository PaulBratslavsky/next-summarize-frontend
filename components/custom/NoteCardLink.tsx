import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NoteCardLink({
  item,
  className,
}: {
  readonly item: any;
  readonly className?: string;
}) {
  return (
    <Link href={`/dashboard/summaries/${item.video.id}/notes/${item.id}`}>
      <Card className={cn("relative w-full", className)}>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="w-full mb-4">
            {item.content.slice(0, 164) + " [read more]"}
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
}
