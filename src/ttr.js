import "./styles/index.scss";
import { TTR } from './js/Game'
import Word from './js/Word'

// const canvas = document.getElementById('ttr-game');
// new TTR(canvas);

// new TTR();

document.addEventListener('DOMContentLoaded', () => {
  let container = document.getElementById('ttr-game')
  let bounding = container.getBoundingClientRect();
  let width = container.offsetWidth;
  let height = container.offsetTop;
  let level = 1;
  let heart = 5;
  let score = 0;
  let speed = 30;
  let words = [];
  let interval = 1000;

  function startGame() {

  }

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
      ele.parentNode.removeChild(ele)
      score += 10;
      debugger
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
    }
  }, 1000)


  // function loop() {
  //   for (let i = 0; i < words.length; i++) {
  //     words[i].dropWord();
  //   }
  // }
  // requestAnimationFrame(loop);


  function populateWords() {

  }

  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }
  // loop();
})


