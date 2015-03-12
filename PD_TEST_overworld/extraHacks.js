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

// Get Dirt: infiltrate a computer and download the desired material
var getDirt = function () {
	
	var outTask = new hackMission();
	var dirtSetup = outTask.playerSpecials();
	var dirtVars = outTask.specialVars;
	
	dirtSetup['SEARCH'] = function () {
		if (!dirtVars['download']) {
			dirtVars['dirtFound'] = true;
		}
	};
	
	dirtSetup['DOWNLOAD'] = function () {
		if (dirtVars['dirtFound']) {
			dirtVars['download'] = true;
			dirtVars['dirtFound'] = false;
			dirtVars['dirtLeft']--;
		}
	};
	
	var theDownload = function () {
		if (outTask.SpecialVars['download']) {
			if (dirtVars['dirtLeft'] <= 0) {
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
	dirtVars['dirtLeft'] = 1 + Math.floor(Math.random() * 3);
	
	return outTask;
	
};

// Blackmail: set up an untracable connection, then send a blackmail message through it.
// Similar to 'Get Dirt' except initial command features repetition and only one upload is needed
var blackmail = function () {
	
	var outTask = new hackMission();
	var blackSetup = outTask.playerSpecials;
	
	blackSetup['SETUP'] = function () {
		if (Math.random() < 0.2) {
			outTask.SpecialVars['SetUp'] = true;
		}
	};
	
	// Delayed victory if 'SetUp' is true, otherwise instant fail
	blackSetup['SEND'] = function () {
		if (outTask.SpecialVars['SetUp']) {
			outTask.SpecialVars['Sending'] = true;
		} else {
			winLose.result(false);
		}
	};
	
	// Victory if 'Sending' is true, does other action otherwise
	var theUpload = function () {
		if (outTask.SpecialVars['Sending']) {
			winLose.result(true);
		} else {
			enemyActions[Math.floor(Math.random() * enemyActions.length)].call(enemyStats);			
		}
	};
	
	for(var i = 0; i < 3; i++) {
		outTask.enemySpecials.push(theUpload);
	}
	
	outTask.SpecialVars['SetUp'] = false;
	outTask.SpecialVars['Sending'] = false;
	
	return outTask;
  
};