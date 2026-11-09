import fs from 'node:fs/promises';
import path from 'node:path';
import { CoffeeStorageAdapter } from '@coffee-first/core';

export class FileStorageAdapter extends CoffeeStorageAdapter {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }

    async load() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            return [];
        }
    }

    async save(coffees) {
        try {
            const dir = path.dirname(this.filePath);
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(this.filePath, JSON.stringify(coffees, null, 2), 'utf-8');
            return true;
        } catch (err) {
            return false;
        }
    }
}