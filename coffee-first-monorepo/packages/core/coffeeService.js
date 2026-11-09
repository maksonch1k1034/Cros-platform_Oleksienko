import { validateCoffeeText } from './coffeeValidation.js';
import { createCoffee, sortCoffeesByDate, filterCoffeesByQuery, sanitizeCoffees } from './coffeeUtils.js';

export class CoffeeService {
    constructor(adapter) {
        if (!adapter) {
            throw new Error('Storage adapter is required');
        }
        this.adapter = adapter;
    }

    async list(query = '') {
        const raw = await this.adapter.load();
        const clean = sanitizeCoffees(raw);
        const filtered = filterCoffeesByQuery(clean, query);
        return sortCoffeesByDate(filtered);
    }

    async add(text, category = 'Кава') {
        const validation = validateCoffeeText(text);
        if (!validation.isValid) {
            return { ok: false, error: validation.error };
        }

        const raw = await this.adapter.load();
        const clean = sanitizeCoffees(raw);

        const newCoffee = createCoffee(text, category);
        const updated = [newCoffee, ...clean];

        await this.adapter.save(updated);
        return { ok: true, coffee: newCoffee };
    }

    async remove(id) {
        const raw = await this.adapter.load();
        const clean = sanitizeCoffees(raw);

        const exists = clean.some(item => item.id === id);
        if (!exists) {
            return { ok: false, error: 'Позицію не знайдено.' };
        }

        const updated = clean.filter(item => item.id !== id);
        await this.adapter.save(updated);
        return { ok: true };
    }

    async toggle(id) {
        const raw = await this.adapter.load();
        const clean = sanitizeCoffees(raw);

        const item = clean.find(i => i.id === id);
        if (!item) {
            return { ok: false, error: 'Позицію не знайдено.' };
        }

        item.done = !item.done;
        await this.adapter.save(clean);
        return { ok: true, coffee: item };
    }
}