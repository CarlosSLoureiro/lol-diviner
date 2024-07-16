const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('API', {
  sendPrompt: async (prompt) => ipcRenderer.invoke('send-prompt', prompt)
})
