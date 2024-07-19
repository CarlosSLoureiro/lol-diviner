import { PGVectorStore, PGVectorStoreArgs } from "@langchain/community/vectorstores/pgvector";
import { embeddings } from "./embeddings";
import pg from "pg";

const reusablePool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "vectorexample",
});

const originalConfig: PGVectorStoreArgs = {
  pool: reusablePool,
  tableName: "champions",
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
};

export const vectorStore = new PGVectorStore(embeddings, originalConfig);