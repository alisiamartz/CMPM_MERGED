/*
 *	updateEmailPreviewArray.init() should be called at the beginning of every day	<--- easy to implement
 *	updateEmailPreviewArray.clear() should be called at the end of every day	<--- easy to implement
 *	DAY should increase by one at the end of every day	<--- easy to implement
 *	databasebArrayObject.init() is called once	<--- easiest to implement
 *	faction.updateFaction(number of increase of decrement) should be called every time a mission a completed	<--- tedious, may need to add extra variable in email
 *	updateReport.update(either email.reportWin or email.reportLose) needs to be called by email or temp or some shit after a win or loss	<--- tricky
 *	IF you want to show faction as a string, the affiliation variable within the faction object will automatically update that string
 *	To get the string for the end of the day, use the variable progressReport
 */
var DAY = 1;
//var HACK_WIN = false;
var emailPreviewArray = [];

faction = {
	affiliation: "Government",
	pos: 80,
	updateFaction: function(num) {
		this.pos += num;
		if (this.pos > 100) {this.pos = 100;}
		else if (this.pos < 0) {this.pos = 0;}
		if (this.pos >= 60 && this.pos <= 100) {
			this.affiliation = "Government";
		} else if (this.pos >= 40 && this.pos < 60) {
			this.affiliation = "Neutral";
		} else if (this.pos >= 0 && this.pos < 40) {
			this.affiliation = "Anti-government";
		}
	}
};

