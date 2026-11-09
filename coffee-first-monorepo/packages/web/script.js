import { CoffeeService, formatCoffeeDate } from '@coffee-first/core';
import { LocalStorageAdapter } from './localStorageAdapter.js';

const adapter = new LocalStorageAdapter();
const service = new CoffeeService(adapter);

const addForm = document.getElementById('add-form');
const coffeeInput = document.getElementById('coffee-input');
const searchInput = document.getElementById('search-input');
const coffeeList = document.getElementById('coffee-list');
const statusMessage = document.getElementById('status-message');

function showMessage(text, isSuccess = true) {
    statusMessage.textContent = text;
    statusMessage.className = `status-message ${isSuccess ? 'success' : 'error'}`;
}

function clearMessage() {
    statusMessage.textContent = '';
    statusMessage.className = 'status-message';
}

async function render() {
    const query = searchInput.value;
    const items = await service.list(query);

    coffeeList.innerHTML = '';

    if (items.length === 0) {
        const li = document.createElement('li');
        li.className = 'empty-item';
        li.textContent = 'Позицій не знайдено';
        coffeeList.appendChild(li);
        return;
    }

    items.forEach(item => {
        const li = document.createElement('li');

        const infoDiv = document.createElement('div');
        infoDiv.className = 'coffee-info';

        const contentSpan = document.createElement('span');
        contentSpan.className = 'coffee-content';
        contentSpan.textContent = item.text;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'coffee-date';
        dateSpan.textContent = formatCoffeeDate(item.createdAt);

        infoDiv.appendChild(contentSpan);
        infoDiv.appendChild(dateSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Видалити';
        deleteBtn.onclick = async () => {
            await service.remove(item.id);
            showMessage('Позицію успішно видалено.', false);
            await render();
        };

        li.appendChild(infoDiv);
        li.appendChild(deleteBtn);
        coffeeList.appendChild(li);
    });
}

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();

    const text = coffeeInput.value;
    const res = await service.add(text);

    if (!res.ok) {
        showMessage(res.error, false);
        return;
    }

    coffeeInput.value = '';
    showMessage('Позицію успішно додано.', true);
    await render();
});

searchInput.addEventListener('input', () => {
    render();
});

render();