import { embeddings } from "./embeddings";
import { QdrantVectorStore } from "@langchain/qdrant";

export const vectorStore = new QdrantVectorStore(embeddings, {
  url: "http://localhost:6333",
  collectionName: "champions",
});