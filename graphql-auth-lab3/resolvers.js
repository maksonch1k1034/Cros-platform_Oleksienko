import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { users, notes, getNextUserId, getNextNoteId } from './data.js';
import { createToken } from './auth.js';

export const resolvers = {
    Query: {
        users: () => users,

        me: (parent, args, context) => {
            return context.user || null;
        },

        notes: () => notes,
    },

    Mutation: {
        register: async (parent, args) => {
            const { name, email, password } = args;

            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                throw new GraphQLError('Користувач із таким email вже існує.', {
                    extensions: { code: 'BAD_USER_INPUT' }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                id: getNextUserId(),
                name,
                email,
                password: hashedPassword
            };

            users.push(newUser);
            const token = createToken(newUser);

            return { token, user: newUser };
        },

        login: async (parent, args) => {
            const { email, password } = args;

            const user = users.find(u => u.email === email);
            if (!user) {
                throw new GraphQLError('Невірний email або пароль.', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new GraphQLError('Невірний email або пароль.', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }

            const token = createToken(user);
            return { token, user };
        },

        createNote: (parent, args, context) => {
            if (!context.user) {
                throw new GraphQLError('Потрібна авторизація.', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }

            const { title, text } = args;
            const newNote = {
                id: getNextNoteId(),
                title,
                text,
                author: context.user // прив'язуємо поточного користувача як автора
            };

            notes.push(newNote);
            return newNote;
        },

        deleteNote: (parent, args, context) => {
            if (!context.user) {
                throw new GraphQLError('Потрібна авторизація.', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }

            const { id } = args;
            const index = notes.findIndex(n => n.id === id);

            if (index === -1) {
                return false;
            }

            notes.splice(index, 1);
            return true;
        }
    }
};