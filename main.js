import "./style.css";
// Generate a random number within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Validate the user's input
const isValidNumber = (number) => {
  return !Number.isNaN(number) && number >= 0 && number <= 500;
};

const targetNumber = getRandomNumber(0, 500);
let attemptCount = 0;

console.log({ targetNumber });

// const game = () => {
//   const playGuessingGame = () => {
//     const userGuess = Number(prompt("Enter a number: "));
//     attemptCount += 1;
//     if (!isValidNumber(userGuess)) {
//       console.log(
//         "🛑 The entered number is invalid. It must be between 0 and 500.\n\n"
//       );
//       return playGuessingGame();
//     }
//     if (userGuess > targetNumber) {
//       console.log("📈 The entered number is **too big**.\n\n");
//       return playGuessingGame();
//     }
//     if (userGuess < targetNumber) {
//       console.log("📉 The entered number is **too small**.\n\n");
//       return playGuessingGame();
//     }
//     // If this point is reached, the user has correctly guessed the number
//     console.log(`🟢 Well done! The random number was indeed ${userGuess}.`);
//     console.log(`✨ You succeeded in ${attemptCount} attempts.`);
//   };
//   const restartGame = () => {
//     const choice = prompt("Do you want to play again? (Y/N): ");
//     if (choice.toUpperCase() === "Y") {
//       console.log("\n\n");
//       game();
//     } else if (choice.toUpperCase() === "N") {
//       console.log("Thank you for playing! Goodbye.");
//     } else {
//       console.log("Invalid choice. Please enter Y or N.");
//       restartGame();
//     }
//   };
//   console.log(targetNumber);
//   playGuessingGame();
//   restartGame();
// };

const button = document.getElementById("button");
const msgError = document.getElementById("error-msg");
const attempts = document.getElementById("attempts");
const numberIndicator = document.getElementById("number-indicator");
const enteredNumber = document.getElementById("entered-number");
const overviewBar = document.getElementById("overview-bar");

button.addEventListener("click", (event) => {
  console.log("click submit");
  msgError.textContent = "";
  numberIndicator.textContent = "";
  const userGuess = enteredNumber.value;
  console.log({ userGuess });

  if (!isValidNumber(userGuess)) {
    console.log(
      "🛑 Your entry is invalid. It must be a number between 0 and 500.\n\n"
    );
    msgError.textContent =
      "🛑 Your entry is invalid. It must be a number between 0 and 500.\n\n";
    return;
  }

  console.log({ attemptCount });
  attemptCount += 1;
  attempts.textContent = `ATTEMPTS: ${attemptCount}`;

  overviewBar.style.position = "relative";
  const cross = document.createElement("span");
  cross.classList.add("cross");
  cross.textContent = "❌";

  // const moitieLargeurDiv = overviewBar.offsetWidth / 2;
  // userGuess est le nombre entré par l'utilisateur compris entre 0 et 500
  const positionCalculated = (userGuess * 100) / 500;
  console.log({ positionCalculated });
  cross.style.position = "absolute";

  const largeurTotale = overviewBar.offsetWidth;
  const positionEnPixels = (positionCalculated * largeurTotale) / 100 - 5;

  cross.style.left = `${positionEnPixels}px`;

  overviewBar.appendChild(cross);

  if (userGuess > targetNumber) {
    numberIndicator.textContent = "📉 The entered number is **too big**.\n\n";
    return;
  }
  if (userGuess < targetNumber) {
    numberIndicator.textContent = "📉 The entered number is **too small**.\n\n";
    return;
  }

  cross.textContent = "🟢";

  numberIndicator.textContent = "Bravo ! ";
  numberIndicator.textContent += userGuess;
  numberIndicator.textContent += " is the right number";
});

// game();
