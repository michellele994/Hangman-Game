//main variables for the game measuring if the game had started and if there are any wins/losses.
var gameStarted = false;
var wins = 0;
var losses = 0;
//measures how many tries the player has left.
var triesLeft = 12;

//letters that have been guessed already.
var lettersGuessed = new Array();


//array of words for hangman, later will be randomized.
var wordsToGuess = ["cattle", "pig", "sheep", "goat", "chicken", "horse", "goose", "duck", "donkey", "llama", "alpaca", "camel", "mule", "yak", "calf", "ox", "ostrich", "buffalo", "turkey", "quail", "cow", "pony"];
//variable word takes a random word from wordsToGuess array.
var word = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
//blank array is a blank array that will be later filled with "_" in prep()
var blanks = new Array();

//WHEN USER PRESSES A KEY
//currReplaced tracks if there were any replacements for the key that user had just pressed. If there are none, player has guessed incorrectly.
var currReplaced = 0;
//numReplace measures the correct guesses a player has made in total throughout a session. This will be compared to word.length later to determine if player has won the game.
var numReplaced = 0;
//The main purpose of this value is to update the image for the hanging, updated everytime the player guesses incorrectly.
var wrongGuess = 0;
//This variable goes through the array of guesses already made to ensure that if the player enters the letter again, player would not lose a try.
var alreadyGuessed = 0;


//userText changes depending on player's input
var userText = document.getElementById("user-text");
//triesText updates HTML on how many tries player has left
var triesText = document.getElementById("tries-left");
//numberWins updates HTML on how many total wins player has
var numberWins = document.getElementById("number-wins");
//numberLosses updates HTML on how many total losses player has
var numberLosses = document.getElementById("number-lose");
//displayWord updates the HTML with the blank array and its replacements as player plays the game
var displayWord = document.getElementById("wordtoguess");
//guesses updates HTML as player makes a new incorrect guess
var guesses = document.getElementById("letter-guessed");
//winLose is a text in HTML that is updated when a player had just lost or won the game
var winLose = document.getElementById("win-lose");
//anyKey is a text in HTML that is displayed after winLose to insruct the player to press any key to start over.
var anyKey = document.getElementById("any-key");


//EXTRAS/IMAGES/SOUNDS- these are just for fun.
//variable cow is used later to update the picture of the hangman
var cow = document.getElementById("cow");
//variable justEnded updates the HTML when a user just won or lost.
var justEnded = document.getElementById("justEnded-image");
var manBroom = document.getElementById("manwithbroom");
var heart = document.getElementById("heart");
var mob = document.getElementById("mob");
var except = document.getElementById("except");
var moo = new Audio('assets/sounds/moo.mp3');
var applause = new Audio('assets/sounds/applause.mp3');

//MY ONE FUNCTION
//prep() sets up the entire game.
function prep() {
	//Picking a random word from the list
	word = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
	//filling the blanks array with "_"
	blanks = new Array();
	for (var i = 0; i < word.length; i++)
	{
		blanks.push("_");
	}
	//displaying the array without the ugly commas.
	displayWord.textContent = blanks.join(" ");
	//Resetting "Letters Already Guessed"
	lettersGuessed = [];
	//Reseting the number of tries
	triesLeft = 12;
	wrongGuess = 0;
	//Resetting all texts from the previous game.
	winLose.textContent = "";
	anyKey.textContent = "";
	triesText.textContent = triesLeft;
	guesses.textContent = "No guesses yet";
	userText.textContent = "The game has started. Start guessing!";

	//Resetting all images from the previous game.
	justEnded.innerHTML = "";
	cow.innerHTML = "<img src='assets/images/cow"+wrongGuess+".png' alt='cow'>";
	manBroom.innerHTML = "<img src='assets/images/manwithbroom.png'>";
	mob.innerHTML = "<img src='assets/images/mob.png'>";
	except.textContent = "";
	heart.innerHTML = "";
	//Change gameStarted to true.
	gameStarted = true;
}

//This preps the first word

