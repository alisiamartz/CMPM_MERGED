/**
 * @author Alisia Martinez
 */

// THIS IS WHERE THE NEW HACKING STUFF WILL BE IMPLEMENTED

/*
 * Variables for initiation
 */
var canvas;
var h;
var hackingTask = null;

/*
 * DISPLAYS HACK INTERFACE 
 * (initiated when player enters correct code)
 */


function hackInter() {
	canvas = document.getElementById("hackCanvas");
	h = canvas.getContext("2d");
	
	// APPEARANCE TO BE RE FORMATTED LATER
	h.font = "50px courier";
	h.fillText("HACK STATS", 165,50,250); // Title something else, even just a cute gov seal thing could work to replace
	h.fillText("YOU",100,100,75);
	h.fillText("TARGET",350,100,150);
	
	// Player Stat Display (atack, deff, mask)
	h.font = "30px courier";
	h.fillText("ATCK "+ playerStats.atck, 100, 140, 200);
	h.fillText("DEF "+ playerStats.def, 100, 180, 200);
	h.fillText("MASK "+ playerStats.mask, 100,220,200);
	
	// Target Stat Display (atack, deff, mask)
	h.fillText("ATCK "+ enemyStats.atck, 350, 140, 200);
	h.fillText("DEF "+ enemyStats.def, 350, 180, 200);
	h.fillText("SEC "+ enemyStats.sec, 350, 220, 200);
	
	// Special Stat Display
	h.font = "12px courier";
	h.fillText(JSON.stringify(hackingTask['specialVars']), 5, 270);
		
	// Starts input
	h.font = "30px courier";
	h.fillText("Input: ", 5, 350, 100);
	h.fillText(input, 100, 350, 400);
	
	if (turns.turnsBool == true) {
		h.fillText("Turns Left: " + turns.turnsLeft, 100, 300, 200);
	}
}

/*
 * Display when player does not enter correct case Code
 */
function incorrectDisplay() {
	canvas = document.getElementById("hackCanvas");
	h = canvas.getContext("2d");
	h.font = "70px courier";
	if (temp.caseNum == null) {
		h.fillText("MISSION ATTEMPTED BEFORE", 20,190,550);
	} else if (temp.caseNum != null) {
		h.fillText("INCORRECT CODE. PLEASE SEARCH DATABASE", 20,190,550);
	}
}

/*
 * Function to clear canvas when back button is pressed to prevent overlay
 */
function clearCanvas() {
	canvas = document.getElementById("hackCanvas");
	h = canvas.getContext("2d");
	h.clearRect(0,0,590,390);
	console.log("canvas is going to be cleared");
}

/*
 * HACKING MECHANIC
 */

// CONSTANTS
var INC_RATIO = 1.15;
var MIN_INC = 10;
var DEDUCT_VAR = 0.05;
var MIN_STATS = 1;

// CHANGING VARIABLES
var string = "";
var DIFF = 40;	//increments by 3 everyday
var hackBool = false;
var turns = {
	turnsLeft: 0,
	turnsBool: false
};

// THIS IS WHERE THE NEW HACKING STUFF WILL BE IMPLEMENTED

