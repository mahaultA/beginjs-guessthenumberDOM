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
// const numberBar = document.getElementById("number-bar");

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

// Init game by generating a random number between 0 and 500 and reset
// the attempts count
const initGame = () => {
  targetNumber = getRandomNumber(0, 500);
  attemptCount = 0;
};

// Clear game UI by disabling the submit button and erasing all data generated during the game
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

// When user pushes start, it hides the introduction and launches the game
buttonStart.addEventListener("click", () => {
  const appGame = document.getElementById("app-game");
  const appWelcome = document.getElementById("app-welcome");
  appWelcome.style.display = "none";
  appGame.style.display = "block";
  buttonReplay.style.display = "none";
});

//This function is executed when user submits an entry
form.addEventListener("submit", (e) => {
  e.preventDefault();
  msgError.textContent = "";
  numberIndicator.textContent = "";
  const userGuess = enteredNumber.value;

  if (!isValidNumber(userGuess)) {
    msgError.textContent =
      "🛑 You really want to lose ? Your number must be between 0 and 500\n\n";
    return;
  }

  // Update the attempts count
  attemptCount += 1;
  attempts.textContent = `ATTEMPTS: ${attemptCount}`;

  // Update the overview bar
  overviewBar.style.position = "relative";
  const cross = document.createElement("span");
  cross.classList.add("cross");
  cross.textContent = "❌";
  const positionCalculated = (userGuess * 100) / 500;
  cross.style.position = "absolute";
  const totalWidth = overviewBar.offsetWidth;
  const positionEnPixels = (positionCalculated * totalWidth) / 100 - 5;
  cross.style.left = `${positionEnPixels}px`;
  overviewBar.appendChild(cross);

  // Compare the user answer with the answer to find
  if (userGuess > targetNumber) {
    numberIndicator.textContent = `📉 ${userGuess} is **too big**`;
    return;
  }
  if (userGuess < targetNumber) {
    numberIndicator.textContent = `📉 ${userGuess} is **too small**`;
    return;
  }

  // At this point, user has found the right number !..
  cross.textContent = "🟢";

  // ..So we disable the submit button to stop the game
  buttonGuess.disabled = true;

  // We display the Replay button
  buttonReplay.style.display = "block";

  // We display the message to congrat the user
  numberIndicator.textContent = "Congrats ! ";
  numberIndicator.textContent += userGuess;
  numberIndicator.textContent += " is the right number 🎉\n";
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
