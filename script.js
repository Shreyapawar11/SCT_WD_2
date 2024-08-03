let startTime;
let lapStartTime;
let updatedTime;
let difference = 0;
let lapDifference = 0;
let tInterval;
let running = false;
let paused = false;

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const lapBtn = document.getElementById('lapBtn');
const resetLapBtn = document.getElementById('resetLapBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
restartBtn.addEventListener('click', restart);
lapBtn.addEventListener('click', lap);
resetLapBtn.addEventListener('click', resetLap);

function startStop() {
  if (!running && !paused) {
    startTime = new Date().getTime() - difference;
    lapStartTime = new Date().getTime() - lapDifference;
    tInterval = setInterval(getShowTime, 1);
    startStopBtn.textContent = 'Stop';
    running = true;
  } else if (running && !paused) {
    clearInterval(tInterval);
    startStopBtn.textContent = 'Start';
    running = false;
  }
}

function pause() {
  if (running && !paused) {
    clearInterval(tInterval);
    startStopBtn.textContent = 'Start';
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  display.textContent = '00:00:00:00';
  startStopBtn.textContent = 'Start';
  running = false;
  paused = false;
  difference = 0;
  lapDifference = 0;
  lapsList.innerHTML = '';
}

function restart() {
  clearInterval(tInterval);
  display.textContent = '00:00:00:00';
  reset()
  startStop()
}

function lap() {
  if (running) {
    const lapTime = formatTime(lapDifference);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
    lapStartTime = new Date().getTime();
    lapDifference = 0;
  }
}

function resetLap() {
  lapsList.innerHTML = ""
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  lapDifference = updatedTime - lapStartTime;

  display.textContent = formatTime(difference);
}

function formatTime(timeDifference) {
  let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  let milliseconds = timeDifference % 100;

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  milliseconds = milliseconds.toString().padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

