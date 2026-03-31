import { createOpenAI } from "@ai-sdk/openai";
import { Agent, type AgentComponent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";


const openai = createOpenAI({
  baseURL: "https://api.gptsapi.net/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export const supportAgent = new Agent(
  components.agent as unknown as AgentComponent,
  {
    chat: openai.chat("gpt-4o-mini"),
    instructions: `You are a customer support agent, Use "resolveConversation" tool when user express finalization of the conversation. Use "escalateConversation" tool when user express frustration, or request human explicitly.`,
  } as any,
);