'use strict';

// 1. Understand the problem
// - Create a function called computerSelection that will randomly return either 'Rock', 'Paper' or 'Scissors' (RPS).
// - Write a function that plays a single round of RPS. The function should take two parameters - the playerSelection and computerSelection - and then return a string that delcares the winner of the round like so: "You lose! Paper beats Rock!"
// - Make your function's playerSelection paramter case-insensitive (so users can input rock, ROCK, rocK etc.)
// - Write a NEW function called game(). Call the playRound function inside of this one to play a 5 round game that keeps score and reports a winner or loser at the end.

// 2. Plan

// 3. Divide into subproblems
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

function game() {
  for (let i = 0; i < 5; i++) {
    playRound(i);
  }
  document.querySelector('button').textContent = 'Play new game';
  logWins();
}

// Plays a round of RSP
function playRound(round) {
  const playerSelection = playerChoice();
  // console.log(playerSelection);
  const computerSelection = computerChoice();
  // console.log(computerSelection);
  const winner = checkWinner(playerSelection, computerSelection);
  winners.push(winner);
  logRound(playerSelection, computerSelection, winner, round);
}

// Logic for player to choose from either rock, paper or scissors
function playerChoice() {
  let input = prompt('Type Rock, Paper or Scissors');
  while (input == null) {
    input = prompt('Type Rock, Paper, or Scissors');
  }

  input = input.toLowerCase(); // Makes user input all lowercase, no matter how it is typed.
  let check = validateInput(input);
  while (check == false) {
    input = prompt(
      'Type Rock, Paper, or Scissors. Spelling needs to be exact, capitalization does not matter.'
    );
    while (input == null) {
      input = prompt('Type Rock, Paper, or Scissors');
    }
    input = input.toLowerCase();
    check = validateInput(input);
  }
  return input;
}

// Function that randomly returns "Rock", "Paper" or "Scissors" for the Computer player.
const computerChoice = function () {
  return choices[Math.floor(Math.random() * choices.length)];
};

// function to validate the user input to make sure it is one of the three choices
function validateInput(choice) {
  return choices.includes(choice);
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
  console.log('Results');
  console.log('Player Wins:', playerWins);
  console.log('Computer Wins:', computerWins);
  console.log('Ties:', ties);
}

function logRound(playerChoice, computerChoice, winner, round) {
  console.log(`Round ${round}`);
  console.log('Player Chose:', playerChoice);
  console.log('Computer Chose:', computerChoice);
  console.log(winner, 'Won the round.');
  console.log('--------------------------');
}
