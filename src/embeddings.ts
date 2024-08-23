import { config } from "dotenv";
import { OpenAIEmbeddings } from "@langchain/openai";

config();

export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.API_KEY,
    model: process.env.MODEL,
});
