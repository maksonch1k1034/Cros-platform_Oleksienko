const coffeeInput = document.getElementById('coffeeInput');
const addCoffeeButton = document.getElementById('addCoffeeButton');
const messageElement = document.getElementById('message');
const coffeesList = document.getElementById('coffeesList');

let coffees = [];

function showMessage(text, color) {
    messageElement.textContent = text;
    messageElement.style.color = color;
    messageElement.style.display = 'block';

    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.display = 'none';
    }, 3000);
}

function renderCoffees() {
    coffeesList.innerHTML = '';

    if (coffees.length === 0) {
        coffeesList.innerHTML = '<p class="empty-list-text">Позицій у меню поки немає. Додайте першу!</p>';
        return;
    }

    coffees.forEach((coffee) => {
        const li = document.createElement('li');
        li.className = 'order-item coffee-item';

        const span = document.createElement('span');
        span.className = 'coffee-text';
        span.textContent = coffee.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete delete-button';
        deleteBtn.textContent = 'Видалити';

        deleteBtn.addEventListener('click', async () => {
            coffees = coffees.filter((item) => item.id !== coffee.id);
            renderCoffees();
            await window.coffeeAPI.saveCoffees(coffees);
            showMessage('Позицію видалено з меню.', '#d32f2f');
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        coffeesList.appendChild(li);
    });
}

async function addCoffee() {
    const text = coffeeInput.value.trim();

    if (!text) {
        showMessage('Будь ласка, введіть назву напою чи десерту.', '#d32f2f');
        return;
    }

    const newCoffee = {
        id: Date.now(),
        text: text,
    };

    coffees.push(newCoffee);
    coffeeInput.value = '';
    renderCoffees();

    await window.coffeeAPI.saveCoffees(coffees);
    showMessage('Позицію успішно додано до меню!', '#2e7d32');
}

addCoffeeButton.addEventListener('click', addCoffee);

coffeeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addCoffee();
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        coffees = await window.coffeeAPI.loadCoffees();
        renderCoffees();
    } catch (error) {
        console.error('Помилка завантаження меню:', error);
        coffees = [];
        renderCoffees();
    }
});

