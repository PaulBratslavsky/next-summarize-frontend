export async function generateSummaryService(videoId: string, token: string) {
  const url =
    process.env.NEXT_PUBLIC_SUMMARIZE_URL ??
    "http://localhost:1337/api/summary-ai/summary";


  if (!token) throw new Error("No auth token provided");

  try {
    const response = await fetch(url + `/${videoId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.error("Failed to generate summary:", error);
    throw error;
  }
}
