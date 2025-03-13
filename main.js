const target = {
  head: { x: 250, y: 90, radius: 20 },
  torso: { x1: 250, y1: 110, x2: 250, y2: 180 },
  left_hand: { x1: 250, y1: 130, x2: 200, y2: 160 }, 
  right_hand: { x1: 250, y1: 130, x2: 300, y2: 160 },
  left_leg: { x1: 250, y1: 180, x2: 220, y2: 250 },
  right_leg: { x1: 250, y1: 180, x2: 280, y2: 250 }, 
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let size = 200;
let population = new Population(size, target);
let isEvolving = false;
let animationId = null;

drawStickman(target);

function drawStickman(stickman) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw head as a circle
  ctx.beginPath();
  ctx.arc(
    stickman.head.x,
    stickman.head.y,
    stickman.head.radius,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw edges (torso, hands, legs)
  Object.entries(stickman).forEach(([key, part]) => {
    if (key !== "head") {
      ctx.beginPath();
      ctx.moveTo(part.x1, part.y1);
      ctx.lineTo(part.x2, part.y2);
      ctx.stroke();
    }
  });
}

let generation = 0;
function drawEvolution(population) {
  population.calcFitness();
  population.naturalSelection();
  population.newGeneration();

  // Find the fittest individual
  let bestStickman = population.population.reduce((best, current) => {
    return current.fitnessValue > best.fitnessValue ? current : best;
  });

  drawStickman(bestStickman.stickman);
}

function animate() {
  if (!isEvolving) return;

  drawEvolution(population);
  animationId = requestAnimationFrame(animate);
}

// Event Listeners
startBtn.addEventListener("click", () => {
  isEvolving = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  animate();
});

stopBtn.addEventListener("click", () => {
  isEvolving = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
