import { vectorStore } from "./vectorStore";

import prompt from 'prompt';

const start = () => {
  console.log('Describe the champion lore and press enter.');
  console.log('Type "exit" to finish the program.');
  console.log('');

  prompt.start();

  ask();
}

const ask = () => {
  prompt.get(['lore'], async function (err: any, result: any) {      
    if (result.lore === 'exit') {
      process.exit();
    }

    const results = await vectorStore.similaritySearchWithScore(result.lore, 1);
    const [ champion, score ] = results[0];

    console.log(`Champion: ${champion.metadata.characterName} - ${champion.metadata.characterTitle} (Similarity: ${score})`);
    console.log('Lore:', champion.pageContent);
    console.log('');

    ask();
  });
};

start();
