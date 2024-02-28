import { updateNoteAction } from "@/data/actions/note-actions";
import { deleteNoteAction } from "@/data/actions/note-actions";
import { TextareaCustom } from "@/components/custom/TextareaCustom";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SubmitButton } from "./buttons/SubmitButton";
import { DeleteButton } from "./buttons/DeleteButton";

export function NoteCard({
  item,
  className,
}: {
  readonly item: any;
  readonly className?: string;
}) {
  const deleteNoteById = deleteNoteAction.bind(null, item.id);

  return (
    <Card className={cn("mb-8 relative h-auto", className)}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <form action={updateNoteAction}>
            <TextareaCustom
              name="content"
              className="w-full mb-4 h-[calc(100vh-245px)] "
              defaultValue={item.content}
            />
            <input type="hidden" name="id" value={item.id} />
            <SubmitButton
              className="absolute right-4 bottom-4"
              text="Update Note"
              loadingText="Updating Note"
            />
          </form>
          <form action={deleteNoteById}>
            <DeleteButton className="absolute right-4 top-4 bg-red-700 hover:bg-red-600" />
          </form>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
