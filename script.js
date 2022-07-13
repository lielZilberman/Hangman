// word storage
let Words = {
  animals: [
    "barracuda",
    "crocodile",
    "dolphin",
    "elephant",
    "flamingo",
    "turkey",
    "chicken",
    "giraffe",
    "whale",
    "rhino",
    "turtle",
    "rabbit",
    "baboon",
    "eel",
    "eagle",
    "falcon",
    "frog",
    "gorilla",
    "goose",
    "seal",
    "hamster",
    "hedgehog",
    "horse",
    "iguana",
    "jellyfish",
    "jaguar",
    "kangaroo",
    "koala",
    "lizard",
    "leopard",
    "llama",
    "monkey",
    "mongoose",
    "mole",
    "ostrich",
    "octopus",
    "parrot",
    "pigeon",
    "piranha",
    "penguin",
    "raccoon",
    "rattlesnake",
    "salmon",
    "shrimp",
    "sheep",
    "shark",
    "skunk",
    "starfish",
    "squirrel",
    "seagull",
    "scorpion",
    "termite",
    "zebra",
  ],
  countries: [
    "israel",
    "jordan",
    "france",
    "austria",
    "australia",
    "iceland",
    "turkey",
    "greece",
    "ireland",
    "pakistan",
    "afghanistan",
    "bangladesh",
    "bulgaria",
    "colombia",
    "denmark",
    "ethiopia",
    "guatemala",
    "hungary",
    "honduras",
    "kazakhstan",
    "indonesia",
    "liechtenstein",
    "luxembourg",
    "madagascar",
    "netherlands",
    "philippines",
    "romania",
    "portugal",
    "singapore",
    "slovenia",
    "somalia",
    "slovakia",
    "switzerland",
    "suriname",
    "uruguay",
    "venezuela",
    "uzbekistan",
    "argentina",
    "russia",
  ],
  food: [
    "pizza",
    "meat",
    "hamburger",
    "pasta",
    "bread",
    "soup",
    "rice",
    "tomato",
    "onion",
    "fish",
    "butter",
    "hummus",
    "falafel",
    "peanut",
    "chocolate",
    "chips",
    "fries",
    "banana",
    "egg",
    "apple",
    "orange",
    "grape",
    "strawberry",
    "bean",
    "avocado",
    "carrot",
    "mushroom",
    "cheese",
    "beef",
    "kebab",
    "sausage",
    "bacon",
    "cake",
    "pancake",
    "noodle",
    "sushi",
    "pie",
    "salad",
    "sandwich",
    "waffle",
  ],
};
////////////////////////////////////////////////////////////////////
// variables
const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const topicBtns = document.querySelectorAll(".btns");
const lineContainer = document.getElementById("line-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const winWord = document.querySelector(".word");
const againBtn = document.querySelector(".again");
const topicH2 = document.querySelector(".topic");
const winOutcome = document.querySelector(".win");
const loseOutcome = document.querySelector(".lose");
let abcBtns = document.querySelectorAll(".abcbtn");
let currWord = "";
let points = 0;
let guess = false;
let correctGuess = 0;
////////////////////////////////////////////////////////////////////
//functions
const randomWord = function (topic) {
  if (topic === "animals") {
    return Words.animals[Math.trunc(Math.random() * Words.animals.length)];
  } else if (topic === "countries") {
    return Words.countries[Math.trunc(Math.random() * Words.countries.length)];
  } else if (topic === "food") {
    return Words.food[Math.trunc(Math.random() * Words.food.length)];
  }
};

const drawAbcBtns = function () {
  for (let i = 0; i < 26; i++) {
    const newBtn = document.createElement("button");
    newBtn.textContent = abc[i];
    newBtn.classList.add("abcbtn");
    document.body.appendChild(newBtn);
  }
};

//counts how many times a certain letter appeared before
const existedBefore = function (word, index) {
  let count = 0;
  for (let i = 0; i < index; i++) {
    if (word[i] === word[index]) count++;
  }
  return count;
};

// draws the lines and creates letters
const drawLines = function (word) {
  lineContainer.style.opacity = 1;
  for (let i = 0; i < word.length; i++) {
    const newLine = document.createElement("div");
    const newLabel = document.createElement("label");
    newLine.classList.add("line");
    newLabel.classList.add("letter");
    if (existedBefore(word, i) > 0) {
      newLabel.classList.add(`${word[i]}${existedBefore(word, i)}`);
    } else {
      newLabel.classList.add(`${word[i]}`);
    }
    newLabel.textContent = word[i];
    lineContainer.appendChild(newLine);
    lineContainer.appendChild(newLabel);
  }
};
//////////////////////////////////////////////////////////////////
// event listeners
topicBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    currWord = randomWord(btn.textContent);
    topicH2.textContent = btn.textContent;
    topicH2.classList.remove("hidden");
    drawLines(currWord);
    drawAbcBtns();
    abcBtns = document.querySelectorAll(".abcbtn");
    topicBtns.forEach((btn) => btn.classList.add("hidden"));

    abcBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (
          points != 10 &&
          !btn.classList.contains("disabled") &&
          correctGuess < currWord.length
        ) {
          guess = false;
          for (let i = 0; i <= currWord.length; i++) {
            if (btn.textContent.toLocaleLowerCase() === currWord[i]) {
              if (existedBefore(currWord, i)) {
                document.querySelector(
                  `.${currWord[i]}${existedBefore(currWord, i)}`
                ).style.opacity = 1;
              } else {
                document.querySelector(`.${currWord[i]}`).style.opacity = 1;
              }
              btn.classList.add("disabled");
              btn.classList.add("true");
              guess = true;
              correctGuess++;
            }
          }
          if (guess == false) {
            btn.classList.add("disabled");
            btn.classList.add("false");
            points++;
            document.getElementById(`g${points}`).style.opacity = 1;
          }
          // win modal
          if (correctGuess === currWord.length && points !== 10) {
            document.body.style.background = "#7CFC00";
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
            winOutcome.classList.remove("hidden");
            winWord.textContent = `the word was ${currWord} 🎯`;
          }
          // lose modal
          else if (correctGuess !== currWord && points === 10) {
            document.body.style.background = "#FF4136";
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
            loseOutcome.classList.remove("hidden");
            winWord.textContent = `the word was ${currWord} 🤭`;
          }
        }
      });
    });
  });
});

// play again -- reset all
againBtn.addEventListener("click", function () {
  currWord = "";
  points = 0;
  guess = false;
  correctGuess = 0;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  abcBtns.forEach((btn) => btn.parentNode.removeChild(btn));
  document.body.style.background = "rgb(176, 204, 231)";
  document
    .querySelectorAll(".line")
    .forEach((line) => line.parentNode.removeChild(line));
  document
    .querySelectorAll(".letter")
    .forEach((letter) => letter.parentNode.removeChild(letter));
  lineContainer.style.opacity = 0;
  topicBtns.forEach((btn) => btn.classList.remove("hidden"));
  document.querySelectorAll(".h").forEach((h) => (h.style.opacity = 0));
  topicH2.classList.add("hidden");
  winOutcome.classList.add("hidden");
  loseOutcome.classList.add("hidden");
});
