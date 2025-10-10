export async function loadJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Error HTTP ${response.status} al cargar ${path}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error cargando JSON:", error);
        return null;
    }
}

export function generateConffeti(duration, delay, interval, startVelocity, spread, ticks, zIndex, particleCount, colors) {

    setTimeout(() => {
          const animationEnd = Date.now() + duration;

          const funcInterval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(funcInterval);

            confetti({
              startVelocity: startVelocity + Math.random() * 30,
              spread: spread,
              ticks: ticks,
              zIndex: zIndex,
              particleCount: particleCount,
              origin: { x: Math.random(), y: Math.random() * 0.6 },
              colors: colors,
              shapes: ['circle','square','triangle','star'],
              gravity: 0.3 + Math.random() * 0.3
            });
          }, interval);
        }, delay);

}