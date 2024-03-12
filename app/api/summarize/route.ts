import { YoutubeTranscript } from "youtube-transcript";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "@/data/services/get-token";

async function getTranscript(id: string) {
  try {
    return await YoutubeTranscript.fetchTranscript(id);
  } catch (error) {
    console.error("Failed to get transcript:", error);
    throw error;
  }
}

function transformData(data: any[]) {
  let text = "";

  data.forEach((item) => {
    text += item.text + " ";
  });

  return {
    data: data,
    text: text.trim(),
  };
}

async function getSummary(content: string) {
  const prompt = PromptTemplate.fromTemplate(TEMPLATE);

  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.OPENAI_MODEL ?? "gpt-4",
    temperature: process.env.OPENAI_TEMPERATURE
      ? parseFloat(process.env.OPENAI_TEMPERATURE)
      : 0.7,
    maxTokens: process.env.OPENAI_MAX_TOKENS
      ? parseInt(process.env.OPENAI_MAX_TOKENS)
      : 4000,
  });

  const outputParser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);
  const summary = await chain.invoke({ text: content });
  return summary;
}

async function saveSummary(payload: {
  data: {
    videoId: string;
    summary: string;
  };
}) {
  const token = await getAuthToken();
  if (!token) throw new Error("No auth token provided");

  const baseUrl = getStrapiURL();
  const path = "/api/videos";

  const url = new URL(path, baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...payload }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to save summary:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
}

import { NextRequest } from "next/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// export const runtime = "edge";

const TEMPLATE = `
INSTRUCTIONS: 
  For the this {text} complete the following steps.
  Generate the title for based on the content provided
  Summarize the following content and include key topics, writing in first person using normal tone of voice.
  Generate bulleted list of key points and benefits
  Return possible and best recommended key words
  Write a blog post based on the content 
    - Include heading and sections.  
    - Return in markdown.  
    - Incorporate keywords and key takeaways in to the blog post.
  Write a recommendation section and include 3 to 5 ways I can improve this blog post.
`;

export async function POST(req: NextRequest) {
  const user = await getUserMeLoader();
  const token = await getAuthToken();

  if (!user.ok || !token)
    return new Response(
      JSON.stringify({ data: null, error: "Not authenticated" }),
      { status: 401 }
    );

  if (user.data.credits < 1)
    return new Response(
      JSON.stringify({
        data: null,
        error: { message: "Insufficient credits" },
      }),
      { status: 402 }
    );

  try {
    const body = await req.json();
    const videoId = body.videoId;

    const transcript = await getTranscript(videoId);
    const transcriptText = transformData(transcript);

    const summary = await getSummary(transcriptText.text);

    const payload = {
      data: {
        videoId: videoId,
        summary: summary,
      },
    };

    const response = await saveSummary(payload);
    console.log(response);

    return new Response(JSON.stringify({ data: response.data, error: null }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }
}
