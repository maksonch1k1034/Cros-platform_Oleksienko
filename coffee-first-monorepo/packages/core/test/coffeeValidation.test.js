import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCoffeeText, MAX_COFFEE_LENGTH, ERROR_EMPTY, ERROR_TOO_LONG } from '../coffeeValidation.js';

test('validateCoffeeText: коректна назва позиції', () => {
    const res = validateCoffeeText('Капучино з корицею');
    assert.equal(res.isValid, true);
    assert.equal(res.error, '');
});

test('validateCoffeeText: порожній текст або лише пробіли', () => {
    const res1 = validateCoffeeText('');
    assert.equal(res1.isValid, false);
    assert.equal(res1.error, ERROR_EMPTY);

    const res2 = validateCoffeeText('   ');
    assert.equal(res2.isValid, false);
    assert.equal(res2.error, ERROR_EMPTY);
});

test('validateCoffeeText: граничне значення MAX_COFFEE_LENGTH', () => {
    const maxText = 'a'.repeat(MAX_COFFEE_LENGTH);
    const res = validateCoffeeText(maxText);
    assert.equal(res.isValid, true);
});

test('validateCoffeeText: перевищення MAX_COFFEE_LENGTH + 1', () => {
    const tooLongText = 'a'.repeat(MAX_COFFEE_LENGTH + 1);
    const res = validateCoffeeText(tooLongText);
    assert.equal(res.isValid, false);
    assert.equal(res.error, ERROR_TOO_LONG);
});