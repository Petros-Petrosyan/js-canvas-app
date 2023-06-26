const CANVAS = document.querySelector("canvas");
const BUTTON = document.querySelector("button");
const CONTEXT = CANVAS.getContext("2d");

const data = {
  balls: [],
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const update = () => {
  data.balls.forEach((ball) => {
    ball.update();
  });
};

const draw = () => {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  data.balls.forEach((ball) => {
    ball.draw();
  });
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
  draw();
};

loop();

function Ball() {
  const radius = getRandomNumber(5, 40);
  let x = getRandomNumber(radius, CANVAS.width - radius);
  let y = getRandomNumber(radius, CANVAS.height - radius);

  let xDelta = getRandomNumber(-5, 5);
  let yDelta = getRandomNumber(-5, 5);
  const color = `rgb(${getRandomNumber(0, 255)},${getRandomNumber(
    0,
    255
  )},${getRandomNumber(0, 255)})`;

  this.update = function () {
    if (x + radius > CANVAS.width || x - radius < 0) {
      xDelta *= -1;
    }
    if (y + radius > CANVAS.height || y - radius < 0) {
      yDelta *= -1;
    }

    x += xDelta;
    y += yDelta;
  };

  this.draw = function () {
    CONTEXT.fillStyle = color;
    CONTEXT.beginPath();
    CONTEXT.arc(x, y, radius, 0, 2 * Math.PI);
    CONTEXT.fill();
  };
}

BUTTON.addEventListener("click", function () {
  const ball = new Ball();
  data.balls.push(ball);
});
