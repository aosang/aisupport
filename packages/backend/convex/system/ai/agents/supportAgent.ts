import { openaiProvider } from "../../../lib/aiProvider";
import { Agent, type AgentComponent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";

export const supportAgent = new Agent(
  components.agent as unknown as AgentComponent,
  {
    chat: openaiProvider.chat("gpt-4o-mini"),
    instructions: `You are a customer support agent, Use "resolveConversation" tool when user express finalization of the conversation. Use "escalateConversation" tool when user express frustration, or request human explicitly.`,
  } as any,
);