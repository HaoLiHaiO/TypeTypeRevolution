import "./styles/index.scss";
import Word from './js/Word'

document.addEventListener('DOMContentLoaded', () => {
  let container = document.getElementById('ttr-game')
  let height = container.offsetHeight;
  let finalScore = document.getElementById('go-score');
  let mostRecentScore = localStorage.getItem('mostRecentScore');
  let level = 1;
  let heart = 5;
  let score = 0;
  let words = [];
  let spawned = [];
  let spawnId;
  let dropId;
  let highScores = JSON.parse(localStorage.getItem("highScores")) || []

  const MAX_HIGH_SCORES = 10;

  function displaySLH() {
    document.getElementById('score').innerHTML = score;
    document.getElementById('level').innerHTML = level;
    document.getElementById('heart').innerHTML = displayHeart(heart);
    document.getElementById('highScoresList').innerHTML = displayScores();
  }

  function displayHeart(heart) {
    let res = "<strong>"
    for (let i = 0; i < heart; i++) {
      res += '<i class="fas fa-heart"></i>'
    }
    return res += "</strong>"
  }

  function displayScores() {
    return highScores.map((score, i) => {
      return `<li> ${i + 1}.  ${score.name} - ${score.score}</li>`
    }).join("")
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
    resetGame();
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
    document.getElementById('nickname').value = '';
    document.getElementById('nickname').disabled = false;
    document.getElementById('msg').innerHTML = '';
  }

  function gameOver() {
    clearInterval(spawnId);
    clearInterval(dropId);

    localStorage.setItem('mostRecentScore', score)
    document.getElementById('go-score').innerHTML = score;
    removeAllChildren(container)
    let goModal = document.querySelector('.gameover-modal');
    goModal.classList.remove('hide')

  }

  document.getElementById('typing-input').addEventListener('keypress', function (e) {
    let inputVal = document.getElementById('typing-input').value;
    let ele = document.getElementById(inputVal);
    if (e.key === 'Enter' && ele) {
      ele.parentNode.removeChild(ele);
      words = words.filter(el => el.word != ele.id)
      if (ele.style.color == 'red' && words.length > 1) {
        words[Math.floor(Math.random() * words.length)].speed + 3;
      }
      if (ele.style.color == 'yellow' && words.length > 1) {
        words[Math.floor(Math.random() * words.length)].speed - 1;
      }
      if (ele.style.color == 'lime') {
        heart += 1;
        displaySLH();
      }
      if (ele.style.color == 'cyan' && words.length > 1) {
        while (true) {
          if (words[Math.floor(Math.random() * words.length)].speed != 0) {
            words[Math.floor(Math.random() * words.length)].speed = 0;
            break
          };
        }
      }
      if (ele.style.color == 'magenta') {
        heart -= 1;
        displaySLH();
      }
      score += 100;
      displaySLH();

      if (heart > 0 && allSpawned() && words.length == 0) {

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

      words.push(word);
    }
    if (spawned.length == level + 5) {
      clearInterval(spawnId);
    }
    if (heart == 0) {
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
    document.getElementById('msg').innerHTML = `Your score has been saved ${document.getElementById('nickname').value}`
    e.preventDefault();
    e.stopPropagation()
    const finalScore = {
      score: localStorage.getItem('mostRecentScore'),
      name: nickname.value
    }
    highScores.push(finalScore);
    highScores.sort((a, b) => {
      return b.score - a.score
    })
    highScores.splice(MAX_HIGH_SCORES);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    document.getElementById('nickname').value = '';
    document.getElementById('nickname').disabled = true;
    document.getElementById('btn-submit').innerHTML = 'SAVED';
    document.getElementById('btn-submit').disabled = true;
  }

  function allSpawned() {
    return spawned.length == level + 5 ? true : false
  }

})

