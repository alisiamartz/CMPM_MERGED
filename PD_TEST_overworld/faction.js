/*
 *	To use this function, you just call updateEmailArray.init() to update emailPreviewArray with data
 *	for that specific day, when implemented. Use updateEmailArray.clear() at the end of every day.
 */
var DAY = 1;
var HACK_WIN = false;
var emailPreviewArray = [];
faction = {
	pos: 80,
	updateFaction: function(num) {
		if (this.pos < 100 || this.pos > 0) {
			this.pos += num;
			if (this.pos > 100) this.pos = 100;
			else if (this.pos < 0) this.pos = 0;
		}
	}
};
updateEmailPreviewArray = {
	currentMission: null, // make this equate to the email mission that is accepted
	init: function() {
		for(var i = 0; i < 5; i++) {
			emailPreviewArray.push(new emailPreview(getData(i)));
		}
	},
	updateReport: function(winBool) {
		//<--------------------------------------------- called by the winLose function
		// calls updateReport.update(string); depending on if win or lose
	},
	clear: function() {
		// used at the end of the day to use array for the next day
		emailPreviewArray.length = 0;
	}
};
function emailPreview( data ) {
	this.sender = data[0];
	this.date = data[1];
	this.subject = data[2];
	this.content = data[3];
	this.reportWin = data[4];		// if the player completes the level then send the data to report
	this.reportLose = data[5];
}
function getData(emailNum) {
	if (DAY == 1) {
		if(faction.pos) {
			if (emailNum == 0) {
				return ["Jill", "XX/XX/XX15", "Bon Chon Chicken",
					"Hungry hungry, give me yummy gummy, tummy hungry!",
					"chicken wings are becoming hot", "chicken wings are not becoming hot!"];
			} else if (emailNum == 1) {
				return ["Plankton", "XX/XX/XX15", "Gimme Formula",
					"Ravioli, ravioli, give me the formuoli!",
					"Plankton killed Krabs", "Plankton was killed by Krabs"];
			} else if (emailNum == 2) {
				return ["Plankton", "XX/XX/XX15", "Gimme Formula",
					"Ravioli, ravioli, give me the formuoli!",
					"Plankton killed Krabs", "Plankton was killed by Krabs"];
			} else if (emailNum == 3) {
				return ["Government", "XX/XX/XX15", "New Assignment",
					"Find and terminate Jack Nicoli's brother's server",
					"Government got no swag!", "Government swagged out!"];
			} else if (emailNum == 4) {
				return ["Justice", "XX/XX/XX15", "HELP",
					"A local woman has been hacked and had her privacy invaded" +
					", we ask of you to take those photos back from Jack Daniel of Big Tech Enterprise",
					"Down with Justice!", "Justice FTW!"];
			}	//may update to create an array that specifies, which email to get but is the same as this
				//just less manual
		}
	}
}
/******************************************************************************************/
/******************************************************************************************/
var databaseArray = [];
function Person(name, diff, occ, netWorth, IP, image, note) {
	this.name = name;
	this.diff = diff;
	this.occ = occ;
	this.netWorth = netWorth;
	this.image = image;
	this.note = note;
}
databasebArrayObject = {
	init: function() {
		for(var i = 0; i < 50; i++) {		//manually put number larger than how much data there are
			temp = getID(i);
			if (temp != null) {
				databaseArray.push(new Person(getID(i)));
			}
		}
	},
	clear: function() {
		//may not need since databaseArray is always needed
		databaseArray.length = 0;
	}
};
function getID(person) {
	switch(person) {
		case 1:
			return ["Name; Jack Nicoli", "Difficulty: 3/10", "Occupation: Anti-Americk Group", "Net Worth: $ 1.5 million", "http://i.imgur.com/3yEtel6.jpg",
					"Note: [No Data]"];
		case 2:
			return ["Name: Jack Daniel", "Difficulty: 2/10", "Occupation: Lead Programmer at Big Tech Enterprise", "Net Worth: $ 1 million", "http://i.imgur.com/3yEtel6.jpg",
					"Note: ID 9980, Charged for involvement in two instances of terrorism, but was bailed by Big Tech Enterprise"];
		default:
			return null;
	}
}
databasebArrayObject.init();
/******************************************************************************************/
/******************************************************************************************/
var progressReport = "";
updateReport() = {
	update: function(newStr) {
		progressReport += newStr;	// needs to be called by email or some shit after a win or loss
	}
}
/******************************************************************************************/
/******************************************************************************************/
function getFriendDialogue() {
	if (DAY == 1) {
		if (faction.pos >= 0 && faction.pos < 40) //return "string";
		else if (faction.pos >= 40 && faction.pos < 60) //return "string";
		else if (faction.pos >= 60 && faction.pos <= 100) //return "string";
	} else if (DAY == 2) {
	
	} else if (DAY == 3) {
	
	} else if (DAY == 4) {
	
	} else if (DAY == 5) {
	
	} else if (DAY == 6) {
	
	} else if (DAY == 7) {
	
	} else return null;
}
