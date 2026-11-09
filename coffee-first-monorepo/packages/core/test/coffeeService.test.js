import test from 'node:test';
import assert from 'node:assert/strict';
import { CoffeeService } from '../coffeeService.js';
import { MemoryStorageAdapter } from '../storageAdapter.js';

test('CoffeeService: успішне додавання позиції та унікальність ID', async () => {
    const adapter = new MemoryStorageAdapter();
    const service = new CoffeeService(adapter);

    const res1 = await service.add('Капучино', 'Кава');
    const res2 = await service.add('Раф', 'Кава');

    assert.equal(res1.ok, true);
    assert.equal(res2.ok, true);
    assert.notEqual(res1.coffee.id, res2.coffee.id);

    const list = await service.list();
    assert.equal(list.length, 2);
});

test('CoffeeService: відхилення порожнього тексту', async () => {
    const adapter = new MemoryStorageAdapter();
    const service = new CoffeeService(adapter);

    const res = await service.add('   ');
    assert.equal(res.ok, false);
    assert.ok(res.error);
});

test('CoffeeService: видалення наявної та відсутньої позиції', async () => {
    const adapter = new MemoryStorageAdapter();
    const service = new CoffeeService(adapter);

    const addRes = await service.add('Матча лате');
    const id = addRes.coffee.id;

    const removeRes1 = await service.remove(id);
    assert.equal(removeRes1.ok, true);

    const removeRes2 = await service.remove('non-existent-id');
    assert.equal(removeRes2.ok, false);
    assert.equal(removeRes2.error, 'Позицію не знайдено.');
});