import Word from './Word';

let randomWords = require('random-words');
let container = document.getElementById('ttr-game')
// console.log(container)
export default class TTR {
  constructor() {
    this.width = container.offsetWidth;
    this.height = container.offsetTop;
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

    let newEle = document.createElement("h2")
    newEle.style.left = Math.floor(Math.random() * 90) + 1 + '%';
    newEle.style.position = 'absolute';
    newEle.appendChild(document.createTextNode(word.word));
    container.append(newEle);
    words.push(word.word);

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