/*************************************************************/
/* this function starts the hacking mechanic	 			 */
/*************************************************************/
Hack = {
	init: function(theData, difficulty) {
		playerStats.init(genPlayer(playerStats.staticA, playerStats.staticD, playerStats.staticM));
		enemyStats.init(genEnemy(difficulty));
		
		hackingTask = theData['hackType'];
		
		enemyActions = enemyType(hackingTask['enemySpecials']);
		
		/*
		 *	initialize the display used to inform the player of what they are typing
		 */
	},
	end: function() {
		string = "";
		hackBack = document.getElementById('back1').style.display = "inline";
		hackBool = false;
		faction.updateFaction(temp.diff);
	}
};
winLose = {
	result: function(winBool) {
		/*
		 *	initialize the display used to inform the player of a success or failure
		 */
		cleardisplayID();
		//faction.updateFaction(50); called in Hack.end as faction.updateFaction(temp.faction!);
		displayID();
		
		clearCanvas();
		canvas = document.getElementById("hackCanvas");
		h = canvas.getContext("2d");
		
		h.font = "70px courier";
		if (turns.turnsBool == true) {
			turns.turnsBool = false;
		}
		if (winBool == true) {
			currentStats.winNum++;
			updateReport.update(temp.reportWin);
			h.fillText("SUCCESS", 165,150,250);
			console.log("you have won " + currentStats.winNum + " times");
		} else if (winBool == false) {
			currentStats.caughtNum++;
			updateReport.update(temp.reportLose);
			h.fillText("CAUGHT", 165,150,250);
			console.log("you have lost " + currentStats.caughtNum + " times");
		}
	},
	end: function() {
		/*
		 *	remove the display used to inform the player of a success or failure
		 */
	}
};
var genPlayer = function(atck, def, mask) {
	var genArr = [];
	genArr.push(atck);
	genArr.push(def);
	genArr.push(mask);
	return new crackStats(genArr[0], genArr[1], genArr[2]);
};
var genEnemy = function(difficulty) {
	var genArr = [];
	for (var i = 0; i < 3; i++) {
		genArr.push(Math.floor(difficulty + (Math.random() * difficulty / 3)));
	}
	if (genArr[2] > 80) genArr[2] = 80;
	return new crackStats(genArr[0], genArr[1], genArr[2]);
};
var crackStats = function(atck, def, msk) {
	this.attack = atck;
	this.defense = def;
	this.mask = msk;
};
/*************************************************************/
/* this function stores player stats and commands 			 */
/*************************************************************/
playerStats = {
	atck: 50,
	def: 100,
	mask: 100,
	staticA: 50,
	staticD: 100,
	staticM: 100,
	init: function(stats) {
		this.atck = stats.attack;
		this.def = stats.defense;
		this.mask = stats.mask;
		
		/*
		 *	initialize the display used for stats here
		 */
	},
	statUp: function(theStat) {
		if (this[theStat] >= 70) this[theStat] = Math.floor(this[theStat] * (INC_RATIO + (Math.random() / 5)));
		else this[theStat] += MIN_INC;
	},
	atckUp: function() {
		this.statUp('atck');
		/*
		 *	update the display used for attack here
		 */
	},
	defUp: function() {
		this.statUp('def');
		/*
		 *	update the display used for defence here
		 */
	},
	maskUp: function() {
		this.statUp('mask');
		/*
		 *	update the display used for mask here
		 */
	},
	enemyLwrAtck: function() {
		enemyStats.selfLwrAtck(20);
	},
	enemyLwrDef: function() {
		enemyStats.selfLwrDef(this.atck);
	},
	enemyLwrSec: function() {
		enemyStats.selfLwrSec(10);
	},
	statDown: function(theStat, deduct) {
		if (theStat == 'def') this[theStat] -= deduct;
		else this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
		if (this[theStat] < MIN_STATS) {
			if (theStat == 'def') {
				Hack.end();
				winLose.result(false);
			} else if (theStat == 'mask' && turns.turnsBool == false) {
				turns.turnsLeft = 5;
				turns.turnsBool = true;
			}
			else this[theStat] = MIN_STATS;
		}
	},
	selfLwrAtck: function(deduct) {
		this.statDown('atck', deduct);
		/*
		 *	update the display used for attack here
		 */
	},
	selfLwrDef: function(deduct) {
		this.statDown('def', deduct);
		/*
		 *	update the display used for defence here
		 */
	},
	selfLwrMsk: function(deduct) {
		this.statDown('mask', deduct);
		/*
		 *	update the display used for mask here
		 */
	},
	end: function() {
		/*
		 *	clear the displays used for stats here, if they are instances then remove them
		 */
	}
};
/*************************************************************/
/* this function stores enemy stats and commands 			 */
/*************************************************************/
enemyStats = {
	atck: 5,
	def: 10,
	sec: 10,
	init: function(stats) {
		this.atck = stats.attack;
		this.def = stats.defense;
		this.sec = stats.mask;
		
		/*
		 *	initialize the display used for stats here
		 */
	},
	statUp: function(theStat) {
		if (this[theStat] >= 70) this[theStat] = Math.floor(this[theStat] * (INC_RATIO + (Math.random() / 5)));
		else this[theStat] += MIN_INC;
		if (theStat == 'sec' && turns.turnsBool == false) {
			if (this[theStat] >= 100) {
				turns.turnsLeft = 5;
				turns.turnsBool = true;
			}
		}
	},
	atckUp: function() {
		this.statUp('atck');
		/*
		 *	initialize the display used for attack here
		 */
	},
	defUp: function() {
		this.statUp('def');
		/*
		 *	initialize the display used for defence here
		 */
	},
	secUp: function() {
		this.statUp('sec');
		/*
		 *	initialize the display used for sec(enemy equivalent for mask in some aspect) here
		 */
	},
	enemyLwrAtck: function() {
		playerStats.selfLwrAtck(20);
	},
	enemyLwrDef: function() {
		playerStats.selfLwrDef(this.atck);
	},
	enemyLwrMsk: function() {
		playerStats.selfLwrMsk(10);
	},
	statDown: function(theStat, deduct) {
		if (theStat == 'def') this[theStat] -= deduct;
		else this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
		if (this[theStat] < MIN_STATS) {
			if (theStat == 'def') {
				Hack.end();
				winLose.result(true);
			} else this[theStat] = MIN_STATS;
		}
	},
	intelligence: function() {
		if (this.atck > playerStats.def) {
			this.enemyLwrDef();
		} else if (this.atck < playerStats.atck) {
			this.enemyLwrAtck();
		} else if (this.sec < playerStats.mask) {
			this.enemyLwrMsk();
		} else if (this.def < playerStats.atck) {
			this.defUp();
		} else if (this.def > playerStats.def) {
			this.atckUp();
		} else {
			this.secUp();
		}
	},
	selfLwrAtck: function(deduct) {
		this.statDown('atck', deduct);
		/*
		 *	update the display used for attack here
		 */
	},
	selfLwrDef: function(deduct) {
		this.statDown('def', deduct);
		/*
		 *	update the display used for defence here
		 */
	},
	selfLwrSec: function(deduct) {
		this.statDown('sec', deduct);
		/*
		 *	update the display used for sec(enemy equivalent for mask in some aspect) here
		 */
	},
	end: function() {
		/*
		 *	clear the displays used for stats here, if they are instances then remove them
		 */
	}
};

// enSpecial: special actions to give enemy
var enemyType = function (enSpecial) {
	outArrrrr = [
	enemyStats['atckUp'],
	enemyStats['defUp'],
	enemyStats['secUp'],
	enemyStats['enemyLwrAtck'],
	enemyStats['enemyLwrDef'],
	enemyStats['enemyLwrMsk']
	];
	for (var i = 0; i < 5; i++) {
		outArrrrr.push(enemyStats['intelligence']);
	}
	outArrrrr = outArrrrr.concat(enSpecial);
	return outArrrrr;
};
var enemyActions = enemyType([]);
