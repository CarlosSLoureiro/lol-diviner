import pgvector from "pgvector";

import { Champion } from "./champion";
import { DataBase } from "./database";
import { embeddings } from "./embeddings";

import prompt from "prompt";

const start = async () => {
  console.log("Starting...");
  console.clear();

  await DataBase.initialize();

  console.log("Describe the champion lore and press enter.");
  console.log('Type "exit" to finish the program.');
  console.log("");

  prompt.start();

  ask();
};

const search = async (lore: string) => {
  const repository = DataBase.getRepository(Champion);

  const vector = await embeddings.embedQuery(lore);

  const time = Date.now();

  const query = await repository
    .createQueryBuilder("champion")
    .select(["champion.*"])
    .addSelect("champion.vector <-> :vector", "similarity")
    .orderBy("champion.vector <-> :vector")
    .setParameters({ vector: pgvector.toSql(vector) })
    .limit(1)
    .getRawMany();

  const [champion] = query;

  console.log(`Time: ${Date.now() - time}ms`);
  console.log(`Champion: ${champion.name} - ${champion.title} (Similarity: ${champion.similarity})`);
  console.log("Lore:", champion.lore);
  console.log("");
};

const ask = () => {
  prompt.get(["lore"], async function (err: any, result: any) {
    if (result.lore === "exit") {
      process.exit();
    }

    try {
      await search(result.lore);
    } catch (error) {
      console.error(error);
    } finally {
      ask();
    }
  });
};

start();
