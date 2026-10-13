import CoffeeItem from './CoffeeItem.jsx';

function CoffeeList({ items, onToggle, onDelete }) {
    if (items.length === 0) {
        return (
            <p className="text-center text-slate-500 my-6">
                Товарів у меню поки немає. Додайте перший!
            </p>
        );
    }

    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <CoffeeItem
                    key={item.id}
                    item={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default CoffeeList;