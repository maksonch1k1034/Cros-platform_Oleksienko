function Header({ total, done }) {
    return (
        <header>
            <h1 className="text-center text-3xl font-bold text-amber-800 mb-2">
                Coffee First SPA
            </h1>
            <p className="text-center text-slate-600 mb-5">
                Усього товарів: {total} · В наявності: {done}
            </p>
        </header>
    );
}

export default Header;