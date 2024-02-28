"use server";
import z from "zod";
import { fileUploadService } from "@/data/services/file-upload-service";
import { fileDeleteService } from "@/data/services/file-delete-service";
import { mutateData } from "../services/mutate-data";
import { flattenAttributes } from "@/lib/utils";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "Please update or add new image.")

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});

export async function uploadProfileImageAction(
  imageId: string,
  prevState: any,
  formData: FormData
) {
  const user = await getUserMeLoader();
  const userId = user.data.id;
  if (!userId) throw new Error("User not found");

  const data = Object.fromEntries(formData);

  const validatedFields = imageSchema.safeParse({
    image: data.image,
  });

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      data: null,
      ...prevState,
    };
  }

  if (imageId) await fileDeleteService(imageId);

  const fileUploadResponse = await fileUploadService(data.image);
  const updatedImageId = fileUploadResponse[0].id;
  const payload = { image: updatedImageId };

  const updateImageResponse = await mutateData( "PUT",`/api/users/${userId}`,payload);
  const flattenedData = flattenAttributes(updateImageResponse);
  revalidatePath("/dashboard/account");
  return { ...prevState, data: flattenedData, zodErrors: null };
}
