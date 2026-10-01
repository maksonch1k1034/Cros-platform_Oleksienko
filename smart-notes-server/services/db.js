import mongoose from 'mongoose';

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Успішно підключено до бази даних кав'ярні!");
    } catch (error) {
        console.error("Помилка підключення до бази даних:", error.message);
    }
};

export default connectDB;