export function createCoffee(text, category = 'Кава') {
    return {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        text: text.trim(),
        category: category,
        createdAt: new Date().toISOString(),
        done: false
    };
}

export function formatCoffeeDate(dateInput) {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export function sortCoffeesByDate(coffees) {
    if (!Array.isArray(coffees)) return [];
    return [...coffees].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function filterCoffeesByQuery(coffees, query) {
    if (!Array.isArray(coffees)) return [];
    if (!query || typeof query !== 'string') return [...coffees];

    const q = query.trim().toLowerCase();
    if (!q) return [...coffees];

    return coffees.filter(item =>
        item &&
        typeof item.text === 'string' &&
        item.text.toLowerCase().includes(q)
    );
}

export function sanitizeCoffees(coffees) {
    if (!Array.isArray(coffees)) return [];

    return coffees.filter(item =>
        item &&
        typeof item === 'object' &&
        typeof item.id !== 'undefined' &&
        typeof item.text === 'string' &&
        item.text.trim().length > 0
    );
}