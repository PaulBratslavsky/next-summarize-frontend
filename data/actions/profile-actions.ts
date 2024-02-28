"use server";
import { flattenAttributes } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { mutateData } from "../services/mutate-data";
import qs from "qs";

export async function updateProfileAction(
  userId: string,
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData);

  console.log("updateProfileAction", userId);

  const query = qs.stringify({
    populate: "*",
  });

  const payload = {
    firstName: rawFormData.firstName,
    lastName: rawFormData.lastName,
    bio: rawFormData.bio,
  };

  const data = await mutateData("PUT",`/api/users/${userId}?${query}`, payload);
  const flattenedData = flattenAttributes(data);

  revalidatePath("/dashboard/account");
  return {
    ...prevState,
    type: "CREATE_NOTE",
    data: flattenedData,
    errors: null,
  };
}
