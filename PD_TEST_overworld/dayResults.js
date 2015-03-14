// variables for functions

var saveElement = document.getElementById("inputSaveName");

// variables for the end of the day

var dayHacks = 0;
var dayWins = 0;

// pass in the day clock to gonnaSave if the game will be saved
// otherwise pass in null

function saveDay(gonnaSave) {
	if (gonnaSave) {
		if (saveGame(saveElement.value)) {
			gonnaSave.startClock();
		} else {
			return;
		}
		
	}
	document.getElementById('dayEndSave').style.display = "none";
	document.getElementById("gameCanvas").style.display = "block";

}

var parDisplay;
var c1 = document.getElementById('endRep');
var textDisplay;

function dayEndProgress() {
	parDisplay = document.createElement('p');
	textDisplay = document.createTextNode(progressReport);
	parDisplay.appendChild(textDisplay);
	DIFF += 5;
	c1.appendChild(parDisplay);
}

