"use client";
import React from "react";
import { useFormState } from "react-dom";
import { createNoteAction } from "@/data/actions/note-actions";

import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  type: null,
  data: null,
  error: null,
};

export function CreateNoteForm({ videoId }: { readonly videoId: string }) {
  const [createState, createNote] = useFormState(
    createNoteAction,
    initialState
  );

  return (
    <form className="space-y-4" action={createNote} key={createState.data?.id || ""}>
      <div className="space-y-4">
        <Input id="title" name="title" placeholder="Title" required />
        <Textarea
          id="content"
          name="content"
          placeholder="Write your note here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          required
        />
        <input type="hidden" name="videoId" value={videoId} />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Save Note" loadingText="Saving Note"/>
      </div>
    </form>
  );
}
