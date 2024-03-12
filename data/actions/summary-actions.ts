"use server";
import { revalidatePath } from "next/cache";
import { flattenAttributes } from "@/lib/utils";
import { getAuthToken } from "../services/get-token";
import { redirect } from "next/navigation";
import { mutateData } from "@/data/services/mutate-data";

export async function updateSummaryAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData.id as string;
  const payload = {
    data: {
      title: rawFormData.title,
      summary: rawFormData.summary,
    },
  };
  const data = await mutateData("PUT", `/api/videos/${id}`, payload);
  revalidatePath("/dashboard/summaries/" + id);
  revalidatePath("/dashboard/account");
  return { data, message: "generateSummaryAction" };
}

export async function deleteSummaryAction(id: string) {
  const data = await mutateData("DELETE", `/api/videos/${id}`);
  const flattenedData = flattenAttributes(data);
  console.log("data", flattenedData);
  redirect("/dashboard/summaries");
}
