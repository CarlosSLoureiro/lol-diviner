import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";

config();

export const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_APIKEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_APIVERSION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_APIINSTANCENAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_APIDEPLOYMENTNAME,
});
