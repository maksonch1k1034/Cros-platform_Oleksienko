import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './services/db.js';
import coffeeRoutes from './routes/coffeeRoutes.js';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get('/', (req, res) => {
    res.send("API для бекенду кав'ярні FirstCoffee працює успішно!");
});

app.use('/api/coffees', coffeeRoutes);

connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Сервер успішно запущено на порту ${PORT}`);
});