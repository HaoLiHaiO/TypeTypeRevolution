import Word from './Word';

let randomWords = require('random-words');
let container = document.getElementById('ttr-game')
let bounding = container.getBoundingClientRect();
console.log(bounding);

export default class TTR {
  constructor() {
    this.width = container.offsetWidth;
    this.height = container.offsetTop;
    this.level = 1;
    this.heart = 5;
    this.score = 0;
    this.words = [];
    this.speed = 30;
    this.startGame();
    this.handleEnterDown();
    this.handleEnterDown = this.handleEnterDown.bind(this);
  }

  startGame() {
    // setInterval(this.generateWords(), 1000);
    this.generateWords()
  }

  generateWords() {
    const { width, height, words } = this;
    let word = new Word(width, height);

    let newEle = document.createElement("h1");
    newEle.setAttribute('id', word.word);
    newEle.style.left = Math.floor(Math.random() * 90) + 1 + '%';
    newEle.style.position = 'absolute';
    newEle.style.color = word.color;
    newEle.appendChild(document.createTextNode(word.word));
    container.append(newEle);
    words.push(word.word);
    this.dropWord(newEle, word)
  }

  dropWord(newEle) {
    newEle.style.top += this.speed + 'px';
  }

  handleEnterDown() {
    document.getElementById('typing-input').addEventListener('keypress', function (e) {
      let inputVal = document.getElementById('typing-input').value;
      let ele = document.getElementById(inputVal);

      if (e.key === 'Enter' && ele) {
        console.log(ele)
        ele.parentNode.removeChild(ele)
      }
      if (e.key === 'Enter') {
        document.getElementById('typing-input').value = '';
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