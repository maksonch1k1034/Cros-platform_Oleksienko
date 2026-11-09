export class CoffeeStorageAdapter {
    async load() {
        throw new Error('Метод load() не реалізовано');
    }

    async save(coffees) {
        throw new Error('Метод save() не реалізовано');
    }
}

export class MemoryStorageAdapter extends CoffeeStorageAdapter {
    constructor(initialCoffees = []) {
        super();
        this.items = [...initialCoffees];
    }

    async load() {
        return [...this.items];
    }

    async save(coffees) {
        this.items = [...coffees];
        return true;
    }
}