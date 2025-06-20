
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.news-card');
        card.classList.toggle('expanded');
        btn.textContent = card.classList.contains('expanded') ? 'Leer menos ←' : 'Leer más →';
    });
});
