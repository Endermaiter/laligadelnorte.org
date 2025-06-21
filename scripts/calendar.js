const weeks = document.querySelectorAll('.week');
  const allCards = document.querySelectorAll('.match-card');

  weeks.forEach(week => {
    week.addEventListener('mouseenter', () => {
      const weekId = week.dataset.week;

      allCards.forEach(card => {
        card.style.display = 'none';
      });

      const target = document.getElementById('week-' + weekId);
      if (target) target.style.display = 'flex';
    });
  });

  // Opción: ocultar si sales del calendario
  document.querySelector('.calendar-month').addEventListener('mouseleave', () => {
    allCards.forEach(card => card.style.display = 'none');
  });