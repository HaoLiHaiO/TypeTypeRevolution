import "./styles/index.scss";
import { TTR } from './js/Game'
import Word from './js/Word'

document.addEventListener('DOMContentLoaded', () => {
  let container = document.getElementById('ttr-game')
  let height = container.offsetHeight;
  let level = 1;
  let heart = 5;
  let score = 0;
  let words = [];
  let spawned = [];
  let spawnId;
  let dropId;

  function displaySLH() {
    document.getElementById('score').innerHTML = score;
    document.getElementById('go-score').innerHTML = score;
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


  document.getElementById('btn-play').addEventListener("click", (e) => playClick(e))
  document.getElementById('btn-replay').addEventListener("click", (e) => playClick(e))
  document.getElementById('btn-submit').addEventListener('click', e => saveScore(e))
  let saveBtn = document.getElementById('btn-submit')
  let nickname = document.getElementById('nickname')
  nickname.addEventListener('keyup', () => { saveBtn.disabled = !nickname.value })

  function playClick(e) {
    e.preventDefault();
    e.stopPropagation();
    gameStart();
  }

  function gameStart() {
    resetGame();
    displaySLH();

    let modal = document.querySelector('.modal');
    modal.classList.add('hide')
    let gomodal = document.querySelector('.gameover-modal');
    gomodal.classList.add('hide')
    spawnId = setInterval(spawn, 1500)
    dropId = setInterval(drop, 1000 / 60)
  }

  function resetGame() {
    level = 1;
    heart = 5;
    score = 0;
    words = [];
    spawned = [];
    // let scoreDiv = document.getElementById('score');
    // removeAllChildren(scoreDiv)
  }

  function gameOver() {
    clearInterval(spawnId);
    clearInterval(dropId);
    removeAllChildren(container)
    localStorage.setItem("Score", score)
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
        words[Math.floor(Math.random() * words.length)].speed + 1.5;
      }
      if (ele.style.color == 'yellow' && words.length > 2) {
        words[Math.floor(Math.random() * words.length)].speed - 1;
      }
      if (ele.style.color == 'lime' && words.length > 2) {
        heart += 1;
        displaySLH();
      }
      if (ele.style.color == 'cayan' && words.length > 2) {
        words[Math.floor(Math.random() * words.length)].speed = 0;
      }
      if (ele.style.color == 'magenta' && words.length > 2) {
        heart -= 1;
        displaySLH();
      }
      score += 100;
      displaySLH();
      debugger
      if (heart > 0 && allSpawned() && words.length == 0) {
        debugger
        level += 1;
        spawned = []
        displaySLH()
        spawnId = setInterval(spawn.bind(this), 1000)
      }
      if (heart == 0) {
        clearInterval(spawnId)
      }
    }
    if (e.key === 'Enter') {
      document.getElementById('typing-input').value = '';
    }
  });


  function spawn() {
    if (heart != 0) {
      let word = new Word(level);
      spawned.push(word.word);
      console.log(spawned);
      words.push(word);
    }
    if (spawned.length == level + 5) {
      console.log('all spawned')
      clearInterval(spawnId);
    }
    if (heart == 0) {
      console.log('gameover')
      gameOver();
      clearInterval(spawnId);
      clearInterval(dropId);
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
      // if (container.childElementCount == 0 && allSpawned() && heart > 0) {
      //   
      //   level += 1;
      //   document.getElementById('level').innerHTML = level;
      //   spawned = []
      //   spawnId = setInterval(spawn, 1000)
      //   if (heart == 0) {
      //     clearInterval(spawnId)
      //     clearInterval(dropId)
      //     gameOver();
      //   }
      // }
      if (heart == 0) {
        clearInterval(dropId)
        clearInterval(spawnId);
        gameOver();
      }
    }
    if (container.childElementCount == 0 && allSpawned() && heart > 0) {

      level += 1;
      document.getElementById('level').innerHTML = level;
      spawned = []
      spawnId = setInterval(spawn, 1000)
      if (heart == 0) {
        clearInterval(spawnId)
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

  function saveScore(e) {
    console.log('save button clicked')
    e.preventDefault();
    e.stopPropagation()
  }

  function allSpawned() {
    return spawned.length == level + 5 ? true : false
  }

})

