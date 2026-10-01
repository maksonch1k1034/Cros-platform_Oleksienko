import Coffee from '../models/Coffee.js';

export async function getCoffees(req, res) {
    try {
        const coffees = await Coffee.find().sort({ createdAt: -1 });
        res.json(coffees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getCoffeeById(req, res) {
    try {
        const coffee = await Coffee.findById(req.params.id);
        if (!coffee) return res.status(404).json({ message: "Напій не знайдено!" });
        res.json(coffee);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера або невірний формат ID" });
    }
}

export async function createCoffee(req, res) {
    try {
        const { name, category, description, price, volume } = req.body;
        const newCoffee = await Coffee.create({ name, category, description, price, volume });
        res.status(201).json(newCoffee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateCoffee(req, res) {
    try {
        const { name, category, description, price, volume } = req.body;
        const updatedCoffee = await Coffee.findByIdAndUpdate(
            req.params.id,
            { name, category, description, price, volume },
            { new: true, runValidators: true }
        );
        if (!updatedCoffee) return res.status(404).json({ message: "Напій не знайдено!" });
        res.json(updatedCoffee);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера або невірний формат ID" });
    }
}

export async function deleteCoffee(req, res) {
    try {
        const deletedCoffee = await Coffee.findByIdAndDelete(req.params.id);
        if (!deletedCoffee) return res.status(404).json({ message: "Напій не знайдено!" });
        res.json({ message: "Напій успішно видалено." });
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера або невірний формат ID" });
    }
}