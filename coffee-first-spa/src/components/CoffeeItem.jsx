function CoffeeItem({ item, onToggle, onDelete }) {
    return (
        <li
            className={`flex items-center justify-between p-4 rounded-lg transition-colors border ${
                item.done
                    ? 'bg-slate-200 border-slate-300'
                    : 'bg-amber-50/60 border-amber-200'
            }`}
        >
            <label className="flex items-center gap-3 cursor-pointer select-none flex-1">
                <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => onToggle(item.id)}
                    className="h-5 w-5 accent-amber-700 cursor-pointer"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span
              className={`text-base ${
                  item.done ? 'text-slate-500 line-through' : 'text-slate-800 font-medium'
              }`}
          >
            {item.title || item.text}
          </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium w-fit">
            {item.category || 'Кава'}
          </span>
                </div>
            </label>
            <button
                onClick={() => onDelete(item.id)}
                className="cursor-pointer rounded-lg bg-rose-500 px-3.5 py-2 text-white hover:bg-rose-700 transition-colors text-sm"
            >
                Видалити
            </button>
        </li>
    );
}

export default CoffeeItem;