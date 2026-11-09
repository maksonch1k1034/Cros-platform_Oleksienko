import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8'
};

const ALLOWED_WEB_FILES = ['/index.html', '/script.js', '/style.css', '/localStorageAdapter.js'];

const server = http.createServer((req, res) => {
    const urlPath = req.url === '/' ? '/index.html' : req.url;

    if (urlPath.startsWith('/node_modules/@coffee-first/core/')) {
        const relPath = urlPath.replace('/node_modules/@coffee-first/core/', '');
        const coreDir = path.resolve(__dirname, '../core');
        const targetPath = path.resolve(coreDir, relPath);

        if (!targetPath.startsWith(coreDir) || !fs.existsSync(targetPath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(targetPath);
        const contentType = MIME_TYPES[ext] || 'application/javascript; charset=UTF-8';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(targetPath).pipe(res);
        return;
    }

    if (!ALLOWED_WEB_FILES.includes(urlPath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
        return;
    }

    const filePath = path.join(__dirname, urlPath);

    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
        return;
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain; charset=UTF-8';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
    console.log(`Сервер Coffee First запущенo на http://localhost:${PORT}`);
});