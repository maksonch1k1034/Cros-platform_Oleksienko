import mongoose from 'mongoose';
const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Назва напою обов'язкова!"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Категорія обов'язкова!"],
        enum: ['Кава', 'Чай', 'Десерти', 'Холодні напої'],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Опис обов'язковий!"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Ціна обов'язкова!"],
        min: [0, "Ціна має бути більшою або рівною 0!"]
    },
    volume: {
        type: Number,
        required: [true, "Об'єм обов'язковий!"],
        min: [1, "Об'єм має бути більшим за 0!"]
    }
}, {
    timestamps: true
});
const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;