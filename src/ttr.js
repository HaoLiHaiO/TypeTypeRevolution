import "./styles/index.scss";
import { TTR } from './js/Game'
import Word from './js/Word'


document.addEventListener('DOMContentLoaded', () => {
  let container = document.getElementById('ttr-game')
  let bounding = container.getBoundingClientRect();
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  let level = 1;
  let heart = 5;
  let score = 0;
  let words = [];
  let spawnId;
  let dropId;

  function displaySLH() {
    document.getElementById('score').innerHTML = score;
    document.getElementById('level').innerHTML = level;
    document.getElementById('heart').innerHTML = displayHeart(heart);
  }

  function displayHeart(heart) {
    let res = "<strong>"
    for (let i = 0; i < heart; i++) {
      res += '<i class="fas fa-heart"></i>'
    }
    return res += "</strong>"
  }


  let btn = document.getElementById('btn-play');
  btn.addEventListener("click", playClick)
  let gobtn = document.getElementById('btn-replay');
  gobtn.addEventListener("click", playClick)

  function playClick(e) {
    e.preventDefault();
    e.stopPropagation();
    gameStart();
  }

  function gameStart() {
    resetGame()
    displaySLH()
    let modal = document.querySelector('.modal');
    modal.classList.add('hide')
    let gomodal = document.querySelector('.gameover-modal');
    gomodal.classList.add('hide')
    spawnId = setInterval(spawn, 1000)
    dropId = setInterval(drop, 1000)
  }

  function resetGame() {
    level = 1;
    heart = 5;
    score = 0;
    words = [];
    let scoreDiv = document.getElementById('score');
    removeAllChildren(scoreDiv)
  }

  function gameOver() {
    removeAllChildren(container)
    let scoreDiv = document.getElementById('score');
    let content = document.createElement('div');
    content.appendChild(document.createTextNode(score))
    let goModal = document.querySelector('.gameover-modal');
    goModal.classList.remove('hide')
  }

  document.getElementById('typing-input').addEventListener('keypress', function (e) {
    let inputVal = document.getElementById('typing-input').value;
    let ele = document.getElementById(inputVal);

    if (e.key === 'Enter' && ele) {
      ele.parentNode.removeChild(ele);
      words = words.filter(el => el.word != ele.id)
      if (ele.style.color == 'red' && words.length > 2) {
        words[Math.floor(Math.random() * words.length)].speed += 150;
      }
      if (ele.style.color == 'blue' && words.length > 2) {
        words[Math.floor(Math.random() * words.length)].speed -= 50;
      }
      if (ele.style.color == 'green' && words.length > 2) {
        heart += 1;
        displaySLH();
      }
      if (ele.style.color == 'purple' && words.length > 2) {
        words[Math.floor(Math.random() * words.length)].speed = 0;
      }
      score += 100;
      displaySLH();

      if (heart > 0 && words.length == 0) {
        level += 1;
        displaySLH()
        spawnId = setInterval(spawn.bind(this), 1000)
      }
    }
    if (e.key === 'Enter') {
      document.getElementById('typing-input').value = '';
    }
  });


  function spawn() {
    let word = new Word(level * 50, level * 100);
    words.push(word);
    if (words.length == level * 3) {
      clearInterval(spawnId);
    }
    if (heart == 0) {
      gameOver();
      clearInterval(spawnId);
    }
  }


  function drop() {
    let container = document.getElementById('ttr-game')
    for (let i = 0; i < words.length; i++) {
      words[i].dropWord();
      if (words[i].y > height - 30) {
        let ele = document.getElementById(words[i].word);
        ele.parentNode.removeChild(ele);
        words.splice(i, 1);
        heart -= 1;
        document.getElementById('heart').innerHTML = displayHeart(heart);
      }
      if (container.childElementCount == 0 && heart > 0) {
        level += 1;
        document.getElementById('level').innerHTML = level;
        spawnId = setInterval(spawn, 1000)
        if (heart == 0) {
          clearInterval(spawnId)
          gameOver();
        }
      }
      if (heart == 0) {
        clearInterval(dropId)
        gameOver();
      }
    }
  }

  function removeAllChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }
})


