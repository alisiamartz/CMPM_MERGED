/**
 * @author Alisia Martinez
 */

// THIS IS WHERE THE NEW HACKING STUFF WILL BE IMPLEMENTED

/*
 * Variables for initiation
 */
var canvas;
var h;

/*
 * DISPLAYS HACK INTERFACE 
 * (initiated when player enters correct code)
 */


function hackInter() {
	canvas = document.getElementById("hackCanvas");
	h = canvas.getContext("2d");
	// APPEARANCE TO BE RE FORMATTED LATER
	h.font = "70px courier";
	h.fillText("HACK STATS ", 150,50,250); // Title something else, even just a cute gov seal thing could work to replace
	h.font = "50px courier";

	h.fillText("YOU",100,100,180);
	h.fillText("TARGET",250,100,180);
	
	// Starts input
	h.fillText("Input: " + input, 100, 300, 100);
	
	// Player Stat Display (atack, deff, mask)
	h.font = "30px courier";
	h.fillText("ATCK "+ playerStats.atck, 100, 140, 100);
	h.fillText("DEF "+ playerStats.def, 100, 180, 100);
	h.fillText("MASK "+ playerStats.mask, 100,220,100);
	
	// Target Stat Display (atack, deff, mask)
	h.fillText("ATCK "+ enemyStats.atck, 250, 140, 100);
	h.fillText("DEF "+ enemyStats.def, 250, 180, 100);
	h.fillText("MASK "+ enemyStats.sec, 250, 220, 100);
}

/*
 * Display when player does not enter correct case Code
 */
function incorrectDisplay() {
	canvas = document.getElementById("hackCanvas");
	h = canvas.getContext("2d");
	h.font = "70px courier";
	h.fillText("INCORRECT CODE. PLEASE SEARCH DATABASE", 20,190,550);
}

/*
 * Function to clear canvas when back button is pressed to prevent overlay
 */
function clearCanvas() {
	canvas = document.getElementById("hackCanvas");
	h = canvas.getContext("2d");
	h.clearRect(0,0,590,390);
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
var DIFF = 30;
var hackBool = false;

// THIS IS WHERE THE NEW HACKING STUFF WILL BE IMPLEMENTED

/*************************************************************/
/* this function starts the hacking mechanic	 			 */
/*************************************************************/
Hack = {
	init: function(difficulty) {
		playerStats.init(genPlayer(playerStats.staticA, playerStats.staticD, playerStats.staticM));
		enemyStats.init(genEnemy(difficulty));
		
		/*
		 *	initialize the display used to inform the player of what they are typing
		 */
	},
	end: function() {
		string = "";
		hackBool = false;
		clearCanvas();
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
winLose = {
	result: function(winBool) {
		/*
		 *	initialize the display used to inform the player of a success or failure
		 */
	},
	end: function() {
		/*
		 *	remove the display used to inform the player of a success or failure
		 */
	}
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
			if (theStat == 'def' || theStat == 'mask') Hack.end();
			else this[theStat] = MIN_STATS;
			winLose.result(false);
		}
	},
	selfLwrAtck: function(deduct) {
		this.statDown('atck', deduct, boxAtck);
		/*
		 *	update the display used for attack here
		 */
	},
	selfLwrDef: function(deduct) {
		this.statDown('def', deduct, boxDef);
		/*
		 *	update the display used for defence here
		 */
	},
	selfLwrMsk: function(deduct) {
		this.statDown('mask', deduct, boxMsk);
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
		if (theStat == 'sec') {
			if (this[theStat] >= 100) Hack.end();
		}
	},
	atckUp: function() {
		this.statUp('atck', box2Atck);
		/*
		 *	initialize the display used for attack here
		 */
	},
	defUp: function() {
		this.statUp('def', box2Def);
		/*
		 *	initialize the display used for defence here
		 */
	},
	secUp: function() {
		this.statUp('sec', box2Sec);
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
			if (theStat == 'def') Hack.end();
			else this[theStat] = MIN_STATS;
			winLose.result(true);
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

var enemyActions = [
	enemyStats['atckUp'],
	enemyStats['defUp'],
	enemyStats['secUp'],
	enemyStats['enemyLwrAtck'],
	enemyStats['enemyLwrDef'],
	enemyStats['enemyLwrMsk']
];
for (var i = 0; i < 5; i++) {
	enemyActions.push(enemyStats['intelligence']);
}
