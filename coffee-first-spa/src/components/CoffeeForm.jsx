import { useState } from 'react';

function CoffeeForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Кава');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onAdd(title, category)) {
            setTitle('');
            setCategory('Кава');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-5 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Назва напою чи десерту (напр. Гарбузове латте)"
                    className="flex-1 rounded-lg border border-amber-300 px-4 py-2.5 text-base outline-none focus:border-amber-600"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-lg border border-amber-300 bg-white px-3 py-2.5 text-base outline-none focus:border-amber-600"
                >
                    <option value="Кава">Кава</option>
                    <option value="Чай">Чай</option>
                    <option value="Десерт">Десерт</option>
                    <option value="Сезонне">Сезонне</option>
                </select>
            </div>
            <button
                type="submit"
                className="cursor-pointer rounded-lg bg-amber-700 px-5 py-2.5 text-base font-medium text-white hover:bg-amber-800 transition-colors"
            >
                 Додати до меню
            </button>
        </form>
    );
}

export default CoffeeForm;