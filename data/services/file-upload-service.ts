import { getAuthToken } from "@/data/services/get-token";

export async function fileUploadService(image: any) {
  const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const path = "/api/upload";
  const url = baseUrl + path;

  const formData = new FormData();
  formData.append("files", image, image.name);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
      method: "POST",
      body: formData,
    });

    const dataResponse = await response.json();

    return dataResponse;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
