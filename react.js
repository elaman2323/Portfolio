let cart = [];

function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const clearCartButton = document.getElementById('clearCart');

    cartItemsList.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Очуруу';
        removeButton.onclick = () => removeFromCart(index);
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.onchange = (e) => updateQuantity(index, parseInt(e.target.value));
        listItem.appendChild(quantityInput);
        listItem.appendChild(removeButton);
        cartItemsList.appendChild(listItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Жалпы Баа: $${total}`;

    clearCartButton.style.display = cart.length > 0 ? 'inline-block' : 'none';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateQuantity(index, quantity) {
    if (quantity < 1) {
        return; // минимальное количество 1
    }
    cart[index].quantity = quantity;
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}
