const emptyMessage = document.querySelector('.empty-message');
const cartSummary = document.querySelector('.cart-summary');
const totalQuantity = document.getElementById('quantity');
const totalCost = document.getElementById('cost');
const root = document.getElementById('root');

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

renderCart();

root.addEventListener('click', (e) => {
    const target = e.target;
    const currentCard = target.closest('.cart-item');
    const currentName = currentCard.querySelector('.cart-item__name').innerText;
    const currentItem = cartItems.find(item => item.name === currentName);
    if (target.classList.contains('fa-plus'))
        currentItem.quantity++;
    if (target.classList.contains('fa-minus'))
        if (currentItem.quantity > 1)
            currentItem.quantity--;
    if (target.classList.contains('fa-trash')) {
        if (confirm(`Xác nhận xóa ${currentName} khỏi giỏ hàng?`))
            cartItems = cartItems.filter(item => item.name !== currentName);
        else
            return;
    }
    updateCard();
    renderCart();
})

function updateCard() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function renderCart() {
    let quantity = 0;
    let cost = 0;
    root.innerHTML = '';
    cartItems.forEach(item => {
        quantity += item.quantity;
        cost += item.price * item.quantity;
        totalQuantity.innerText = quantity;
        totalCost.innerText = cost.toLocaleString('vi-VN') + ' đ';
        const itemElement = createCartItemElement(item);
        root.insertAdjacentHTML('beforeend', itemElement);
    })
    if (cartItems.length === 0) {
        emptyMessage.style.display = 'block';
        cartSummary.style.display = 'none';
    }
    else {
        emptyMessage.style.display = 'none';
        cartSummary.style.display = 'flex';
    }
}

function createCartItemElement(item) {
    return `
        <div class="cart-item">
            <div class="cart-item__img">
                <img src="${item.imgSrc}">
            </div>
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__price">${item.price.toLocaleString('vi-VN')} đ</div>
            <div class="cart-item__quantity">
                <i class="fa-solid fa-minus"></i>
                <span>${item.quantity}</span>
                <i class="fa-solid fa-plus"></i>
            </div>
            <div class="cart-item__remove-btn">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>
    `
}