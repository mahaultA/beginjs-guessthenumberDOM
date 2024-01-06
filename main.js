import "./style.css";

const buttonStart = document.getElementById("button-start");
const buttonReplay = document.getElementById("button-replay");
const buttonGuess = document.getElementById("button-guess");
const msgError = document.getElementById("error-msg");
const attempts = document.getElementById("attempts");
const numberIndicator = document.getElementById("number-indicator");
const enteredNumber = document.getElementById("entered-number");
const overviewBar = document.getElementById("overview-bar");
const form = document.getElementById("myForm");
const numberBar = document.getElementById("number-bar");

let targetNumber = null;
let attemptCount = null;

// Generate a random number within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Validate the user's input
const isValidNumber = (number) => {
  return !Number.isNaN(number) && number >= 0 && number <= 500;
};

const removeAllChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const initGame = () => {
  targetNumber = getRandomNumber(0, 500);
  console.log({ targetNumber });
  attemptCount = 0;
};

const clearGameUI = () => {
  buttonGuess.disabled = false;
  // buttonGuess.style.display = "block";
  numberIndicator.textContent = "";
  // userGuess.textContent = "";
  removeAllChildren(overviewBar);
  attempts.textContent = `ATTEMPTS: 0`;
  enteredNumber.value = "";
  buttonReplay.style.display = "none";
};

buttonStart.addEventListener("click", () => {
  const appGame = document.getElementById("app-game");
  const appWelcome = document.getElementById("app-welcome");
  appWelcome.style.display = "none";
  appGame.style.display = "block";
  buttonReplay.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("click submit");
  msgError.textContent = "";
  numberIndicator.textContent = "";
  const userGuess = enteredNumber.value;
  console.log({ userGuess });

  if (!isValidNumber(userGuess)) {
    console.log(
      "🛑 You really want to lose ? Your number must be between 0 and 500\n\n"
    );
    msgError.textContent =
      "🛑 You really want to lose ? Your number must be between 0 and 500\n\n";
    return;
  }

  console.log({ attemptCount });
  attemptCount += 1;
  attempts.textContent = `ATTEMPTS: ${attemptCount}`;

  overviewBar.style.position = "relative";
  const cross = document.createElement("span");
  cross.classList.add("cross");
  cross.textContent = "❌";

  const positionCalculated = (userGuess * 100) / 500;
  console.log({ positionCalculated });
  cross.style.position = "absolute";

  const largeurTotale = overviewBar.offsetWidth;
  const positionEnPixels = (positionCalculated * largeurTotale) / 100 - 5;

  cross.style.left = `${positionEnPixels}px`;

  overviewBar.appendChild(cross);

  if (userGuess > targetNumber) {
    numberIndicator.textContent = `📉 ${userGuess} is **too big**`;
    return;
  }
  if (userGuess < targetNumber) {
    numberIndicator.textContent = `📉 ${userGuess} is **too small**`;
    return;
  }

  cross.textContent = "🟢";

  buttonGuess.disabled = true;

  buttonReplay.style.display = "block";

  numberIndicator.textContent = "Congrats ! ";
  numberIndicator.textContent += userGuess;
  numberIndicator.textContent += " is the right number 🎉\n";
  // numberIndicator.textContent += `You succeded in ${attemptCount} tries`;
  const lastPhrase = document.createElement("p");
  lastPhrase.textContent = `You succeeded in ${attemptCount} tries !`;
  numberIndicator.appendChild(lastPhrase);
});

buttonReplay.addEventListener("click", () => {
  clearGameUI();
  initGame();
});

initGame();
clearGameUI();
