import { timeSelectBox } from "./dialog.js";
import {
  getTypedWordsCount,
  getCorrectWordsCount,
  getWrongtWordsCount,
} from "./passage.js";

const timerElement = document.querySelector("[data-timer]");
const gameContainer = document.querySelector("[data-game-container]");
const scoreContainer = document.querySelector("[data-score-container]");

let isTimerStart = false;

export default function startTimer(selectedTime) {
  if (isTimerStart) return;
  else isTimerStart = true;

  const intervalId = setInterval(updateTimer, 1000);

  function updateTimer() {
    updateTimerContent(--selectedTime);

    if (selectedTime === 0) {
      clearInterval(intervalId);
      endGame();
    }
  }
}

export function updateTimerContent(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  timerElement.textContent = `${prependZero(minutes)}:${prependZero(seconds)}`;
}

function prependZero(timeUnit) {
  timeUnit = timeUnit.toString();

  return timeUnit.length < 2 ? `0${timeUnit}` : timeUnit;
}

function getWordsPerMinute() {
  return Math.floor(getTypedWordsCount() / Number(timeSelectBox.value));
}

function getAccuracy() {
  const typedWordsCount = getTypedWordsCount();

  if (typedWordsCount === 0) return 0;

  return ((getCorrectWordsCount() / typedWordsCount) * 100).toFixed(2);
}

export function resetTimer() {
  isTimerStart = false;
}

function endGame() {
  gameContainer.classList.add("hide");
  scoreContainer.classList.remove("hide");

  const wordsPerMinuteElement = scoreContainer.querySelector(
    "[data-words-per-minute]"
  );
  const accuracyElement = scoreContainer.querySelector("[data-accuracy]");
  const correctWordsCountElement = scoreContainer.querySelector(
    "[data-correct-words]"
  );
  const wrongWordsCountElement =
    scoreContainer.querySelector("[data-wrong-words]");

  wordsPerMinuteElement.textContent = getWordsPerMinute();
  accuracyElement.textContent = getAccuracy() + "%";
  correctWordsCountElement.textContent = getCorrectWordsCount();
  wrongWordsCountElement.textContent = getWrongtWordsCount();
}
