const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function getCoffeeFilePath() {
    return path.join(app.getPath('userData'), 'coffees.json');
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        title: 'Coffee First Desktop',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

ipcMain.handle('coffees:load', () => {
    const filePath = getCoffeeFilePath();

    if (!fs.existsSync(filePath)) {
        return [];
    }

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Помилка читання файлу меню:', error);
        return [];
    }
});

ipcMain.handle('coffees:save', (event, coffees) => {
    const filePath = getCoffeeFilePath();

    try {
        fs.writeFileSync(filePath, JSON.stringify(coffees, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Помилка збереження файлу меню:', error);
        return false;
    }
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});