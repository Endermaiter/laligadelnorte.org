function navigate(index) {
    const slider = document.querySelector('.container-matches').getElementsByClassName("match-section"); // Aseguramos que selecciona el contenedor correcto
    console.log(slider.length)
    for (let i=0;i < slider.length; i++){
        if (i==index){
            
        }
    }
}

function flipCard(cardElement, isFinal = false) {
      const inner = cardElement.querySelector('.card-inner');
      const isFlipped = inner.classList.contains('flipped');
      inner.classList.toggle('flipped');

      if (!isFlipped && isFinal) {
        setTimeout(() => {
          const duration = 3000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            confetti({
              ...defaults,
              particleCount: 60,
              origin: { x: Math.random(), y: Math.random() * 0.6 }
            });
          }, 150);
        }, 300);
      }
    }