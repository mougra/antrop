const inputs = document.querySelectorAll("input");
const outputs = document.querySelectorAll("output");
const resetBtn = document.querySelector(".btn-reset");
const fullScreenBtn = document.querySelector(".fullscreen");
const nextBtn = document.querySelector(".btn-next");
const download = document.querySelector(".btn-save");
const image = document.querySelector("img");
let fileInput = document.getElementById("btnInput");
let fileDisplayArea = document.getElementById("img-container");

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  image.style.setProperty("--" + this.name, this.value + suffix);
  const filterNumber = document.getElementsByName(this.name);
  filterNumber[0].parentNode.lastElementChild.innerHTML = this.value;
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));

resetBtn.onclick = () => {
  image.attributeStyleMap.clear();
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

let imgageIndex = 1;
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

  // image.src =
  //   "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" +
  //   times +
  //   "/" +
  //   imgageIndex +
  //   ".jpg";

  image.src =
    "./assets/img/image" +
    imgageIndex +
    ".jpg";

    imgageIndex++;
    if (imgageIndex == 10) imgageIndex = 1;

  // if (Number(imgageIndex) < 9) {
  //   helpIndex = "0" + Number(++imgageIndex);
  //   imgageIndex = helpIndex;
  // } else {
  //   helpIndex = String(Number(++imgageIndex));
  // }
  // if (Number(imgageIndex === 21)) {
  //   imgageIndex = "01";
  // }
};

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

window.onload = function () {
  fileInput.addEventListener("change", function (e) {
    let file = fileInput.files[0];
    let imageType = /image.*/;
   
      let reader = new FileReader();
      reader.onload = function (e) {
        fileDisplayArea.innerHTML = "";
        let imgLoad = new Image();
        imgLoad.src = reader.result;
        fileDisplayArea.appendChild(imgLoad);
      };
      reader.readAsDataURL(file);
  
  });
};

function drawImage() {
  let img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = image.attributes.src.value;
  img.height = image.naturalHeight;
  img.width = image.naturalWidth;
  img.filter = getComputedStyle(image).filter;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = img.filter;
    ctx.drawImage(img, 0, 0);
    let link = document.createElement("a");
    link.download = "download.png";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
    link.delete;
  };
}

download.addEventListener("click", drawImage);
