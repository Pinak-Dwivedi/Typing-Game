import passages, { setPassageText, getPassageById } from "./passage.js";
import { updateTimerContent } from "./timer.js";

const gameContainer = document.querySelector("[data-game-container]");
const dialog = document.querySelector("[data-dialog]");
const dialogForm = document.querySelector("[data-dialog-form]");
export const timeSelectBox = dialogForm.querySelector("[name='time']");
export const passageSelectBox = dialogForm.querySelector("[name='passage']");

export const timeOptions = [
  { value: 0, text: "Select Time" },
  { value: 1, text: "1 Min" },
  { value: 2, text: "2 Min" },
  { value: 3, text: "3 Min" },
  { value: 4, text: "4 Min" },
  { value: 5, text: "5 Min" },
  { value: 10, text: "10 Min" },
  { value: 20, text: "20 Min" },
  { value: 30, text: "30 Min" },
];

dialogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const timeValue = formData.get("time");
  const passageValue = formData.get("passage");

  if (timeValue === "0") {
    alert("Please select time");
    return;
  }
  if (passageValue === "0") {
    alert("Please select passage");
    return;
  }

  gameContainer.classList.remove("hide");
  updateTimerContent(Number(timeValue) * 60);
  setPassageText(getPassageById(passageSelectBox.value).passage);
  closeModal();
});

export function populateTimeSelect() {
  const documentFramgent = document.createDocumentFragment();

  timeOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;

    documentFramgent.append(optionElement);
  });

  timeSelectBox.append(documentFramgent);
}

export function populatePassageSelect() {
  const documentFramgent = document.createDocumentFragment();

  passages.forEach((passage) => {
    const optionElement = document.createElement("option");
    optionElement.value = passage.id;
    optionElement.textContent = passage.title;

    documentFramgent.append(optionElement);
  });

  passageSelectBox.append(documentFramgent);
}

export function openModal() {
  dialog.showModal();
}

function closeModal() {
  dialog.close();
}

export function resetDialog() {
  dialogForm.reset();
  openModal();
}
