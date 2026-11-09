import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CoffeeService } from '@coffee-first/core';
import { FileStorageAdapter } from './fileStorageAdapter.js';
import { createHandlers } from './ipcHandlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

async function createWindow() {
    const dataPath = path.join(app.getPath('userData'), 'coffees.json');
    const adapter = new FileStorageAdapter(dataPath);
    const service = new CoffeeService(adapter);
    const handlers = createHandlers(service);

    ipcMain.handle('notes:list', (e, q) => handlers.list(e, q));
    ipcMain.handle('notes:add', (e, text) => handlers.add(e, text));
    ipcMain.handle('notes:remove', (e, id) => handlers.remove(e, id));

    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        title: "Coffee First Desktop",
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});