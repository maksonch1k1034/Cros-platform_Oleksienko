import jwt from 'jsonwebtoken';
import { users } from './data.js';

export const JWT_SECRET = 'first_coffee_super_secret_key_123';

export function createToken(user) {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
}

export function getUserFromToken(token) {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);
        return user || null;
    } catch (error) {
        return null;
    }
}

export function getUserFromAuthHeader(authHeader) {
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    const token = parts[1];
    return getUserFromToken(token);
}