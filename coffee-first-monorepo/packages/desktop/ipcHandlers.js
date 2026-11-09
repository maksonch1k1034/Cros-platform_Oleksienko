import { formatCoffeeDate } from '@coffee-first/core';

export function createHandlers(service) {
    return {
        async list(event, query) {
            try {
                const q = typeof query === 'string' ? query : '';
                const items = await service.list(q);
                return (items || []).map(item => ({
                    ...item,
                    dateLabel: item && item.createdAt ? formatCoffeeDate(item.createdAt) : ''
                }));
            } catch (err) {
                console.error('Error in list handler:', err);
                return [];
            }
        },

        async add(event, text) {
            try {
                const validText = typeof text === 'string' ? text : '';
                const res = await service.add(validText);
                if (res && res.ok && res.coffee) {
                    return {
                        ...res,
                        coffee: {
                            ...res.coffee,
                            dateLabel: res.coffee.createdAt ? formatCoffeeDate(res.coffee.createdAt) : ''
                        }
                    };
                }
                return res;
            } catch (err) {
                return { ok: false, error: 'Помилка при додаванні.' };
            }
        },

        async remove(event, id) {
            try {
                if (!id) return { ok: false, error: 'Некоректний ID.' };
                return await service.remove(String(id));
            } catch (err) {
                return { ok: false, error: 'Помилка при видаленні.' };
            }
        }
    };
}