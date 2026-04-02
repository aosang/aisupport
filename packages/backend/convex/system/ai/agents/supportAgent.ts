import { openaiProvider } from "../../../lib/aiProvider";
import { Agent, type AgentComponent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { SUPPORT_AGENT_PROMPT } from "../constants";

export const supportAgent = new Agent(
  components.agent as unknown as AgentComponent,
  {
    chat: openaiProvider.chat("gpt-4o-mini"),
    instructions: SUPPORT_AGENT_PROMPT
  }
);