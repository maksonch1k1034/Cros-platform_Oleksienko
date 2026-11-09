import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCoffeeDate, sortCoffeesByDate, filterCoffeesByQuery } from '../coffeeUtils.js';

test('formatCoffeeDate: форматування коректної та некоректної дати', () => {
    const validDate = formatCoffeeDate('2026-11-09T12:00:00.000Z');
    assert.equal(validDate, '09.11.2026');

    const invalidDate = formatCoffeeDate('invalid-date-string');
    assert.equal(invalidDate, '');
});

test('sortCoffeesByDate: сортування від новіших без зміни вихідного масиву', () => {
    const items = [
        { id: '1', text: 'Лате', createdAt: '2026-10-01T10:00:00.000Z' },
        { id: '2', text: 'Еспресо', createdAt: '2026-10-05T10:00:00.000Z' }
    ];

    const sorted = sortCoffeesByDate(items);
    assert.equal(sorted[0].id, '2');
    assert.equal(items[0].id, '1');
});

test('filterCoffeesByQuery: пошук позицій без урахування регістру', () => {
    const items = [
        { id: '1', text: 'Капучино' },
        { id: '2', text: 'Американо' },
        { id: '3', text: 'Чізкейк' }
    ];

    const result = filterCoffeesByQuery(items, 'АПУЧ');
    assert.equal(result.length, 1);
    assert.equal(result[0].text, 'Капучино');
});