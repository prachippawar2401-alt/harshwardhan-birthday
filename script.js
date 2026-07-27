// Add wish to the list
function addWish() {
    const wishInput = document.getElementById('wishInput');
    const wishText = wishInput.value.trim();

    if (wishText === '') {
        alert('Please write a wish!');
        return;
    }

    // Create wish item
    const wishItem = document.createElement('div');
    wishItem.className = 'wish-item';
    wishItem.textContent = wishText + ' 💌';
    wishItem.style.animation = 'slideInWish 0.6s ease-out';

    // Add to container
    const wishesContainer = document.getElementById('wishesContainer');
    wishesContainer.appendChild(wishItem);

    // Clear input
    wishInput.value = '';

    // Trigger confetti
    createConfetti();

    // Save to localStorage
    saveWish(wishText);
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#e74c3c', '#667eea', '#764ba2', '#ff6b6b', '#ffe66d', '#16a085'];

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.delay = Math.random() * 0.3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        confettiContainer.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Save wish to localStorage
function saveWish(wish) {
    let wishes = JSON.parse(localStorage.getItem('birthday_wishes')) || [];
    wishes.push({
        text: wish,
        timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('birthday_wishes', JSON.stringify(wishes));
}

// Load wishes from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadWishes();
});

// Load wishes from localStorage
function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('birthday_wishes')) || [];
    const wishesContainer = document.getElementById('wishesContainer');

    wishes.forEach(wish => {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        wishItem.textContent = wish.text + ' 💌';
        wishesContainer.appendChild(wishItem);
    });
}

// Allow Enter key to add wish
document.addEventListener('DOMContentLoaded', () => {
    const wishInput = document.getElementById('wishInput');
    wishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addWish();
        }
    });
});