'use strict';

// 1. Understand the problem
// - Create a function called computerSelection that will randomly return either 'Rock', 'Paper' or 'Scissors' (RPS).
// - Write a function that plays a single round of RPS. The function should take two parameters - the playerSelection and computerSelection - and then return a string that delcares the winner of the round like so: "You lose! Paper beats Rock!"
// - Make your function's playerSelection paramter case-insensitive (so users can input rock, ROCK, rocK etc.)
// - Write a NEW function called game(). Call the playRound function inside of this one to play a 5 round game that keeps score and reports a winner or loser at the end.

// 2. Plan

// 3. Divide

// - Create a computerSelection function
// - Within that function, make it so the function randomly returns either 'Rock', 'Paper' or 'Scissors'.
// - Create a playRound function that has two parameters: playerSelection and computerSelection
// - In that function, return a string that declares the winner of the round (i.e. You lose! Paper beats Rock!)
// - Create a new function "game()"
// - Call the playRound function inside of this one
// - It needs to play a 5 round game that keeps track of the score.
// - Return the winner and the loser at the end.

// One of three choices to choose from for the game.
const choices = ['rock', 'paper', 'scissors'];
const winners = [];

function resetGame() {
  // reset game
}

function startGame() {
  // play the game until someone wins 5 times
  let imgs = document.querySelectorAll('img');
  imgs.forEach(img =>
    img.addEventListener('click', () => {
      if (img.id) {
        playRound(img.id);
      }
    })
  );
}

function playRound(playerChoice) {
  let wins = checkWins();
  if (wins >= 5) {
    return;
  }

  const computerSelection = computerChoice();

  const winner = checkWinner(playerChoice, computerChoice);
  winners.push(winner);
  tallyWins();
  displayRound(playerChoice, computerChoice, winner);
  wins = checkWins();
  if (wins == 5) {
    // display end results
    // change the button to visible,
    // change the text to display winner
    displayEnd();
  }
}

function displayEnd() {
  let playerWins = winners.filter(item => item == 'Player').length;

  if (playerWins == 5) {
    document.querySelector('.winner').textContent =
      'You won 5 Games, Congrats!';
  } else {
    document.querySelector('.winner').textContent =
      'Sorry, the Computer won 5 times.';
  }
  document.querySelector('.reset').style.display = 'flex';
}

function displayRound(playerChoice, computerChoice, winner) {
  document.querySelector('.playerChoice').textContent = `You Chose: ${
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
  }`;
  document.querySelector(
    '.computerChoice'
  ).textContent = `The Computer Chose: ${
    computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
  }`;
  document.querySelector('.winner').textContent = `Round Winner: ${winner}`;
}

function tallyWins() {
  const playerWins = winners.filter(item => item == 'Player').length;
  const computerWins = winners.filter(item => item == 'Computer').length;
  const ties = winners.filter(item => item == 'Tie').length;
  document.querySelector('.playerScore').textContent = `Score: ${playerWins}`;
  document.querySelector(
    '.computerScore'
  ).textContent = `Score: ${computerWins}`;
  document.querySelector('.ties').textContent = `Score: ${ties}`;
}

// Function that randomly returns "Rock", "Paper" or "Scissors" for the Computer player.
const computerChoice = function () {
  // todo - update the dom with the computer selection
  return choices[Math.floor(Math.random() * choices.length)];
};

function checkWins() {
  const playerWins = winners.filter(item => item == 'Player').length;
  const computerWins = winners.filter(item => item == 'Computer').length;
  return Math.max(playerWins, computerWins); // function will return which of the two parameters is the highest
}

function checkWinner(choiceP, choiceC) {
  if (choiceP === choiceC) {
    return 'Tie';
  } else if (
    // Logic to check if the player wins
    (choiceP === 'rock' && choiceC === 'scissors') ||
    (choiceP === 'paper' && choiceC === 'rock') ||
    (choiceP === 'scissors' && choiceC === 'paper')
  ) {
    return 'Player'; // We are pushing this string into the filter array, they MUST be the exact same wording.
  } else {
    // Other logic does not need to be repeated for choiceC, because if they all fail, it can be safely assumed that the computer has beaten the player.
    return 'Computer';
  }
}

// A filter array that looks for "items" related to the variable. If the item does not equal the desired result, it throws it away.
// This is a good way to filter out wins, losses and ties for the player and computer.
function logWins() {
  let playerWins = winners.filter(item => item == 'Player').length;
  let computerWins = winners.filter(item => item == 'Computer').length;
  let ties = winners.filter(item => item == 'Tie').length;
}

startGame();
