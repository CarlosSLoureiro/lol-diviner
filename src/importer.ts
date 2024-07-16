import { Document } from "@langchain/core/documents";
import { vectorStore } from "./vectorStore";

interface Champion {
  name: string;
  title: string;
  lore: string;
  icon: string;
};

export const importer = async () => {
  console.log("Wait a moment while the champions data are imported...");

  const request = await fetch("http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json");
  const response = await request.json();

  const champions: Array<Champion> = Object.values(response);

  const documents = champions.map((champion) => {
    return new Document({
      pageContent: champion.lore,
      metadata: {
        name: champion.name,
        title: champion.title,
        icon: champion.icon,
      },
    });
  });

  await vectorStore.addDocuments(documents);

  console.log(`Added ${documents.length} documents to the vector store.`);
}

importer();
