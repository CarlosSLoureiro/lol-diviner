import { Document } from "@langchain/core/documents";
import { vectorStore } from "./vectorStore";

interface Champion {
  name: string;
  title: string;
  lore: string;
};

export const importer = async () => {
  const request = await fetch("http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json");
  const response = await request.json();

  const champions: Array<Champion> = Object.values(response);

  const documents = champions.map((champion) => {
    return new Document({
      pageContent: champion.lore,
      metadata: {
        characterName: champion.name,
        characterTitle: champion.title,
      },
    });
  });

  await vectorStore.addDocuments(documents);

  console.log(`Added ${documents.length} documents to the vector store.`);
}

importer();
