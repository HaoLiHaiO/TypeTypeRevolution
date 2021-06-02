let randomWords = require('random-words');

export default class Word {
  constructor(width, height) {
    this.x = Math.random() * (width - 20);
    this.y = height;
    this.speed = 30;
    this.interval = 1500;
    this.word = randomWords();
    let ran = Math.random();
    if (ran > 0.50) {
      this.color = 'black'
    } else if (0.40 < ran && ran < 0.50) {
      this.color = 'blue'
    } else if (0.30 < ran && ran < 0.40) {
      this.color = 'purple'
    } else if (0.20 < ran && ran < 0.30) {
      this.color = 'red'
    } else if (0.10 < ran && ran < 0.20) {
      this.color = 'green'
    } else {
      this.color = 'pink'
    }
  }

  drawWord(ctx) {
    const { x, y, color } = this;
    let scale = window.devicePixelRatio;
    ctx.scale(scale, scale);
    ctx.font = '5px Arial';
    ctx.fillStyle = color;
    ctx.fillText(this.word, x, y)
  }

  dropWord() {
    this.y += this.speed;
  }
}

