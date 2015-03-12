var hackMission = function () {
	
	// contains mission-specific player actions
	this.playerSpecials = {};
	
	// contains mission-specific enemy actions
	this.enemySpecials = {};
	
	// contains mission-specific variables
	this.specialVars = {};
	
};


var webcam = function () {
  
};

var getDirt = function () {
	
	var outTask = new hackMission();
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
		if (outTask.SpecialVars['SetUp'] = true) {
			
		} else {
			
		}
	};
	
	outTask.SpecialVars['SetUp'] = false;
	
	return outTask;
  
};