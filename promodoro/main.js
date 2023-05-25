const timerElement = document.getElementById("timer");
const durationElement = document.getElementById("duration");

const breakDurationElement = document.getElementById("breakDuration");
const relax = document.querySelector(".break");
var timer;
var duration = 25 * 60;
var breakDuration = 5;
var breakFlag = true;

var intervalTimer;
var running = false;

function changeDuration() {
  duration = parseInt(durationElement.value) * 60;
}

function changeBreakTime() {
  breakDuration = parseFloat(breakDurationElement.value);
}

function initTimer() {
  timer = duration;

  relax.textContent = `${breakDuration}m`;
  updateTimerDisplay();
}

function startTimer() {
  if (running) {
    return;
  }

  running = true;
  intervalTimer = setInterval(function () {
    timer--;
    if (timer < 0 && breakFlag) {
      timer = breakDuration * 60;
      breakFlag = false;
    } else if (timer < 0 && !breakFlag) {
      timer = duration;
      clearInterval(intervalTimer);
      running = false;
    }
    updateTimerDisplay();
  }, 1000);
}
function stopTimer() {
  clearInterval(intervalTimer);
  updateTimerDisplay();
  running = false;
}

function resetTimer() {
  timer = duration;
  stopTimer();
  updateTimerDisplay();
  running = false;
}

function updateTimerDisplay() {
  var minutes = Math.floor(timer / 60);
  var seconds = Math.floor(timer % 60);

  function addLeadingZeroes(time) {
    return time < 10 ? `0${time}` : time;
  }

  var formattedMinutes = addLeadingZeroes(minutes);
  var formattedSeconds = addLeadingZeroes(seconds);

  timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}
