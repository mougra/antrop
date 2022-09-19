;(() => {
  const e = document.querySelector('.game-pic'),
    t = document.querySelectorAll('.page'),
    n = document.querySelectorAll('[data-page]'),
    o = document.querySelector('.answer-option'),
    r = document.querySelectorAll('[data-id]'),
    l = document.querySelector('.custom-model-main'),
    c = document.querySelector('.close-btn__main'),
    a =
      (document.querySelector('.bg-overlay'),
      document.querySelector('.custom-model-submain')),
    i = document.querySelector('.pop-up__score'),
    s = document.querySelectorAll('.pop-up__btn'),
    u = document.querySelector('.question__name'),
    m = document.querySelector('.question__author-year'),
    d = document.querySelector('.result-pic'),
    p = document.querySelector('.time-count'),
    f = document.querySelector('.time'),
    g = document.querySelector('.settings__button-default'),
    y =
      (document.querySelector('.settings__button-save'),
      document.querySelectorAll('.timeto__answer-pic')),
    L = document.querySelectorAll('.quiz__subtitle-score'),
    S = document.querySelectorAll('.art-quiz-pic')
  let h = 0,
    M = 0,
    q = 0,
    v = ['', '', '', '', '', '', '', '', '', '', '', '']
  function T() {
    let t = 0
    t = (function (e) {
      let t = 20 + (e *= 20)
      return (
        (e = Math.ceil(e)),
        (t = Math.floor(t)),
        Math.floor(Math.random() * (t - e + 1)) + e
      )
    })(q)
    let g = []
    g.push(t)
    let y = `images/image-data-master/full/${t}full.jpg`
    for (e.src = y; g.length < 4; ) {
      let e = (240, (randomNum = Math.floor(240 * Math.random())), randomNum)
      g.includes((t) => t == e) || g.push(e)
    }
    g.sort(() => Math.random() - 0.5),
      console.log(t),
      console.log(g),
      (async function (e, t) {
        const n = await fetch('/images/image-data-master/images.json'),
          p = await n.json()
        for (let t = 0; t < r.length; t++) r[t].innerHTML = p[e[t]].author
        ;(u.innerHTML = p[t].name),
          (m.innerHTML = p[t].author + ', ' + p[t].year),
          (function (e) {
            ;(o.onclick = function (t) {
              t.preventDefault()
              let n = t.target.closest('.answer-button')
              if (!n) return
              if (!o.contains(n)) return
              h++,
                e.author == n.innerHTML
                  ? ((resultPicType = '+'), M++)
                  : (resultPicType = '-')
              let r = `images/result${resultPicType}.svg`
              ;(d.src = r), l.classList.add('model-open')
            }),
              (function () {
                for (popUpBtn of ((c.onclick = function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    l.classList.remove('model-open'),
                    3 == h &&
                      ((i.innerHTML = `${M}/10`),
                      a.classList.add('model-open')),
                    setTimeout(T, 200)
                }),
                s))
                  popUpBtn.onclick = function (e) {
                    M > L[q].innerHTML.split('/')[0] &&
                      ((L[q].innerHTML = `${M}/10`),
                      (S[q].style = 'filter: grayscale(0%)')),
                      (v[q] = L[q].innerHTML.split('/')[0]),
                      localStorage.setItem('score', JSON.stringify(v)),
                      console.log(v),
                      e.preventDefault(),
                      e.stopPropagation(),
                      (h = 0),
                      (M = 0),
                      a.classList.remove('model-open')
                  }
              })()
          })(p[t])
      })(g, t),
      (p.innerHTML = f.innerHTML),
      (function () {
        let e = p.innerHTML
        function t() {
          for (answerButton of ((p.innerHTML = e < 10 ? `0:0${e}` : `0:${e}`),
          0 == e && clearInterval(o),
          r))
            answerButton.addEventListener('click', () => {
              clearInterval(o)
            })
          n.forEach(function (e) {
            e.addEventListener('click', function () {
              clearInterval(o)
            })
          }),
            e--
        }
        t()
        let o = setInterval(t, 1e3)
      })()
  }
  window.addEventListener('load', function () {
    localStorage.getItem('time') &&
      (f.innerHTML = Number(localStorage.getItem('time'))),
      localStorage.getItem('score') &&
        ((v = JSON.parse(localStorage.getItem('score'))),
        (function () {
          for (let e = 0; e < v.length; e++)
            v[e].length > 0 &&
              ((L[e].innerHTML = `${v[e]}/10`),
              (S[e].style = 'filter: grayscale(0%)'))
        })())
  }),
    window.addEventListener('beforeunload', function () {
      localStorage.setItem('time', f.innerHTML),
        console.log('setLocalStorage time'),
        localStorage.setItem('score', JSON.stringify(v)),
        console.log('setLocalStorage score')
    }),
    y.forEach(function (e) {
      e.addEventListener('click', function (t) {
        t.preventDefault(),
          e.classList.contains('timeto__answer-pic+')
            ? (f.innerHTML = Number(f.innerHTML) + 5)
            : (f.innerHTML = Number(f.innerHTML) - 5)
      })
    }),
    (g.onclick = function () {
      localStorage.setItem('time', 30), (f.innerHTML = 30)
    }),
    n.forEach(function (e) {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const n = this.dataset.page
        'game' === n && ((q = this.id), T()),
          this.parentNode.closest('.page').classList.add('hide'),
          t.forEach((e) => {
            e.classList.contains(n) && e.classList.remove('hide')
          })
      })
    })
  for (let e of document.querySelectorAll(
    'input[type="range"].slider-progress'
  ))
    e.style.setProperty('--value', e.value),
      e.style.setProperty('--min', '' == e.min ? '0' : e.min),
      e.style.setProperty('--max', '' == e.max ? '100' : e.max),
      e.addEventListener('input', () => e.style.setProperty('--value', e.value))
})()
