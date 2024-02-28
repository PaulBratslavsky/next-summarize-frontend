import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { flattenAttributes } from "@/lib/utils";

export async function fileDeleteService(imageId: string) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");
  const data = await mutateData("DELETE", `/api/upload/files/${imageId}`);
  const flattenedData = flattenAttributes(data);
  console.log("flattenedData", flattenedData);
  return flattenedData;
}