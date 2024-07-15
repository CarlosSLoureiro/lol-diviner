import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "./embeddings";

export const vectorStore = new Chroma(embeddings, {
    collectionName: "champions",
    url: "http://localhost:8000",
    collectionMetadata: {
        "hnsw:space": "cosine",
    },
});
