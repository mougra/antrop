const inputs = document.querySelectorAll("input");
const outputs = document.querySelectorAll("output");
const resetBtn = document.querySelector(".btn-reset");
let fullScreenBtn = document.querySelector(".fullscreen");
const nextBtn = document.querySelector(".btn-next");
const download = document.querySelector(".btn-save");
const img = document.querySelector("img");

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  document
    .querySelector("img")
    .style.setProperty("--" + this.name, this.value + suffix);
  const lol = document.getElementsByName(this.name);
  lol[0].parentNode.lastElementChild.innerHTML = this.value;
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
fullScreenBtn.onclick = () => {
  activateFullscreen(document.documentElement);
};

resetBtn.onclick = () => {
  document.querySelector("img").attributeStyleMap.clear();
  for (let i = 0; i < outputs.length; i++) {
    const lol = document.getElementsByName(inputs[i].name);
    if (i === 3) {
      inputs[i].value = 100;
      lol[0].parentNode.lastElementChild.innerHTML = inputs[i].value;
    } else {
      inputs[i].value = 0;
      lol[0].parentNode.lastElementChild.innerHTML = inputs[i].value;
    }
  }
};

let imgageIndex = "01";
let times = "";

nextBtn.onclick = () => {
  var now = new Date();
  if (now.getHours() < 6) {
    times = "night";
  } else if (now.getHours() < 12 && now.getHours() >= 6) {
    times = "morning";
  } else if (now.getHours() < 18 && now.getHours() >= 12) {
    times = "day";
  } else times = "evening";

  document.querySelector("img").src =
    "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" +
    times +
    "/" +
    imgageIndex +
    ".jpg";

  if (Number(imgageIndex) < 9) {
    helpIndex = "0" + Number(++imgageIndex);
    imgageIndex = helpIndex;
  } else {
    helpIndex = String(Number(++imgageIndex));
  }
  if (Number(imgageIndex === 21)) {
    imgageIndex = "01";
  }
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

window.onload = function () {
  let fileInput = document.getElementById("btnInput");
  let fileDisplayArea = document.getElementById("img");

  fileInput.addEventListener("change", function (e) {
    let file = fileInput.files[0];
    let imageType = /image.*/;
    if (file.type.match(imageType)) {
      let reader = new FileReader();
      reader.onload = function (e) {
        fileDisplayArea.innerHTML = "";
        let img = new Image();
        img.src = reader.result;
        fileDisplayArea.appendChild(img);
        handleUpdate();
      };
      reader.readAsDataURL(file);
    } else {
      fileDisplayArea.innerHTML = "File not supported!";
    }
  });
};

download.addEventListener("click", function (e) {
  console.log(img.src);
  let link = document.createElement("a");
  link.setAttribute("download", "download-pic.jpg");
  link.setAttribute("href", img.src);
  link.click();
  link.delete;
});