//When player presses a key
document.onkeyup = function(event)
{
	//set the key pressed into a variable and then force it to be lower case.
	var keyPressed = event.which || event.keyCode;
	letter = String.fromCharCode(keyPressed).toLowerCase();

	//If the game has not started yet, run prep(), which wil then make gameStarted = true.
	if (gameStarted === false)
	{
		prep();
	}

	//If gameStarted is true and the game has been prepped for a new round
	else
	{
		//Ensure that the keys being pressed are letters only.
		if ((keyPressed >= 65) && (keyPressed <= 90) || (keyPressed >= 97) && (keyPressed <= 122)) 
		{
			//Update the player on what key they had just pressed.
			userText.textContent = "You just pressed '" + letter +"'";

			//This for loop runs through each letter of the chosen random word and checks to see if player's choice matches a character in the word. If the choice matches, replace the blank with the choice.
			for (var i = 0; i < word.length; i++)
			{
				if (letter === word.charAt(i))
				{
					blanks[i] = letter;
					//currReplaced is used to measure if there were any replacements made. This will be used later to determine if player has guessed correctly or incorrectly.
					currReplaced++;
				}
			}
			//After checking to see if the characters match, update the blanks with replacements made (if any)
			displayWord.textContent = blanks.join(" ");

			//Check to see if there are any more blanks, including replacements from last round
			for (var i = 0; i < blanks.length; i++)
			{
				if (blanks[i] !== "_")
				{
					//this stores the total number of replacements made to blanks
					numReplaced++;	
				}
			}

			//IF THE USER HAD WON
			//this compares the numReplace (total number of replacements made to blanks array) and blanks.length to determine if the whole word had been guessed. The user must have not ran out of tries.
			if (numReplaced === blanks.length && triesLeft > 0)
			{
				//play moo and appause sound
				moo.play();
				applause.play();
				//Add one to win count
				wins++;

				//Update all texts letting player know that they have won.
				numberWins.textContent = wins;
				cow.innerHTML = "<img src='assets/images/cowwin.png' alt='cow'>";
				manBroom.innerHTML = "<img src='assets/images/manwithbroom2.png'>";
				mob.innerHTML = "<img src='assets/images/mob2.png'>";
				justEnded.innerHTML = "<img src='assets/images/cloud.png'>";
				winLose.textContent = "YOU WON!";
				heart.innerHTML = "<img src='assets/images/wins.png'>";
				anyKey.textContent = "Press any key to continue playing";
				//change gameStarted to false in preparation for the next round.
				gameStarted = false;

			}

			//IF PLAYER IS INCORRECT IN CHOICE
			//If there were no replacements made, that means the user had guessed incorrectly.
			if (currReplaced === 0)
			{
				//Check to see if the incorrect guess had already been guessed previously by comparing to lettersGuessed array
				for (var i = 0; i < lettersGuessed.length; i++)
				{
					if (letter === lettersGuessed[i])
					{
						//If the incorrect guess had already been guessed, alreadyGuessed would be greater than 0
						alreadyGuessed++;
					}
				}

				//If the incorrect guess had not already been guessed, then player loses a try
				if (alreadyGuessed === 0)
				{
					//Player loses a try
					triesLeft--;
					//wrongGuess is added as this will also be used to update the picture
					wrongGuess++;
					//This will add the current choice into lettersGuessed array to be compared later if player makes another incorrect guess.
					lettersGuessed.push(letter);
					//Update the HTML to inform the player of lettersGuessed, which tells them which letters that they have already incorrectly guessed
					guesses.textContent = lettersGuessed.join(", ");
					//Update HTML to inform player how many tries they have left
					triesText.textContent = triesLeft;
					//Here, wrongGuess is used to update the image of the hanging as a result of the incorrect guess.
					cow.innerHTML = "<img src='assets/images/cow"+wrongGuess+".png' alt='cow'>";
				}


				//IF PLAYER HAD LOST
				//This checks to see if user has ran out of tries. If they did,
				if (triesLeft <= 0)
				{
					//play moo sound
					moo.play();
					//Display the answer
					for (var i = 0; i < blanks.length; i++)
					{
						blanks[i] = word[i];
					}
					displayWord.textContent = blanks.join(" ");
					//add one to the losses count.
					losses++;
					//Update all the texts and images
					justEnded.innerHTML = "<img src='assets/images/cloud.png'>";
					winLose.textContent = "YOU LOST!";
					anyKey.textContent = "Press any key to continue playing";
					except.textContent = "...until now...";
					numberLosses.textContent = losses;
					//gameStarted will return to false in preparation for the next round.
					gameStarted = false;

				}
			}
			//reset currReplaced, alreadyGuessed, and numReplaced
			currReplaced = 0;
			alreadyGuessed = 0;
			numReplaced = 0;
		}
		//If the input was a character other than a letter
		else
		{
			userText.textContent = "That was not a letter. Try again.";
		}
	}

}

