const filterBtns = document.querySelectorAll('.section__type-item');
const productCards = document.querySelectorAll('.section__product-card');

const overlay = document.getElementById('overlay');

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

overlay.addEventListener('click', closeViewDetail);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnType = btn.getAttribute('type');
        filter(btnType);
    })
})

productCards.forEach(p => {
    p.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('section__view-detail')) {
            p.classList.add('active');
            overlay.style.display = 'block';
        }

        if (target.classList.contains('section__add-to-cart')) {
            const imgSrc = p.querySelector('img').src;
            const name = p.querySelector('.section__product-name').innerText;
            const price = p.querySelector('.section__product-price').innerText;
            const newCartItem = {
                imgSrc: imgSrc,
                name: name,
                price: parseInt(price.replace(/\D/g, ''), 10),
                quantity: 1
            }
            const existingItem = cartItems.find(
                item => item.name === newCartItem.name
            );
            if (existingItem)
                existingItem.quantity++
            else
                cartItems.unshift(newCartItem);

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            closeViewDetail();
            alert(`Đã thêm ${newCartItem.name} vào giỏ hàng!`)
        }
    })
})

function filter(type) {
    productCards.forEach(p => {
        if (type === 'all') {
            p.style.display = 'flex';
            return;
        }
        const productType = p.getAttribute('type');
        if (productType === type)
            p.style.display = 'flex';
        else
            p.style.display = 'none';
    })
}

function closeViewDetail() {
    productCards.forEach(p => p.classList.remove('active'));
    overlay.style.display = 'none';
}
