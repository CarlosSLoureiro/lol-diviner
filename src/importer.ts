import pgvector from "pgvector";

import { DataBase } from "./database";
import { Champion } from "./champion";
import { embeddings } from "./embeddings";

interface ChampionFromAPI {
  name: string;
  title: string;
  lore: string;
}

export const importer = async () => {
  console.log("Wait a moment while we import the champions data...");

  await DataBase.initialize();

  const repository = DataBase.getRepository(Champion);

  const request = await fetch("http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json");
  const response = await request.json();

  const champions: Array<ChampionFromAPI> = Object.values(response);

  champions.forEach(async (champion) => {
    const { name, title, lore } = champion;
    const vector = await embeddings.embedQuery(champion.lore);

    await repository.insert([
      {
        name, title, lore,
        vector: pgvector.toSql(vector),
      },
    ]);
  });

  console.log(`Added ${champions.length} documents to the data base.`);
};

importer();
