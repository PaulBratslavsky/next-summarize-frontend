"use server";
import { flattenAttributes } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mutateData } from "../services/mutate-data";

export async function createNoteAction(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const videoId = rawFormData.videoId as string;
  const payload = {
    data: {
      video: rawFormData.videoId,
      title: rawFormData.title,
      content: rawFormData.content,
    },
  };
  const data = await mutateData("POST", "/api/notes", payload);
  const flattenedData = flattenAttributes(data);
  revalidatePath("/dashboard/summaries" + videoId + "/notes");
  return {
    ...prevState,
    type: "CREATE_NOTE",
    data: flattenedData,
    errors: null,
  };
}

export async function deleteNoteAction(id: string) {
  const data = await mutateData("DELETE", `/api/notes/${id}?populate=*`);
  const flattenedData = flattenAttributes(data);
  redirect("/dashboard/summaries/" + flattenedData.video.id + "/notes");
}

export async function updateNoteAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData.id as string;

  const payload = {
    data: { content: rawFormData.content },
  };

  const data = await mutateData("PUT", `/api/notes/${id}?populate=*`, payload);
  const flattenedData = flattenAttributes(data);
  revalidatePath(
    "/dashboard/summaries/" + flattenedData.video.id + "/notes/" + id
  );
  return { data, message: "updateNoteAction" };
}
