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

  document.getElementById('score').innerHTML = score;
  document.getElementById('level').innerHTML = level;
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

      if (heart > 0 && words.length == 0) {
        console.log('hi????')
        level += 1;
        document.getElementById('level').innerHTML = level;
        spawnId = setInterval(spawn.bind(this), 1000)

      }
    }
    if (e.key === 'Enter') {
      document.getElementById('typing-input').value = '';
    }

  });




  spawnId = setInterval(spawn, 1000)

  function spawn() {
    let word = new Word(level * 10, level * 20);
    debugger
    words.push(word);
    if (words.length == level * 3) {
      clearInterval(spawnId);
    }
    if (heart == 0) {
      console.log('2nd if')
      clearInterval(spawnId);
    }
    console.log('outer')
  }

  let drop = setInterval(function () {
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
        }
      }
      if (heart == 0) {
        clearInterval(drop)
      }
    }


  }.bind(this), 1000)



  // function spawn() {
  //   let word = new Word();
  //   words.push(word);
  //   if (words.length == 5) {
  //     console.log(words)
  //     cancelAnimationFrame(spawnId, dropId);
  //   }
  //   spawnId = requestAnimationFrame(spawn)
  // }

  // spawnId = requestAnimationFrame(spawn)

  // function drop() {
  //   for (let i = 0; i < words.length; i++) {
  //     words[i].dropWord();
  //     if (words[i].y > height - 30) {
  //       let ele = document.getElementById(words[i].word);
  //       ele.parentNode.removeChild(ele);
  //       words.splice(i, 1);
  //       heart -= 1;
  //       document.getElementById('heart').innerHTML = displayHeart(heart);
  //     }
  //   }
  //   if (heart == 0) {

  //     cancelAnimationFrame(dropId)
  //   }
  //   dropId = requestAnimationFrame(drop)
  // }

  // dropId = requestAnimationFrame(drop)

  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }
})


