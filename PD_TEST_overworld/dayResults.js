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
	a.fillRect(10,120, 170,30);
	
	a.fillStyle="#eeeeee";
	a.font ="30px courier";
	a.fillText("DATE HERE",20, 145,150);
	
	a.font="60px courier";
	a.fillStyle="#000000";
	a.fillText("FIRST STORY HERE", 190, 150, 200);
	a.fillText("SECOND STORY HERE",20, 230, 200);
	a.fillText("THIRD STORY HERE",190, 310, 200);
	a.fillText("FOURTH STORY HERE",20, 390, 200);		
	a.fillText("FIFTH STORY HERE",190, 470, 200);
}
