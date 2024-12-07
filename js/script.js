import {
  openModal,
  populatePassageSelect,
  populateTimeSelect,
  resetDialog,
  timeSelectBox,
} from "./dialog.js";

import startTimer, { resetTimer } from "./timer.js";
import {
  checkTypedWord,
  updateActiveWord,
  scrollToWord,
  addMoreParagraph,
  resetPassage,
} from "./passage.js";

const typingForm = document.querySelector("[data-typing-form]");
const typingElement = typingForm.querySelector("[name='typed-text']");
const gameContainer = document.querySelector("[data-game-container]");
const scoreContainer = document.querySelector("[data-score-container]");
const resetGameButton = document.querySelector("[data-reset-game-button]");

openModal();
populateTimeSelect();
populatePassageSelect();

typingElement.addEventListener("input", (e) => {
  startTimer(Number(timeSelectBox.value) * 60);
  scrollToWord();
  addMoreParagraph();

  if (e.data === " ") {
    const words = e.target.value.split(/[\s\n]/);
    const wordBeforeSpace = words.at(-2);

    checkTypedWord(wordBeforeSpace + " ");
    updateActiveWord();
  }
});

typingElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const words = e.target.value.split(/[\s\n]/);
    const lastword = words.at(-1);

    checkTypedWord(lastword);
    updateActiveWord();
  }
});

resetGameButton.addEventListener("click", resetGame);

function resetGame() {
  resetTimer();
  resetDialog();
  resetPassage();
  gameContainer.classList.add("hide");
  scoreContainer.classList.add("hide");
  typingElement.value = "";
}
