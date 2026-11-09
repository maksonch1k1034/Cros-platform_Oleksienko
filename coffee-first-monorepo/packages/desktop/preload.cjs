const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('notesAPI', {
    list: (query) => ipcRenderer.invoke('notes:list', query),
    add: (text) => ipcRenderer.invoke('notes:add', text),
    remove: (id) => ipcRenderer.invoke('notes:remove', id)
});