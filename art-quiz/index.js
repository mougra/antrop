const gamePicture = document.querySelector('.game-pic') //categories game
const pages = document.querySelectorAll('.page') //categories game
const transitions = document.querySelectorAll('[data-page]') //data-page="categories" data-page="game"

const answerOption = document.querySelector('.answer-option')
const answer_buttons = document.querySelectorAll('[data-id]')

const customModelMain = document.querySelector('.custom-model-main')
const closeBtn = document.querySelector('.close-btn__main')
const bgOverlay = document.querySelector('.bg-overlay')

const customModelSubmain = document.querySelector('.custom-model-submain')
const popupScore = document.querySelector('.pop-up__score')
const popUpBtns = document.querySelectorAll('.pop-up__btn')

const questionName = document.querySelector('.question__name')
const questionAuthorYear = document.querySelector('.question__author-year')
const resultPic = document.querySelector('.result-pic')

const timeCount = document.querySelector('.time-count')
const timetoanswerСount = document.querySelector('.time')

const settingsButtonDefault = document.querySelector(
  '.settings__button-default'
)
const settingsButtonSave = document.querySelector('.settings__button-save')

const timerСounts = document.querySelectorAll('.timeto__answer-pic')

const quizScore = document.querySelectorAll('.quiz__subtitle-score')

const artquizPics = document.querySelectorAll('.art-quiz-pic')

let gameCount = 0
let rightAnswers = 0

let questions_id = 0

let arrScore = ['', '', '', '', '', '', '', '', '', '', '', '']

function getLocalStorage() {
  if (localStorage.getItem('time')) {
    timetoanswerСount.innerHTML = Number(localStorage.getItem('time'))
  }

  if (localStorage.getItem('score')) {
    arrScore = JSON.parse(localStorage.getItem('score'))
    // console.log(typeof arrScore);
    // console.log("getLocalStorage score = " + arrScore);
    setScore()
  }
}
window.addEventListener('load', getLocalStorage)

function setLocalStorage() {
  localStorage.setItem('time', timetoanswerСount.innerHTML)
  console.log('setLocalStorage time')

  localStorage.setItem('score', JSON.stringify(arrScore))
  console.log('setLocalStorage score')
}
window.addEventListener('beforeunload', setLocalStorage)

// localStorage.clear();

function setScore() {
  for (let i = 0; i < arrScore.length; i++) {
    if (arrScore[i].length > 0) {
      quizScore[i].innerHTML = `${arrScore[i]}/5`
      artquizPics[i].style = 'filter: grayscale(0%)'
    }
  }
}

function Timer() {
  let current = timeCount.innerHTML
  function go() {
    current < 10
      ? (timeCount.innerHTML = `0:0${current}`)
      : (timeCount.innerHTML = `0:${current}`)
    if (current == 0) {
      clearInterval(timerId)
    }
    for (answerButton of answer_buttons) {
      answerButton.addEventListener('click', () => {
        clearInterval(timerId)
      })
    }
    transitions.forEach(function (item) {
      item.addEventListener('click', function () {
        clearInterval(timerId)
      })
    })
    current--
  }
  go()
  let timerId = setInterval(go, 1000)
}

///////////

timerСounts.forEach(function (timerСount) {
  timerСount.addEventListener('click', function (e) {
    e.preventDefault()
    if (timerСount.classList.contains('timeto__answer-pic+')) {
      timetoanswerСount.innerHTML = Number(timetoanswerСount.innerHTML) + 5
    } else {
      timetoanswerСount.innerHTML = Number(timetoanswerСount.innerHTML) - 5
    }
  })
})

settingsButtonDefault.onclick = function () {
  localStorage.setItem('time', 30)
  timetoanswerСount.innerHTML = 30
}

//////

transitions.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault()
    const pageName = this.dataset.page
    if (pageName === 'game') {
      questions_id = this.id
      ShowQuestion()
    }
    this.parentNode.closest('.page').classList.add('hide')
    pages.forEach((page) => {
      if (page.classList.contains(pageName)) {
        page.classList.remove('hide')
      }
    })
  })
})

