export function validateCoffee(req, res, next) {
    const { name, category, description, price, volume } = req.body;

    if (!name || !category || !description || price === undefined || volume === undefined) {
        return res.status(400).json({ message: "Усі поля є обов'язковими!" });
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(400).json({ message: "Ціна повинна бути додатним числом!" });
    }

    if (typeof volume !== "number" || volume <= 0) {
        return res.status(400).json({ message: "Об'єм повинен бути числом більшим за 0!" });
    }

    next();
}

export default validateCoffee;