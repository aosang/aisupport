import { createOpenAI } from "@ai-sdk/openai";

export const openaiProvider = createOpenAI({
  baseURL: "https://api.gptsapi.net/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

