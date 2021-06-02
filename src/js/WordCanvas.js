let randomWords = require('random-words');

export default class Word {
  constructor(width, height) {
    this.x = Math.random() * (width - 20) + 5;
    this.y = 20;
    this.interval = 1500;
    this.speed = 0.5;
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

    ctx.font = '10 Arial';
    ctx.fillStyle = color;
    ctx.fillText(this.word, x / 2, y / 2)
  }

  dropWord() {
    this.y += this.speed;
  }
}

