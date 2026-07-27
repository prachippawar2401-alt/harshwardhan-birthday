// Add wish to the list
function addWish() {
    const wishInput = document.getElementById('wishInput');
    const wishText = wishInput.value.trim();

    if (wishText === '') {
        alert('Please write a wish!');
        return;
    }

    // Create wish card
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';
    wishCard.innerHTML = `<p class="wish-text">${escapeHtml(wishText)} 💌</p>`;

    // Add to container
    const wishesContainer = document.getElementById('wishesContainer');
    wishesContainer.appendChild(wishCard);

    // Clear input
    wishInput.value = '';

    // Trigger confetti
    createConfetti();

    // Save to localStorage
    saveWishToLocalStorage(wishText);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#c7ceea'];

    for (let i = 0; i < 30; i++) {
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
function saveWishToLocalStorage(wish) {
    let wishes = JSON.parse(localStorage.getItem('birthdays_wishes')) || [];
    wishes.push({
        text: wish,
        timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('birthdays_wishes', JSON.stringify(wishes));
}

// Load wishes from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadWishesFromLocalStorage();
    createInitialConfetti();
});

// Load wishes from localStorage
function loadWishesFromLocalStorage() {
    const wishes = JSON.parse(localStorage.getItem('birthdays_wishes')) || [];
    const wishesContainer = document.getElementById('wishesContainer');

    wishes.forEach(wish => {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.innerHTML = `<p class="wish-text">${escapeHtml(wish.text)} 💌</p>`;
        wishesContainer.appendChild(wishCard);
    });
}

// Create initial confetti on page load
function createInitialConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#c7ceea'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.delay = Math.random() * 1 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';

        confettiContainer.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 4000);
    }
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
