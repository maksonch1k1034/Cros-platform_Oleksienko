import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { FileStorageAdapter } from '../fileStorageAdapter.js';

test('FileStorageAdapter: якщо файлу немає — повертає порожній масив', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'coffee-test-'));
    const filePath = path.join(tempDir, 'non-existent.json');

    const adapter = new FileStorageAdapter(filePath);
    const items = await adapter.load();
    assert.deepEqual(items, []);

    await fs.rm(tempDir, { recursive: true, force: true });
});

test('FileStorageAdapter: запис позицій у файл та наступне читання', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'coffee-test-'));
    const filePath = path.join(tempDir, 'subfolder', 'coffees.json');

    const adapter = new FileStorageAdapter(filePath);
    const sampleData = [{ id: '101', text: 'Флет Уайт', createdAt: new Date().toISOString() }];

    const saveSuccess = await adapter.save(sampleData);
    assert.equal(saveSuccess, true);

    const loaded = await adapter.load();
    assert.equal(loaded.length, 1);
    assert.equal(loaded[0].text, 'Флет Уайт');

    await fs.rm(tempDir, { recursive: true, force: true });
});

test('FileStorageAdapter: пошкоджений файл повертає порожній масив', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'coffee-test-'));
    const filePath = path.join(tempDir, 'corrupted.json');

    await fs.writeFile(filePath, 'invalid json content', 'utf-8');

    const adapter = new FileStorageAdapter(filePath);
    const items = await adapter.load();
    assert.deepEqual(items, []);

    await fs.rm(tempDir, { recursive: true, force: true });
});