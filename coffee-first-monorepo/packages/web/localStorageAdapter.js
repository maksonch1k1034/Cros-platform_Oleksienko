import { CoffeeStorageAdapter } from '@coffee-first/core';

export class LocalStorageAdapter extends CoffeeStorageAdapter {
    constructor(storage = typeof window !== 'undefined' ? window.localStorage : null, key = 'coffee-first-data') {
        super();
        this.storage = storage;
        this.key = key;
    }

    async load() {
        if (!this.storage) return [];
        try {
            const data = this.storage.getItem(this.key);
            if (!data) return [];
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            return [];
        }
    }

    async save(coffees) {
        if (!this.storage) return false;
        try {
            this.storage.setItem(this.key, JSON.stringify(coffees));
            return true;
        } catch (err) {
            return false;
        }
    }
}