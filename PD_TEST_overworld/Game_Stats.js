// general rule of thumb: anything that carries across days or should be saved goes here

// name of cookie containing names of saved data
var SAVE_STATS_NAME = "saveDataNames";

// Stats that affect hacking
var crackStats = function(atck, def, spd, msk) {
  this.attack = atck;
  this.defense = def;
  this.speed = spd;
  this.mask = msk;
};

var gameHackStats = function() {
  // important stats
  
  // Current day. Every week starts with Monday
  this.theDay = 0;
  // positive numbers closer to government, negative numbers closer to freedom fighters
  this.govAlignment = 30;
  // The hacker's budget
  this.money = 100;
  // The hacker's hacking stats
  this.hackCrack = new crackStats(5, 5, 5, 5);
  
  // other stats
  
  // Targets Hacked
  this.targetNum = 0;
  // Successful Hacks
  this.winNum = 0;
  // Times Caught
  this.loseNum = 0;
  // Money Earned
  this.totalEarn = 0;
  

};

// current game stats
var currentStats = null;

// array containing cookies
var allCookies = document.cookie.split(';');

// names of saved game stats stored in a two-dimensional array
// since loading a day 0 game would be the same as starting a new game,
// only games at day one or later are saved
var saveNames = [];
for (var i = 0; i < allCookies.length; i++) {
	var theSweet = allCookies[i];
	while(theSweet.charAt(0) == ' ') {
		theSweet = theSweet.substring(1);
	} if (theSweet.indexOf(SAVE_STATS_NAME + "=") == 0) {
		saveNames = JSON.parse(theSweet.substring(SAVE_STATS_NAME.length + 1, theSweet.length));
		break;
	}
}
if (saveNames.length == 0) {
	for (var i = 0; i < 6; i++) {
		saveNames.push([]);
	} for (var i = 0; i < allCookies.length; i++) {
		var ghostSweet = allCookies[i];
		document.cookie = ghostSweet.split("=")[0] + "=; expires=Tue, 06 Jan 2015 00:00:00 UTC";
	}
}

// Stat functions

// generate enemy stats
var genEnemy = function(difficulty) {
  var genArr = [];
  for (var i = 0; i < 4; i++) { genArr.push(Math.floor(difficulty + (Math.random() * difficulty) ) ) }
  return new crackStats(genArr[0], genArr[1], genArr[2], genArr[3]);
};

// searches for saved game data's name based on findName
// returns indexes as an array
function findGame(findName) {
	for (var i = 0; i < saveNames.length; i++) {
		for (var j = 0; j < saveNames[i].length; j++) {
			if (findName == saveNames[i][j]) {
				return [i, j];
			}
		}
	}
	return null;
}

// loads saved game from loadStats or starts new game if loadStats is empty
// loadStats is the name of the saved game data
function startGame(loadStats) {
  if (loadStats == null) {
    currentStats = new gameHackStats();
	return;
  } else if (!(typeof loadStats == 'string')) {
    window.alert('Error: Incompatible object. Cannot load game.');
    return;
  } for (var i = 0; i < allCookies.length; i++) {
		var theSweet = allCookies[i];
		while(theSweet.charAt(0) == ' ') {
			theSweet = theSweet.substring(1);
		} if (theSweet.indexOf(loadStats + "=") == 0) {
			currentStats = JSON.parse(theSweet.substring(loadStats.length + 1, theSweet.length));
			return;
		}
	} window.alert('Save data not found. Cannot load game.');
};

// adds save game data to saveNames

// clones the currentStats object

// since loading a day 0 game would be the same as starting a new game,
// only games at day one or later are saved
// the saved game data must have a name (parameter gameName)
function saveGame(gameName) {
	if (findGame(gameName) != null) {
	    window.alert('Save data with given name already exists.');
		return;
	}
	var i = currentStats['theDay'] - 1;
	saveNames[i].push(gameName);
	var d = new Date();
	d.setTime(d.getTime() + (365*24*60*60*1000));
	var expDate = "expires=" + d.toUTCString();
	document.cookie = SAVE_STATS_NAME + "=" + JSON.stringify(saveNames) + "; " + expDate;
	document.cookie = gameName + "=" + JSON.stringify(currentStats);
	allCookies = document.cookie.split(';');
};

// deletes save data from saveNames and pushes down save data indexed above the deleted data
// the game data to delete must have a name (parameter deleteName)
function deleteSave(deleteName) {
	// deleteIndex is one-dimensional index for saveNames
	var deleteIndex = findGame(deleteName);
	if (deleteIndex == null) {
	    window.alert('Save data with given name does not exist.');
		return;
	}
	document.cookie = deleteName + "=; expires=Tue, 06 Jan 2015 00:00:00 UTC";
	var dayIndex = deleteIndex[0];
	for (var i = deleteIndex[1]; i < saveNames[dayIndex].length - 1; i++) {
		saveNames[dayIndex][i] = saveNames[dayIndex][i + 1];
	} saveNames[dayIndex].pop();
	var d = new Date();
	d.setTime(d.getTime() + (365*24*60*60*1000));
	var expDate = "expires=" + d.toUTCString();
	document.cookie = SAVE_STATS_NAME + "=" + JSON.stringify(saveNames) + "; " + expDate;
	allCookies = document.cookie.split(';');
};

console.log(gameHackStats);
currentStats =  new gameHackStats();
console.log(currentStats);
console.log(typeof currentStats);
console.log(currentStats instanceof gameHackStats);
var JasonTest = JSON.stringify(currentStats);
console.log(JasonTest);
console.log(typeof JasonTest);
console.log(JSON.parse(JasonTest));
console.log(JSON.parse(JasonTest) instanceof gameHackStats);
console.log(document.cookie);