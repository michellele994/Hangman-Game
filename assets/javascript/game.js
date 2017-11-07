var wins = 0;
var triesLeft = 12;
var lettersGuessed = new Array();
var wordsToGuess = ["hello", "love", "interesting", "moooo", "computer", "monkey", "seven"];
var userText = document.getElementById("user-text");
var triesText = document.getElementById("tries-left");
var word = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
var a = 0;
var x = 0;
var y = 0;
var z = 0;
var blanks = new Array();



var numberWins = document.getElementById("number-wins");
var displayWord = document.getElementById("wordtoguess");
var guesses = document.getElementById("letter-guessed");
var didWin = document.getElementById("you-win");
var spaceBar = document.getElementById("spacebar");

function prepWord() {
	word = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
	blanks = new Array();
	for (var i = 0; i < word.length; i++)
	{
		blanks.push("_");
	}
	lettersGuessed = [];
	didWin.textContent = " ";
	spaceBar.textContent = " ";
	guesses.textContent = lettersGuessed;
	triesLeft = 12;
	z=0;
	triesText.textContent = triesLeft;
	displayWord.textContent = blanks;
}

prepWord();

document.onkeyup = function(event)
{
	//if there are still tries left, or the user has not won yet run this
	if (triesLeft > 0 && z === 0 && event.key != " ")
	{
		userText.textContent = "You just pressed '" + event.key +"'";

		//If charater pressed equals a character in the word, replace it
		for (var i = 0; i < word.length; i++)
		{
			if (event.key === word.charAt(i))
			{
				blanks[i] = event.key;
				//x will measure if there were any replacements made
				x++;
			}
		}
		displayWord.textContent = blanks;

		for (var i = 0; i < lettersGuessed.length; i++)
		{
			if (lettersGuessed[i] === event.key)
			{
				a++;
			}
		}


		//If there were no replacements made, run this
		if (x === 0 && a === 0)
		{
			//take one try away, add to the list of guessed letters, and update the interface.
			triesLeft--;
			lettersGuessed.push(event.key);
			guesses.textContent = lettersGuessed;
			triesText.textContent = triesLeft;
		}

		//Check to see if there are any more blanks 
		for (var i = 0; i < blanks.length; i++)
		{
			if (blanks[i] !== "_")
			{
				y++;	
			}
		}
		//If there are no more blanks, add 1 to win, display word, "YOU GOT IT" and change word, reset the game. Z will keep track that the user has won
		if (y === blanks.length)
		{
			wins++;
			z++;
			numberWins.textContent = wins;
		}
		x = 0;
		y = 0;
		a = 0;

		if (z > 0)
		{
			didWin.textContent = "You just won!";
			spaceBar.textContent = "Press spacebar to continue playing";
			document.body.onkeyup = function(e)
			{
				if (e.keyCode == 32)
				{
					prepWord();
				}
			}
		}
	}

	//if user had already won, reset the game but keep the score.

// List of available words to choose from (array?)
// Pick from the array to be the word that user guesses
// Make the string its own array????? Maybe?
// Activate hint?
// Measure user's key choices
// If key pressed does not match the character in the word chosen, put the character in an array out of 12
// Print it in the cloud
// If key pressed does match a character in the chosen word, Replace the character to the correct index of the string
// 

}

