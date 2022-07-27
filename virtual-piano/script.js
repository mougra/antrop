let fullScreenBtn = document.querySelector(".fullscreen");
const buttons = document.querySelectorAll(".btn");
const pianokey = document.querySelectorAll(".piano-key");
const piano = document.querySelector(".piano");

buttons.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    buttons.forEach((elem) => {
      if (!event.target.classList.contains("btn-active")) {
        if (event.target.classList.contains("btn-letters")) {
          pianokey.forEach((key) => {
            if (key.dataset.note !== undefined) {
              const arr = key.dataset.letter;
              key.dataset.letter = key.dataset.note;
              key.dataset.note = arr;
            }
          });
        } else {
          pianokey.forEach((key) => {
            if (key.dataset.note !== undefined) {
              const arr = key.dataset.note;
              key.dataset.note = key.dataset.letter;
              key.dataset.letter = arr;
            }
          });
        }
      }
      elem.classList.remove("btn-active");
      event.target.classList.add("btn-active");
    });
  });
});

window.addEventListener("keydown", (e) => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  pianokey.forEach((key) => {
    if (e.keyCode == key.dataset.key) {
      key.classList.add("piano-key-active-pseudo", "piano-key-active");
    }
    setTimeout(() => {
      key.classList.remove("piano-key-active-pseudo", "piano-key-active");
    }, 240);
  });
  audio.currentTime = 0;
  audio.play();
});

const startSound = (event) => {
  event.target.classList.add("piano-key-active-pseudo", "piano-key-active");
  const audio = document.querySelector(
    `audio[data-key="${event.target.dataset.key}"]`
  );
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
};

const stopSound = (event) => {
  event.target.classList.remove("piano-key-active-pseudo", "piano-key-active");
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active-pseudo", "piano-key-active");
    const audio = document.querySelector(`audio[data-key="${event.target.dataset.key}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }

  pianokey.forEach((elem) => {
    elem.addEventListener("mouseover", startSound);
    elem.addEventListener("mouseout", stopSound);
  });
};

const stopCorrespondOver = () => {
  pianokey.forEach((elem) => {
    elem.classList.remove("piano-key-active-pseudo", "piano-key-active");
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stopSound);
  });
};

piano.addEventListener("mousedown", startCorrespondOver, false);
piano.addEventListener("mouseup", stopCorrespondOver);

fullScreenBtn.onclick = () => {
  activateFullscreen(document.documentElement);
};

function activateFullscreen(element) {
  if (
    document.fullScreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreen ||
    document.webkitIsFullScreen
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}