updateEmailPreviewArray = {
	currentMission: null, // make this equate to the email mission that is accepted
	init: function() {
		for(var i = 1; i <= 5; i++) {
			emailPreviewArray.push(new emailPreview(getData(i)));
		}
	},
	updateReport: function(winBool) {
		//<--------------------------------------------- called by the winLose function
		// calls updateReport.update(string); depending on if win or lose - I can do this later
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
	this.caseNum = data[4];
	this.reportWin = data[5];		// if the player completes the level then send the data to report
	this.reportLose = data[6];
}

function getData(emailNum) {
	if (DAY == 1) {
		if(faction.pos) {
			if (emailNum == 1) {
				return ["Supervisor Tresha Brannon", "June 24", "TASK", 
				"There have been hundreds of reports on the trial of Devan MacDougall’s for rigging a national sport championship. Plant the attached evidence in MacDougall’s machine and security will take care of the rest.", 
				"0905", "MacDougall lost his chance at freedom as citizens press for his imprisonment.", 
				"MacDougall was released for his last day in court, which has caused an uproar within several counties."];
			} else if (emailNum == 2) {
				return ["Supervisor Tresha Brannon", "June 24", "TASK", 
				"Recent events have given Devan MacDougall notoriety and citizens want MacDougall stripped of everything so let us give them what they want. Gather MacDougall’s past criminal nude photos and bring it to light on the net.", 
				"0945", "public hatred for MacDougall has risen once again after the subject got his photos leaked to the public. Public shaming of MacDougall has been at an all time high.", ""];
			} else if (emailNum == 3) {
				return ["Supervisor Tresha Brannon", "June 24", "TASK", 
				"Some rebel scum named Ellis McFarlane is showing up with an account for smuggling drugs. No orders were sent for his case but under my care he will be punished. Go into the files and bring to the public his previous case for stealing Orange electronic goods.", 
				"1102", "the case of Ellis McFarlane’s old theft charges have resurfaced within the online community for reasons unknown as of now aside from garnering attention from the press", "Ellis McFarlane’s final trial ended with no sign of conviction."];
			} else if (emailNum == 4) {
				return ["Supervisor Tresha Brannon", "June 24", "TASK", 
				"Yet another rebel scum going against the law. The name is Lino Archer: accused of providing illegal fighter jet lessons. Working for terrorist groups most likely. Gather some evidence against this guy and report it back to nearby law enforcers.", 
				"9422", "retired veteran and local flying instructor, Lino Archer, is sentenced to jail without trial for suspicion of being a terrorist.", ""];
			} else if (emailNum == 5) {
				return ["Supervisor Tresha Brannon", "June 24", "TASK", 
				"Katerina Bove, a Child Care Worker, was recently found with possessions of cannabis. Unfortunately she won’t comply to our questions. Find her residence and report all necessary information to the local force to drag her into questioning.", 
				"9859", "Katerina Bove, who was recently caught possessing infinitesimal amounts of cannabis was also found concealing copious amounts of narcotics earlier today." , "Katerina Bove who was recently caught possessing infinitesimal amounts of cannabis has been let off from all charges."];
			}
		}
	}
}

/******************************************************************************************/
/******************************************************************************************/
//var databaseArray = [];
var databaseUnit = function(name, occ, netWorth, image, note) {
	this.name = name;
	this.occ = occ;
	this.netWorth = netWorth;
	this.image = image;
	this.note = note;
};

databasebArrayObject = {
	init: function() {
		for(var i = 1; i < 25; i++) {		//manually put number larger than how much data there are
			var tempp = getID(i);
			if (tempp != null) {
				databaseArray.push(new databaseUnit(getID(i)));
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
			return ["Name: Aaron Johnson", "Occupation: Panoi Ambassador", "Net Worth: 150.000", "TEMP", 
			"Note: case 0331 elicited panoi slave trafficking"];
		case 2:
			return ["Name: Trista Hedley", "Occupation: Civil Servant", "Net Worth: 50.000", "TEMP", 
			"Note: case 1123 failure to commit with schedule, case 1150 caught trespassing local homes"];
		case 3:
			return ["Name: Amelia Rana", "Occupation: Information Specialist", "Net Worth: 10.000", "TEMP", 
			"Note: case 9760 publically caught selling private information, case 9780 failure to abide by official ethical conducts"];
		case 4:
			return ["Name: Nhung Rhier", "Occupation: State Security Programme", "Net Worth: 20.000", "TEMP", 
			"Note: case 9910 unlawful possession of marijuana and traces of cocaine"];
		case 5:
			return ["Name: Brigham Tsukino", "Occupation: Politician", "Net Worth: 80.000", "TEMP", 
			"Note: case 6628 accused of corporate bribery, case 7444 unlawful possession of firearm"];
		case 6:
			return ["Name: Kelsie Toxell", "Occupation: Reporter", "Net Worth: 70.000", "TEMP", 
			"Note: case 3709 sued for withholding information from the public"];
		case 7:
			return ["Name: Jennifer Wragge", "Occupation: Corporate Attorney", "Net Worth: 150.000", "TEMP", 
			"Note: case 1147 accused of forging evidence, case 1286 caught promoting a suicide attempt"];
		case 8:
			return ["Name: Dinah Senft", "Occupation: NSS Technician", "Net Worth: 200.000", "TEMP", 
			"Note: case 6890 accused of stalking public figure"];
		case 9:
			return ["Name: Fawn Murdok", "Occupation: Chief of NSS", "Net Worth: 250.000", "TEMP", 
			"Note: case 6513 accused of corporate blackmailing"];
		case 10:
			return ["Name: Devan MacDougall", "Occupation: Amtrak Operator", "Net Worth: 2.000", "TEMP", 
			"Note: case 0905 tampering with a sports contest, case 0945 public nudity"];
		case 11:
			return ["Name: Jaslyn Vitali", "Occupation: Doctor", "Net Worth: 15.000", "TEMP", 
			"Note: case 0707 illegal distribution of drugs to patients"];
		case 12:
			return ["Name: Janella Earl", "Occupation: Grave Digger", "Net Worth: 550", "TEMP", 
			"Note: case 0107 convicted of shoplifting, case 120 sued for grave robbing"];
		case 13:
			return ["Name: Marlin Amadori", "Occupation: Stockbroker", "Net Worth: 70.000", "TEMP", 
			"Note: case 7708 accused of stock manipulation"];
		case 14:
			return ["Name: Yoko Wyndham", "Occupation: Taxi Driver", "Net Worth: 4.000", "TEMP", 
			"Note: case 3122 convicted for work-related sex scandal, case 3587 sued for sexual assault"];
		case 15:
			return ["Name: Ellis McFarlane", "Occupation: unknown", "Net Worth: 10", "TEMP", 
			"Note: case 1102 stole orange electronic goods, case 1108 vandalized city hall, case 1109 accused of smuggling drugs"];
		case 16:
			return ["Name: Lino Archer", "Occupation: Flying Instructor", "Net Worth: 780", "TEMP", 
			"Note: case 9422 accused of providing illegal fighter jet lessons"];
		case 17:
			return ["Name: Katerina Bove", "Occupation: Child Care Worker", "Net Worth: 5.000", "TEMP", 
			"Note: case 9859 possession of cannabis"] ;
		case 18:
			return ["Name: Martie Trueman", "Occupation:Car Mechanic", "Net Worth: 5.500", "TEMP", 
			"Note: case 4906 welfare fraud, case 4987 tax evasion"];
		case 19:
			return ["Name: Ellis Walter", "Occupation: Astrophysicist", "Net Worth: 10.500", "TEMP", 
			"Note: case 3008 perjury at a state court"];
		case 20:
			return ["Name: Raimonda Robert", "Occupation: unknown", "Net Worth: 100.000", "TEMP", 
			"Note: case 4400 unlawful fleeing a police officer in a motor vehicle, case 4401 grand larceny, case 4403 grand theft auto, case 4405 promotion of prostitution in the first degree"];
		case 21:
			return ["Name: Beatrix Coutts", "Occupation: unknown", "Net Worth: 200.000", "TEMP", 
			"Note: case 6037 massacre of 200 citizens, case 6040 mass political conspiracy, case 6041 wide spread distribution of cyanide, case 6056 mass dumping of anthrax in four major water networks"];
		default:
			return null;
	}
}

/******************************************************************************************/
/******************************************************************************************/
var progressReport = "";
updateReport = {
	reportNum: 1,	// reset to zero after displaying the string for that day
	update: function(newStr) {
		switch(this.reportNum) {	// needs to be called by email or some shit after a win or loss
			case 1:
				progressReport += "Earlier today ";
				progressReport += newStr;
				this.reportNum++;
				break;
			case 2:
				progressReport += "Following that, ";
				progressReport += newStr;
				this.reportNum++;
				break;
			case 3:
				progressReport += "Soon after, ";
				progressReport += newStr;
				this.reportNum++;
				break;
			case 4:
				progressReport += "Not to mention that ";
				progressReport += newStr;
				this.reportNum++;
				break;
			case 5:
				progressReport += "And to conclude today' report, we inform you that ";
				progressReport += newStr;
				progressReport += "This has been your Daily Digest, farewell and good night friends!";
				break;
			default:
				break;
		}
	},
	clear: function() {
		progressReport = "";
		this.reportNum = 1;
	}
};
/******************************************************************************************/
/******************************************************************************************/

/*
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
*/
