import { OpenSearchVectorStore } from "@langchain/community/vectorstores/opensearch";
import { Client } from "@opensearch-project/opensearch";
import { embeddings } from "./embeddings";

const host = "localhost";
const protocol = "https";
const port = 9600;
const auth = "admin:4dm1n-P455W0RD";

const client = new Client({
  nodes: [
    protocol + "://" + auth + "@" + host + ":" + 9200,
    protocol + "://" + auth + "@" + host + ":" + 9600,
  ],
  ssl: {
      rejectUnauthorized: false,
  },
  
});

export const vectorStore = new OpenSearchVectorStore(embeddings, {
  client,
  indexName: "champions",
});