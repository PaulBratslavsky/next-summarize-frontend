import { getAuthToken } from "./get-token";

export async function mutateData(method: string, path: string, payload?: any) {
  const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(baseUrl + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...payload }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}