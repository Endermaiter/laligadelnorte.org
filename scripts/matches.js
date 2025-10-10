import * as utils from "./utils.js";

window.navigate = function (index) {
  const slider = document.querySelector('.container-matches').getElementsByClassName("match-section");
  console.log(slider.length)
  for (let i = 0; i < slider.length; i++) {
    if (i == index) {

    }
  }
}

window.flipCard = function (cardElement) {
  const inner = cardElement.querySelector('.card-inner');
  inner.classList.toggle('flipped');
  const isFlipped = inner.classList.contains('flipped');
  console.log('isFlipped:', isFlipped);

  if (isFlipped) {
    console.log("Hola");
    utils.generateConffeti(
      4000, // duration: 4 segundos
      0,    // delay
      150,  // interval entre ráfagas
      15,   // startVelocity: partículas no muy rápidas
      60,   // spread: arco moderado
      120,  // ticks: duración de cada partícula
      1000, // zIndex
      12,   // particleCount por ráfaga
      ['#FFC1CC', '#FFECB3', '#B2DFDB', '#AEDFF7', '#E1BEE7'], // colores pastel
    );
  }
}