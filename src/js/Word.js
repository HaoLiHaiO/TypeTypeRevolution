let randomWords = require('random-words');
let container = document.getElementById('ttr-game');

export default class Word {
  constructor(n) {
    this.word = randomWords();
    this.y = 0;
    this.speed = random(n);
    this.interval = 1500;

    this.newEle = document.createElement("h1");
    this.newEle.setAttribute('id', this.word);
    this.newEle.style.left = Math.floor(Math.random() * 90) + 1 + '%';
    this.newEle.style.position = 'absolute';
    this.newEle.style.top = 0;
    this.newEle.appendChild(document.createTextNode(this.word));
    container.append(this.newEle);

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
    this.newEle.style.color = this.color;
  }

  dropWord() {
    // let regex = /[^0-9]/g;
    // let res = this.newEle.style.top.replace(regex, "");
    let res = parseInt(this.newEle.style.top)
    res += this.speed;

    this.y = res;
    this.newEle.style.top = res + 'px';
  }

}

function random(n) {
  // const num = Math.floor(Math.random() * (max - min + 1)) + min;
  const num = (Math.random() * n + n)


  return num;
}

