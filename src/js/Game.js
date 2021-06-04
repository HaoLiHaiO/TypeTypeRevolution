import Word from './Word';

export class TTR {
  constructor() {
    this.container = document.getElementById('ttr-game')
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetTop;
    this.level = 1;
    this.heart = 5;
    this.score = 0;
    this.words = [];
    this.interval = 1000;
    this.spawn();
    this.drop();
  }

  spawn() {
    let word = new Word();
    this.words.push(word);

    if (this.words.length == 5) {
      cancelAnimationFrame(this.spawn);
    }

    if (this.words.length < this.level * 3) {
      requestAnimationFrame(this.spawn).bind(this)
    }
  }


  drop() {
    for (let i = 0; i < this.words.length; i++) {
      this.words[i].dropWord();
      if (this.words[i].y > this.height - 30) {
        let ele = document.getElementById(this.words[i].word);
        ele.parentNode.removeChild(ele);
        words.splice(i, 1);
        heart -= 1;
        document.getElementById('heart').innerHTML = displayHeart(heart);
      }
    }
    if (heart == 0) {
      cancelAnimationFrame(this.drop)
    }
    requestAnimationFrame(this.drop)
  }



  displayHeart(heart) {
    let res = "<strong>"
    for (let i = 0; i < this.heart; i++) {
      res += "💜"
    }
    return res += "</strong>"
  }

  handleEnterDown() {
    document.getElementById('typing-input').addEventListener('keypress', function (e) {
      let inputVal = document.getElementById('typing-input').value;
      let ele = document.getElementById(inputVal);
      if (e.key === 'Enter' && ele) {
        console.log(ele)
        ele.parentNode.removeChild(ele);
        words = words.filter(el => el.word != ele.id)
        if (ele.style.color == 'red' && words.length > 2) {
          words[Math.floor(Math.random() * words.length)].speed + 150;
        }
        if (ele.style.color == 'blue' && words.length > 2) {
          words[Math.floor(Math.random() * words.length)].speed - 50;
        }
        if (ele.style.color == 'green' && words.length > 2) {
          heart += 1;
          document.getElementById('heart').innerHTML = displayHeart(heart);
        }
        if (ele.style.color == 'purple' && words.length > 2) {
          words[Math.floor(Math.random() * words.length)].speed = 0;
        }
        score += 100;
        document.getElementById('score').innerHTML = score;
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
    this.level = 1;
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