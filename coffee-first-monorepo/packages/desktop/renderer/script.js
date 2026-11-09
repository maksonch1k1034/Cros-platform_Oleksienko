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
    try {
        const query = searchInput ? searchInput.value : '';
        const items = await window.notesAPI.list(query);

        coffeeList.innerHTML = '';

        if (!items || items.length === 0) {
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
            contentSpan.textContent = item.text || '';

            const dateSpan = document.createElement('span');
            dateSpan.className = 'coffee-date';
            dateSpan.textContent = item.dateLabel || '';

            infoDiv.appendChild(contentSpan);
            infoDiv.appendChild(dateSpan);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = 'Видалити';
            deleteBtn.onclick = async () => {
                await window.notesAPI.remove(item.id);
                showMessage('Позицію успішно видалено.', false);
                await render();
            };

            li.appendChild(infoDiv);
            li.appendChild(deleteBtn);
            coffeeList.appendChild(li);
        });
    } catch (err) {
        console.error('Render error:', err);
    }
}

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();

    const text = coffeeInput.value;
    const res = await window.notesAPI.add(text);

    if (!res || !res.ok) {
        showMessage(res ? res.error : 'Помилка додавання', false);
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