import { BrowserWindow, app, ipcMain } from 'electron'
import { vectorStore } from "./vectorStore";
import path from 'node:path'

const search = async (prompt: string) => {
    const results = await vectorStore.similaritySearchWithScore(prompt, 1);
    const [ document, similarity ] = results[0];

    return {
      name: document.metadata.name,
      title: document.metadata.title,
      icon: document.metadata.icon,
      lore: document.pageContent,
      similarity
    }
};

function createWindow () {
  const win = new BrowserWindow({
    width: 1080,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '..', 'public', 'preload.js')
    }
  });

  ipcMain.handle('send-prompt', async (event, prompt) => search(prompt))

  win.loadFile(path.join(__dirname, '..', 'public', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

