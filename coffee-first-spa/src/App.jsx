import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import CoffeeForm from './components/CoffeeForm.jsx';
import CoffeeList from './components/CoffeeList.jsx';

const STORAGE_KEY = 'coffee-first-menu';

const loadItems = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Помилка зчитування з localStorage:', error);
    return [];
  }
};

function App() {
  const [items, setItems] = useState(loadItems);
  const [message, setMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Всі');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Помилка збереження в localStorage:', error);
    }
  }, [items]);

  const handleAdd = (title, category) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setMessage({ text: 'Назва товару не може бути порожньою!', type: 'error' });
      return false;
    }

    const newItem = {
      id: Date.now(),
      title: trimmedTitle,
      category,
      done: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setMessage({ text: 'Товар успішно додано до меню!', type: 'success' });
    return true;
  };

  const handleToggle = (id) => {
    setItems((prevItems) =>
        prevItems.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item
        )
    );
  };

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setMessage({ text: 'Товар видалено з меню!', type: 'success' });
  };

  const filteredItems = items.filter((item) => {
    const titleText = item?.title || item?.text || '';
    const matchesSearch = titleText
        .toLowerCase()
        .includes((searchQuery || '').toLowerCase());
    const matchesCategory =
        filterCategory === 'Всі' || !item.category || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const doneCount = items.filter((item) => item.done).length;

  return (
      <div className="min-h-screen bg-amber-50 px-4 py-8 text-slate-800">
        <main className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
          <Header total={items.length} done={doneCount} />

          <CoffeeForm onAdd={handleAdd} />

          {/* Панель пошуку та фільтрації */}
          <div className="mb-4 flex flex-col sm:flex-row gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=" Пошук за назвою..."
                className="flex-1 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-600"
            />
            <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-600"
            >
              <option value="Всі">Усі категорії</option>
              <option value="Кава">Кава</option>
              <option value="Чай">Чай</option>
              <option value="Десерт">Десерт</option>
              <option value="Сезонне">Сезонне</option>
            </select>
          </div>

          {message && (
              <p
                  className={`mb-4 font-bold ${
                      message.type === 'error' ? 'text-rose-600' : 'text-emerald-700'
                  }`}
              >
                {message.text}
              </p>
          )}

          <CoffeeList
              items={filteredItems}
              onToggle={handleToggle}
              onDelete={handleDelete}
          />
        </main>
      </div>
  );
}

export default App;