async function getJson(answers, selected_picture) {
  const dataJSON = 'images/image-data-master/images.json'
  const res = await fetch(dataJSON)
  console.log('🚀 ~ file: index.js ~ line 140 ~ getJson ~ res', res)
  const data = await res.json()
  console.log('🚀 ~ file: index.js ~ line 142 ~ getJson ~ data', data)
  for (let i = 0; i < answer_buttons.length; i++) {
    answer_buttons[i].innerHTML = data[answers[i]].author
  }
  questionName.innerHTML = data[selected_picture].name
  questionAuthorYear.innerHTML =
    data[selected_picture].author + ', ' + data[selected_picture].year
  AnswerChoice(data[selected_picture])
}

function getRandomInt(max) {
  randomNum = Math.floor(Math.random() * max)
  return randomNum
}

function getRandomIntInclusive(min) {
  min = min * 20
  let max = min + 20
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function ShowQuestion() {
  let selected_picture = 0
  selected_picture = getRandomIntInclusive(questions_id)
  let answers = []
  answers.push(selected_picture)
  let path = `images/image-data-master/full/${selected_picture}full.jpg`
  gamePicture.src = path
  while (answers.length < 4) {
    let rand = getRandomInt(240)
    if (!answers.includes((x) => x == rand)) {
      answers.push(rand)
    }
  }
  answers.sort(() => Math.random() - 0.5)
  console.log(selected_picture)
  console.log(answers)
  getJson(answers, selected_picture)
  timeCount.innerHTML = timetoanswerСount.innerHTML
  Timer()
}

function AnswerChoice(data) {
  answerOption.onclick = function (e) {
    e.preventDefault()
    let answerButton = e.target.closest('.answer-button')
    if (!answerButton) return
    if (!answerOption.contains(answerButton)) return
    gameCount++
    if (data.author == answerButton.innerHTML) {
      resultPicType = '+'

      rightAnswers++
    } else resultPicType = '-'
    let resultPath = `images/result${resultPicType}.svg`
    resultPic.src = resultPath
    customModelMain.classList.add('model-open')
  }
  PopupResults()
}

function PopupResults() {
  closeBtn.onclick = function (e) {
    e.preventDefault()
    e.stopPropagation()

    customModelMain.classList.remove('model-open')
    // console.log(
    //   "gameCount = " + gameCount + ", rightAnswers = " + rightAnswers
    // );
    if (gameCount == 5) {
      //  ТУТ 10 должно быть
      popupScore.innerHTML = `${rightAnswers}/5`
      customModelSubmain.classList.add('model-open')
    }
    setTimeout(ShowQuestion, 200)
  }

  for (popUpBtn of popUpBtns) {
    popUpBtn.onclick = function (e) {
      if (rightAnswers > quizScore[questions_id].innerHTML.split('/')[0]) {
        quizScore[questions_id].innerHTML = `${rightAnswers}/5`
        artquizPics[questions_id].style = 'filter: grayscale(0%)'
      }

      arrScore[questions_id] = quizScore[questions_id].innerHTML.split('/')[0]
      localStorage.setItem('score', JSON.stringify(arrScore))
      console.log(arrScore)
      e.preventDefault()
      e.stopPropagation()
      gameCount = 0
      rightAnswers = 0
      customModelSubmain.classList.remove('model-open')
    }
  }
}

// for (popUpBtn of popUpBtns) {
//   popUpBtn.addEventListener(
//     "click",
//     (e) => {

//       e.preventDefault();
//       e.stopPropagation();
//       gameCount = 0;
//       rightAnswers = 0;
//       customModelSubmain.classList.remove("model-open");
//     },
//     { once: true }
//   );
// }

for (let e of document.querySelectorAll(
  'input[type="range"].slider-progress'
)) {
  e.style.setProperty('--value', e.value)
  e.style.setProperty('--min', e.min == '' ? '0' : e.min)
  e.style.setProperty('--max', e.max == '' ? '100' : e.max)
  e.addEventListener('input', () => e.style.setProperty('--value', e.value))
}
