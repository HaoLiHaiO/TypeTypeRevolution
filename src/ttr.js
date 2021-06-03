import "./styles/index.scss";
import { TTR } from './js/Game'
import Word from './js/Word'


document.addEventListener('DOMContentLoaded', () => {
  let container = document.getElementById('ttr-game')
  let bounding = container.getBoundingClientRect();
  let width = container.width;
  let height = container.offsetHeight;
  let level = 1;
  let heart = 5;
  let score = 0;
  let speed = 30;
  let words = [];
  let interval = 1000;

  document.getElementById('score').innerHTML = score;
  document.getElementById('heart').innerHTML = displayHeart(heart);

  function displayHeart(heart) {
    let res = "<strong>"
    for (let i = 0; i < heart; i++) {
      res += "💜"
    }
    return res += "</strong>"
  }


  document.getElementById('typing-input').addEventListener('keypress', function (e) {
    let inputVal = document.getElementById('typing-input').value;
    let ele = document.getElementById(inputVal);
    if (e.key === 'Enter' && ele) {
      console.log(ele)
      ele.parentNode.removeChild(ele);
      words = words.filter(el => el.word != ele.id)
      if (ele.style.color == 'red') {
        words[Math.floor(Math.random() * words.length)].speed + 150;
      }
      if (ele.style.color == 'blue') {
        words[Math.floor(Math.random() * words.length)].speed - 50;
      }
      if (ele.style.color == 'green') {
        heart += 1;
        document.getElementById('heart').innerHTML = displayHeart(heart);
      }
      if (ele.style.color == 'purple') {
        words[Math.floor(Math.random() * words.length)].speed = 0;
      }
      score += 10;
      document.getElementById('score').innerHTML = score;
    }
    if (e.key === 'Enter') {
      document.getElementById('typing-input').value = '';
    }

  });


  let spawn = setInterval(function () {
    let word = new Word();
    words.push(word);

    if (words.length == 5) {
      clearInterval(spawn);
    }
  }, 1000)

  let drop = setInterval(function () {
    for (let i = 0; i < words.length; i++) {
      words[i].dropWord();
      if (words[i].y > height - 20) {
        debugger
        let ele = document.getElementById(words[i].word);
        ele.parentNode.removeChild(ele);
        words.splice(i, 1);
        heart -= 1;
        document.getElementById('heart').innerHTML = displayHeart(heart);
      }
    }
    if (heart == 0) {
      clearInterval(drop)
    }
  }.bind(this), 1000)


  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }
})


