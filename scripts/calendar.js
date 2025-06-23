// calendar.js

document.addEventListener('DOMContentLoaded', () => {

  // Para cada fila de mes (mes + tarjetas)
  const monthRows = document.querySelectorAll('.calendar-month-row');

  monthRows.forEach(row => {
    const weeks = row.querySelectorAll('.week');
    const matchContainer = row.querySelector('.match-card-container');

    // Crear o mostrar mensaje "Selecciona una semana"
    function showNoSelectionMessage() {
      // Ocultar todas las tarjetas dentro de este matchContainer
      const allCards = matchContainer.querySelectorAll('.match-card');
      allCards.forEach(card => card.style.display = 'none');

      let message = matchContainer.querySelector('#no-selection-message');
      if (!message) {
        message = document.createElement('p');
        message.id = 'no-selection-message';
        message.textContent = 'Selecciona una semana';
        message.style.textAlign = 'center';
        message.style.color = '#666';
        message.style.margin = '20px 0';

        matchContainer.appendChild(message);
      }
      message.style.display = 'block';
    }

    // Mostrar mensaje al cargar la página para cada mes
    showNoSelectionMessage();

    // Evento mouseenter para cada semana dentro de ese mes
    weeks.forEach(week => {
      week.addEventListener('mouseenter', () => {
        const weekId = week.dataset.week;

        // Ocultar mensaje si está visible
        const message = matchContainer.querySelector('#no-selection-message');
        if (message) message.style.display = 'none';

        // Ocultar todas las tarjetas en este matchContainer
        const allCards = matchContainer.querySelectorAll('.match-card');
        allCards.forEach(card => card.style.display = 'none');

        // Mostrar tarjeta correspondiente a la semana dentro de este mes
        const target = matchContainer.querySelector('#week-' + weekId);
        if (target) target.style.display = 'flex';
      });
    });

    // Evento mouseleave del conjunto mes+tarjetas para mostrar mensaje
    row.addEventListener('mouseleave', () => {
      showNoSelectionMessage();
    });

  });

});
