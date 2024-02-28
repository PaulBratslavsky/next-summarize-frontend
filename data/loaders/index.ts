import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";
import { getAuthToken } from "../services/get-token";

const PAGE_SIZE = 8;
const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

async function fetchData(url: string) {
  const authToken = await getAuthToken();
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getVideoById(videoId: string) {
  return fetchData(`${baseUrl}/api/videos/${videoId}`);
}

export async function getSummaries(currentPage: number, queryString: string) {
  noStore();
  const query = qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { summary: { $containsi: queryString } },
      ]
    },
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });
  return fetchData(`${baseUrl}/api/videos?${query}`);
}

export async function getNotesByVideoId(
  videoId: string,
  currentPage: number,
  queryString: string
) {
  noStore();

  const query = qs.stringify({
    filters: {
      video: { id: videoId },
      $or: [
        { title: { $containsi: queryString } },
        { content: { $containsi: queryString } },
      ],
    },
    populate: {
      video: {
        fields: ["id"],
      },
    },
    sort: ["createdAt:desc"],

    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });

  return fetchData(`${baseUrl}/api/notes?${query}`);
}

export async function getNotes(
  currentPage: number,
  queryString: string
) {
  noStore();

  const query = qs.stringify({
    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { content: { $containsi: queryString } },
      ],
    },
    populate: {
      video: {
        fields: ["id"],
      },
    },
    sort: ["createdAt:desc"],

    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });

  return fetchData(`${baseUrl}/api/notes?${query}`);
}



export async function getNoteById(noteId: string) {
  return fetchData(`${baseUrl}/api/notes/${noteId}`);
}
