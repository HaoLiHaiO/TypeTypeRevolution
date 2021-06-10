let randomWords = require('random-words');
let container = document.getElementById('ttr-game');

export default class Word {
  constructor(n) {
    this.word = this.ranWordExceptScore();
    this.y = 0;
    this.speed = random(n);
    this.interval = 1500;

    this.newEle = document.createElement("h1");
    this.newEle.setAttribute('id', this.word);
    this.newEle.style.left = Math.floor(Math.random() * 90) + 1 + '%';
    this.newEle.style.position = 'absolute';
    this.newEle.style.top = 0;
    this.newEle.style.fontSize = 'larger';
    this.newEle.style.fontFamily = 'Marvel';
    this.newEle.appendChild(document.createTextNode(this.word));
    container.append(this.newEle);

    let ran = Math.random();
    if (ran > 0.50) {
      this.color = 'white'
    } else if (0.40 < ran && ran < 0.50) {
      this.color = 'yellow'
    } else if (0.30 < ran && ran < 0.40) {
      this.color = 'cyan'
    } else if (0.20 < ran && ran < 0.30) {
      this.color = 'red'
    } else if (0.10 < ran && ran < 0.20) {
      this.color = 'lime'
    } else {
      this.color = 'margenta'
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

  ranWordExceptScore() {
    let word = randomWords();
    while (word == 'score') {
      word = randomWords();
    }
    return word
  }

}

function random(n) {
  let num;
  if (n == 1) {
    num = (Math.random() + n)
  }
  else {
    num = (Math.random() + (n / 2))
  }
  return num;
}

