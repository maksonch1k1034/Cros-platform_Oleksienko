const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('coffeeAPI', {
    loadCoffees: () => ipcRenderer.invoke('coffees:load'),
    saveCoffees: (coffees) => ipcRenderer.invoke('coffees:save', coffees),
});