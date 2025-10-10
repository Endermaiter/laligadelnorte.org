import * as utils from "./utils.js";

utils.generateConffeti(
  8000, // duration: 8 segundos
  0,    // delay
  80,   // interval: cada 0.08s una nueva ráfaga
  20,   // startVelocity base (mezclaremos abajo)
  360,  // spread máximo para dispersión completa
  150,  // ticks: partículas duraderas
  9999, // zIndex
  200,  // particleCount por ráfaga
  ['#ff0000','#ff7f00','#ffff00','#00ff00','#0000ff','#4b0082','#8f00ff',
    '#ff1493','#00ffff','#ffa500','#7fff00','#ff69b4','#00ff7f','#9400d3'
  ] //colores
);