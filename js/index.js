// Tạo hiệu ứng lá rơi
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    
    // Tạo 15 lá rơi ngẫu nhiên
    for (let i = 0; i < 15; i++) {
        createFallingLeaf(heroSection);
    }
});

function createFallingLeaf(container) {
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';
    
    // Kích thước và vị trí ngẫu nhiên
    const size = Math.random() * 20 + 10;
    const startPosX = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    // Màu sắc lá
    const colors = ['#A8DF8E', '#8ECDDD', '#F1C93B'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    Object.assign(leaf.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${startPosX}%`,
        top: `-${size}px`,
        backgroundColor: randomColor,
        animation: `fall ${animationDuration}s ${delay}s linear infinite`,
        transform: `rotate(${Math.random() * 360}deg)`,
        opacity: 0.7
    });
    
    container.appendChild(leaf);
}