import test from 'node:test';
import assert from 'node:assert/strict';
import { CoffeeService, MemoryStorageAdapter } from '@coffee-first/core';
import { createHandlers } from '../ipcHandlers.js';

test('ipcHandlers: додавання позиції та перевірка поля dateLabel', async () => {
    const adapter = new MemoryStorageAdapter();
    const service = new CoffeeService(adapter);
    const handlers = createHandlers(service);

    const res = await handlers.add(null, 'Американо з молоком');
    assert.equal(res.ok, true);
    assert.equal(res.coffee.text, 'Американо з молоком');
    assert.ok(res.coffee.dateLabel);
});

test('ipcHandlers: відхилення некоректного тексту при додаванні', async () => {
    const adapter = new MemoryStorageAdapter();
    const service = new CoffeeService(adapter);
    const handlers = createHandlers(service);

    const res1 = await handlers.add(null, '');
    assert.equal(res1.ok, false);

    const res2 = await handlers.add(null, 12345);
    assert.equal(res2.ok, false);
});

test('ipcHandlers: отримання списку з пошуком та відформатованими датами', async () => {
    const adapter = new MemoryStorageAdapter();
    const service = new CoffeeService(adapter);
    const handlers = createHandlers(service);

    await handlers.add(null, 'Еспресо Тонік');
    await handlers.add(null, 'Брауні');

    const allItems = await handlers.list(null, '');
    assert.equal(allItems.length, 2);
    assert.ok(allItems[0].dateLabel);

    const filtered = await handlers.list(null, 'тонік');
    assert.equal(filtered.length, 1);
    assert.equal(filtered[0].text, 'Еспресо Тонік');
});

test('ipcHandlers: видалення наявної та обробка некоректного ID', async () => {
    const adapter = new MemoryStorageAdapter();
    const service = new CoffeeService(adapter);
    const handlers = createHandlers(service);

    const addRes = await handlers.add(null, 'Гласе');
    const id = addRes.coffee.id;

    const removeRes1 = await handlers.remove(null, id);
    assert.equal(removeRes1.ok, true);

    const removeRes2 = await handlers.remove(null, null);
    assert.equal(removeRes2.ok, false);
});