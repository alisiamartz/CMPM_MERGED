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

var getDirt = function () {
	
	var outTask = new hackMission();
	var dirtSetup = outTask.playerSpecials();
	
	
	
	return outTask;
	
};

// blackmail: set up an untracable connection, then send a blackmail message through it.
var blackmail = function () {
	
	var outTask = new hackMission();
	var blackSetup = outTask.playerSpecials;
	
	blackSetup['SETUP'] = function () {
		if (Math.random() < 0.2) {
			outTask.SpecialVars['SetUp'] = true;
		}
	};
	
	// Victory if 'SetUp' is true, otherwise instant fail
	blackSetup['SEND'] = function () {
		if (outTask.SpecialVars['SetUp'] == true) {
			outTask.SpecialVars['Sending'] = true;
		} else {
			winLose.result(false);
		}
	};
	
	var theUpload = function () {
		if (outTask.SpecialVars['Sending'] == true) {
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