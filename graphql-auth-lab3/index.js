import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { getUserFromAuthHeader } from './auth.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
    context: async ({ req }) => {
        // Дістаємо заголовок Authorization із запиту
        const authHeader = req.headers.authorization || '';
        // Визначаємо користувача по токену
        const user = getUserFromAuthHeader(authHeader);
        // Повертаємо об'єкт контексту, доступний у резолверах
        return { user };
    },
});

console.log(`Сервер "Coffee first" успішно запущено за адресою: ${url}`);