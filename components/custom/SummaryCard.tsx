import { updateSummaryAction, deleteSummaryAction } from "@/data/actions/summary-actions";

import { TextareaCustom } from "@/components/custom/TextareaCustom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DeleteButton } from "./buttons/DeleteButton";
import { SubmitButton } from "./buttons/SubmitButton";

export function SummaryCard({
  item,
  className,
}: {
  readonly item: any;
  readonly className?: string;
}) {
  const deleteSummaryById = deleteSummaryAction.bind(null, item.id);

  return (
    <Card className={cn("mb-8 relative h-auto", className)}>
      <CardHeader>
        <CardTitle>Video Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <form action={updateSummaryAction}>
          <Input id="title" name="title" placeholder="Update your title" required className="mb-4" defaultValue={item.title}/>

            <TextareaCustom
              name="summary"
              className="w-full mb-4 h-[calc(100vh-245px)] "
              defaultValue={item.summary}
            />
            <input type="hidden" name="id" value={item.id} />
            <SubmitButton
              text="Update Summary"
              loadingText="Updating Summary"
            />
          </form>
          <form action={deleteSummaryById}>
            <DeleteButton className="absolute right-4 top-4 bg-red-700 hover:bg-red-600" />
          </form>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
