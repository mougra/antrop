import playList from "./playList.js";

const time = document.querySelector(".time");
const day = document.querySelector(".date");
const greetingText = document.querySelector(".greeting");
const userName = document.querySelector(".name");
const body = document.querySelector("body");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
const playListContainer = document.querySelector('.play-list');
const playButton = document.querySelector('.play');

let randomNum;
let isPlay = false;


function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

function setLocalStorage() {
  localStorage.setItem("name", userName.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

function showDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  day.textContent = currentDate;
}

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
  greetingText.textContent = `Good ${getTimeOfDay(hours)},`;
  if (date.getMinutes() == 0 && date.getSeconds() == 0) setBg();
}

function setBg() {
  const date = new Date();
  const hours = date.getHours();
  let backgroundUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay(
    hours
  )}/${randomNum.toString().padStart(2, "0")}.jpg`;

  const img = new Image();
  img.src = backgroundUrl;
  img.onload = () => {
    body.style.backgroundImage = "url('" + backgroundUrl + "')";
  };
}

function getRandomInt() {
  randomNum = Math.floor(1 + Math.random() * 20);
  return randomNum;
}

function getTimeOfDay(hr) {
  if (hr < 6) {
    return "night";
  } else if (hr < 12 && hr >= 6) {
    return "morning";
  } else if (hr < 18 && hr >= 12) {
    return "afternoon";
  } else return "evening";
}

function getSlideNext() {
  randomNum === 20 ? (randomNum = 1) : randomNum++;
  setBg();
}

function getSlidePrev() {
  randomNum === 1 ? (randomNum = 20) : randomNum--;
  setBg();
}

showTime();
getRandomInt();
setBg();

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

async function getWeather(value) {
  city.textContent = value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=95ce7d3a43e90b15430bd8abadcfb398&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === "Enter") {
    getWeather(city.value);
    city.blur();
  }
}

async function getQuotes() {
  const quotes = "js/data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuote = Math.floor(Math.random() * 3);
  quote.textContent = data[randomQuote].text;
  author.textContent = data[randomQuote].author;
}

changeQuote.addEventListener("click", () => getQuotes());

getQuotes();

city.textContent = "Minsk";
city.value = city.textContent;

city.addEventListener("change", () => getWeather(city.value));
document.addEventListener("DOMContentLoaded", getWeather(city.value));
city.addEventListener("keypress", setCity);

// AUDIO

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement("li");
  // li.classList.add('play-item');
  playListContainer.append(li);
  li.textContent = playList[i].title;
}

const elemenLi = document.querySelectorAll("li");

const audio = new Audio();

function playAudio() {
  audio.src = playList[0].src;
  elemenLi[0].classList.add("play-item");
  audio.currentTime = 0;
  audio.volume = 0.01;
  if (!isPlay) {
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    elemenLi[0].classList.remove("play-item");
    isPlay = false;
  }
}

function toggleBtn() {
  playButton.classList.toggle("pause");
}
playButton.addEventListener("click", () => {
  toggleBtn();
  playAudio();
});
