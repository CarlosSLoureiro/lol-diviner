import { Milvus } from "@langchain/community/vectorstores/milvus";
import { embeddings } from "./embeddings";

export const vectorStore = new Milvus(embeddings, {
    collectionName: "champions",
    url: "http://localhost:19530",
    indexCreateOptions: {
        index_type: "HNSW",
        metric_type: "COSINE",
    },
});
