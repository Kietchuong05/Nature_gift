const orderDetails = document.getElementById('order-details');
const orderTotal = document.getElementById('order-total');
const confirmButton = document.getElementById('confirm-payment');

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

if (cartItems.length === 0) {
    orderDetails.innerHTML = '<p>Giỏ hàng trống.</p>';
    confirmButton.style.display = 'none';
} else {
    let totalCost = 0;
    cartItems.forEach(item => {
        totalCost += item.price * item.quantity;
        orderDetails.innerHTML += `
            <p>${item.name} - Số lượng: ${item.quantity} - Giá: ${item.price.toLocaleString('vi-VN')} đ</p>
        `;
    });
    orderTotal.innerText = totalCost.toLocaleString('vi-VN') + ' đ';
}

confirmButton.addEventListener('click', () => {
    alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
    localStorage.removeItem('cartItems');
    window.location.href = 'trangchu.html';
});
