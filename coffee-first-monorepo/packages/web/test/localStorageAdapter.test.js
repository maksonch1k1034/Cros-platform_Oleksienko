import test from 'node:test';
import assert from 'node:assert/strict';
import { CoffeeService } from '@coffee-first/core';
import { LocalStorageAdapter } from '../localStorageAdapter.js';

class MockLocalStorage {
    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    clear() {
        this.store = {};
    }
}

test('LocalStorageAdapter: порожнє сховище повертає порожній масив', async () => {
    const mockStorage = new MockLocalStorage();
    const adapter = new LocalStorageAdapter(mockStorage, 'test-key');
    const items = await adapter.load();
    assert.deepEqual(items, []);
});

test('LocalStorageAdapter: запис позицій та наступне читання', async () => {
    const mockStorage = new MockLocalStorage();
    const adapter = new LocalStorageAdapter(mockStorage, 'test-key');

    const sampleData = [{ id: '1', text: 'Капучино', createdAt: new Date().toISOString() }];
    await adapter.save(sampleData);

    const loaded = await adapter.load();
    assert.equal(loaded.length, 1);
    assert.equal(loaded[0].text, 'Капучино');
});

test('LocalStorageAdapter: пошкоджений JSON повертає порожній масив', async () => {
    const mockStorage = new MockLocalStorage();
    mockStorage.setItem('test-key', '{ invalid-json ...');

    const adapter = new LocalStorageAdapter(mockStorage, 'test-key');
    const items = await adapter.load();
    assert.deepEqual(items, []);
});

test('LocalStorageAdapter: інтеграційна робота з CoffeeService', async () => {
    const mockStorage = new MockLocalStorage();
    const adapter = new LocalStorageAdapter(mockStorage, 'test-key');
    const service = new CoffeeService(adapter);

    const addRes = await service.add('Лате макіато');
    assert.equal(addRes.ok, true);

    const items = await service.list();
    assert.equal(items.length, 1);
    assert.equal(items[0].text, 'Лате макіато');
});