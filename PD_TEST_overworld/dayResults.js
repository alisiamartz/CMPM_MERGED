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

var cc = document.getElementById('endReport');
var a = cc.getContext('2d');

function dayEndProgress() {
	a.font = "100px courier";
	a.fillText("DRA DAILY:", 10, 90,200 );
	a.font = "70px courier";
	a.fillText("Our Nation Today", 230, 80, 200);
	
	
}
