document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.btn-action');
    const input = document.querySelector('.input-field');
    const message = document.querySelector('.action-message');
    const orderList = document.getElementById('order-list');
    const emptyText = orderList.querySelector('.empty-list-text');

    function showMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
        message.style.display = 'block';
        setTimeout(function() {
            message.style.display = 'none';
        }, 3000);
    }

    function checkEmptyList() {
        if (orderList.querySelectorAll('.order-item').length === 0) {
            if (emptyText) emptyText.style.display = 'block';
        } else {
            if (emptyText) emptyText.style.display = 'none';
        }
    }

    function createOrderItem(orderText) {
        const newItem = document.createElement('div');
        newItem.className = 'order-item';

        const itemText = document.createElement('span');
        itemText.textContent = orderText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Видалити';

        deleteBtn.addEventListener('click', function() {
            newItem.remove();
            checkEmptyList();
        });

        newItem.appendChild(itemText);
        newItem.appendChild(deleteBtn);

        return newItem;
    }

    button.addEventListener('click', function() {
        const text = input.value.trim();

        if (text !== '') {
            const newOrderElement = createOrderItem(text);

            orderList.appendChild(newOrderElement);

            checkEmptyList();
            showMessage('Додано до кошика!', '#2e7d32');

            input.value = '';
        } else {
            showMessage('Будь ласка, введіть назву напою.', '#d32f2f');
        }
    });
});