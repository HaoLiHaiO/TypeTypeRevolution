import Word from './Word';

let container = document.getElementById('ttr-game')
let bounding = container.getBoundingClientRect();
let starttime;
console.log(bounding);

export class TTR {
  constructor() {
    this.container = document.getElementById('ttr-game')
    this.bounding = container.getBoundingClientRect();
    this.width = container.offsetWidth;
    this.height = container.offsetTop;
    this.level = 1;
    this.heart = 5;
    this.score = 0;
    this.speed = 30;
    this.words = [];
    this.interval = 1000;
  }

  startGame() {
    document.getElementById('score').innerHTML = this.score;
    document.getElementById('heart').innerHTML = this.displayHeart(heart);
    this.generateWords()
    // requestAnimationFrame(this.startGame.bind(this))
    // setInterval(this.generateWords.bind(this), 1000)
  }

  displayHeart(heart) {
    let res = "<strong>"
    for (let i = 0; i < this.heart; i++) {
      res += "💜"
    }
    return res += "</strong>"
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
    // this.dropWord(newEle)

    function drop(timestamp, ele, dist, duration) {
      //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
      var timestamp = timestamp || new Date().getTime()
      var runtime = timestamp - starttime
      var progress = runtime / duration
      progress = Math.min(progress, 1)
      ele.style.top = (dist * progress).toFixed(2) + 'px'
      if (runtime < duration) { // if duration not met yet
        requestAnimationFrame(function (timestamp) { // call requestAnimationFrame again with parameters
          this.drop(timestamp, ele, height, duration)
        })
      }
    }


    requestAnimationFrame(function (t) {
      starttime = t || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
      this.drop(t, newEle, height, 2000) // 400px over 1 second
    })
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
        this.score += 10;
        /*if ele.col = red => speed++
        if ele.col = purple => pause
        if ele.col = green => heart++
        if ele.col = blue => speed--
        */
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


/*
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
*/