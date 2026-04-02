import { openaiProvider } from "../../lib/aiProvider";
import { RAG } from "@convex-dev/rag";
import { components } from "../../_generated/api";

const rag = new RAG(components.rag, {
  // @convex-dev/rag expects AI SDK v5+/v6 embedding model typing; current stack still returns v1 model shape.
  textEmbeddingModel: openaiProvider.embedding("text-embedding-3-small") as any,
  embeddingDimension: 1536
})

export default rag