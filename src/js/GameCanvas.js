import Word from './WordCanvas';

let randomWords = require('random-words');

export default class TTR {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    window.devicePixelRatio = 2;
    this.width = canvas.width;
    this.height = canvas.height;
    this.level = 1;
    this.heart = 5;
    this.score = 0;
    this.words = [];
    this.speed = 0.05;
    this.startGame();
    this.handleEnterDown = this.handleEnterDown.bind(this);
  }

  startGame() {
    this.generateWords();
  }

  generateWords() {
    const { width, height, words, ctx } = this;
    let word = new Word(width, height);
    console.log(word);
    words.push(word.word);
    console.log(words);
    word.drawWord(ctx);
  }

  handleEnterDown(e) {
    document.getElementById('typing-input').addEventListener('keypress', function (e) {
      let inputVal = document.getElementById('typing-input').value;
      if (e.key === 'Enter' && this.words.includes(inputVal)) {

      }
    });
  }

  resetGame() {
    this.words = [];
    this.heart = 5;
    this.score = 0;
    this.speed = 0.5;
  }

  gameOver() {
    if (this.heart == 0) {
      return true
    }
  }
}