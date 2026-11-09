import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_WEB_FILES = ['/index.html', '/script.js', '/style.css', '/localStorageAdapter.js'];
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8'
};

function createTestServer() {
    const webDir = path.resolve(__dirname, '..');
    return http.createServer((req, res) => {
        const urlPath = req.url === '/' ? '/index.html' : req.url;

        if (urlPath.startsWith('/node_modules/@coffee-first/core/')) {
            const relPath = urlPath.replace('/node_modules/@coffee-first/core/', '');
            const coreDir = path.resolve(webDir, '../core');
            const targetPath = path.resolve(coreDir, relPath);

            if (!targetPath.startsWith(coreDir) || !fs.existsSync(targetPath)) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                res.end('404 Not Found');
                return;
            }

            const ext = path.extname(targetPath);
            res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/javascript; charset=UTF-8' });
            fs.createReadStream(targetPath).pipe(res);
            return;
        }

        if (!ALLOWED_WEB_FILES.includes(urlPath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('404 Not Found');
            return;
        }

        const filePath = path.join(webDir, urlPath);
        if (!fs.existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain; charset=UTF-8' });
        fs.createReadStream(filePath).pipe(res);
    });
}

function fetchUrl(server, urlPath) {
    return new Promise((resolve, reject) => {
        const addr = server.address();
        http.get(`http://127.0.0.1:${addr.port}${urlPath}`, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
        }).on('error', reject);
    });
}

test('Server: дозволений шлях / повертає 200 OK та index.html', async () => {
    const server = createTestServer();
    await new Promise(res => server.listen(0, res));

    try {
        const response = await fetchUrl(server, '/');
        assert.equal(response.statusCode, 200);
        assert.ok(response.body.includes('Coffee First Web'));
    } finally {
        server.close();
    }
});

test('Server: доступ до файлів ядра через /node_modules/@coffee-first/core/', async () => {
    const server = createTestServer();
    await new Promise(res => server.listen(0, res));

    try {
        const response = await fetchUrl(server, '/node_modules/@coffee-first/core/index.js');
        assert.equal(response.statusCode, 200);
        assert.ok(response.body.includes('export * from'));
    } finally {
        server.close();
    }
});

test('Server: заборонений або неіснуючий шлях повертає 404', async () => {
    const server = createTestServer();
    await new Promise(res => server.listen(0, res));

    try {
        const res1 = await fetchUrl(server, '/server.js');
        assert.equal(res1.statusCode, 404);

        const res2 = await fetchUrl(server, '/unknown-file.txt');
        assert.equal(res2.statusCode, 404);
    } finally {
        server.close();
    }
});