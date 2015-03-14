var hackMission = function () {
	
	// contains mission-specific player actions
	this.playerSpecials = {};
	
	// contains mission-specific enemy actions
	this.enemySpecials = [];
	
	// contains mission-specific variables
	this.specialVars = {};
	
};

var webcam = function () {
	
};

// Database Operation: add, delete, and/or find entries from a database
// entAdd: entries to add
// entDel: entries to delete
// entFind: entries to find
// like 'Get Dirt' except with multiple processes that require only one command instead of two
var dataOp = function (entAdd, entDel, entFind) {
	
	var outTask = new hackMission();
	var dataEntActs = outTask.playerSpecials;
	var entVars = outTask.specialVars;
	
	dataEntActs['ADD'] = function () {
		if (!entVars['process']) {
			entVars['process'] = (entVars['addsLeft'] > 0);
			entVars['addsLeft']--;
		}
	};
	
	dataEntActs['DELETE'] = function () {
		if (!entVars['process']) {
			entVars['process'] = (entVars['delsLeft'] > 0);
			entVars['delsLeft']--;
		}
	};
	
	dataEntActs['FIND'] = function () {
		if (!entVars['process']) {
			entVars['process'] = (entVars['findsLeft'] > 0);
			entVars['findsLeft']--;
		}
	};
	
	var theProcess = function () {
		if (entVars['process']) {
			if (entVars['addsLeft'] <= 0 && entVars['delsLeft'] <= 0 && entVars['findsLeft'] <= 0) {
				Hack.end();
				winLose.result(true);
			} else {
				dirtVars['process'] = false;
			}
			
		} else {
			enemyActions[Math.floor(Math.random() * enemyActions.length)].call(enemyStats);			
		}
	};
	
	for(var i = 0; i < 5; i++) {
		outTask.enemySpecials.push(theProcess);
	}
	
	if (entAdd >= 4) {
		entVars['addsLeft'] = 3;
	} else if (entAdd >= 0) {
		entVars['addsLeft'] = Math.floor(entAdd);
	} else {
		entVars['addsLeft'] = 0;
	}
	if (entDel >= 4) {
		entVars['delsLeft'] = 3;
	} else if (entDel >= 0) {
		entVars['delsLeft'] = Math.floor(entDel);
	} else {
		entVars['delsLeft'] = 0;
	}
	if (entFind >= 4) {
		entVars['findsLeft'] = 3;
	} else if (entFind >= 0) {
		entVars['findsLeft'] = Math.floor(entFind);
	} else {
		entVars['findsLeft'] = 0;
	}
	entVars['process'] = false;
	
	return outTask;
	
};

// Get Dirt: infiltrate a computer and download the desired material
// dirtAmount: determines number or downloads needed
var getDirt = function (dirtAmount) {
	
	var outTask = new hackMission();
	var dirtSetup = outTask.playerSpecials;
	var dirtVars = outTask.specialVars;
	
	// Call this first to get started
	dirtSetup['SEARCH'] = function () {
		if (!dirtVars['download']) {
			dirtVars['dirtFound'] = true;
		}
	};
	
	// Call this after search, then wait until victory or another search available
	dirtSetup['DOWNLOAD'] = function () {
		if (dirtVars['dirtFound']) {
			dirtVars['download'] = true;
			dirtVars['dirtFound'] = false;
			dirtVars['dirtLeft']--;
		}
	};
	
	var theDownload = function () {
		if (dirtVars['download']) {
			if (dirtVars['dirtLeft'] <= 0) {
				Hack.end();
				winLose.result(true);
			} else {
				dirtVars['download'] = false;
			}
			
		} else {
			enemyActions[Math.floor(Math.random() * enemyActions.length)].call(enemyStats);			
		}
	};
	
	for(var i = 0; i < 3; i++) {
		outTask.enemySpecials.push(theDownload);
	}
	
	dirtVars['dirtFound'] = false;
	dirtVars['download'] = false;
	if (dirtAmount >= 4) {
		dirtVars['dirtLeft'] = 3;
	} else if (dirtAmount >= 1) {
		dirtVars['dirtLeft'] = Math.floor(dirtAmount);
	} else {
		dirtVars['dirtLeft'] = 1;
	}
	
	return outTask;
	
};

// Upload: set up an untracable connection, then send a program, a blackmail message, incriminating data, some money, etc.  through it.
// Similar to 'Get Dirt' except initial command features repetition and only one upload is needed
var uploadThing = function () {
	
	var outTask = new hackMission();
	var blackSetup = outTask.playerSpecials;
	
	blackSetup['SETUP'] = function () {
		if (Math.random() < 0.2) {
			outTask.specialVars['SetUp'] = true;
		}
	};
	
	// Delayed victory if 'SetUp' is true, otherwise instant fail
	blackSetup['SEND'] = function () {
		if (outTask.specialVars['SetUp']) {
			outTask.specialVars['Sending'] = true;
		} else {
			Hack.end();
			winLose.result(false);
		}
	};
	
	// Victory if 'Sending' is true, does other action otherwise
	var theUpload = function () {
		if (outTask.specialVars['Sending']) {
			Hack.end();
			winLose.result(true);
			// outTask.specialVars['Sending'] = false;
		} else {
			enemyActions[Math.floor(Math.random() * enemyActions.length)].call(enemyStats);			
		}
	};
	
	for(var i = 0; i < 3; i++) {
		outTask.enemySpecials.push(theUpload);
	}
	
	outTask.specialVars['SetUp'] = false;
	outTask.specialVars['Sending'] = false;
	
	return outTask;
  
};