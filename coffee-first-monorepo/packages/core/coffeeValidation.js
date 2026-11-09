export const MAX_COFFEE_LENGTH = 100;
export const ERROR_EMPTY = 'Будь ласка, введіть назву напою чи десерту.';
export const ERROR_TOO_LONG = `Назва не повинна перевищувати ${MAX_COFFEE_LENGTH} символів.`;

export function validateCoffeeText(text) {
    if (typeof text !== 'string') {
        return { isValid: false, error: ERROR_EMPTY };
    }

    const trimmed = text.trim();

    if (trimmed.length === 0) {
        return { isValid: false, error: ERROR_EMPTY };
    }

    if (trimmed.length > MAX_COFFEE_LENGTH) {
        return { isValid: false, error: ERROR_TOO_LONG };
    }

    return { isValid: true, error: '' };
}