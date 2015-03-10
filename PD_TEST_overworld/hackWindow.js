/**
 * @author Alisia Martinez
 */

// CONSTANTS
var INC_RATIO = 1.15;
var MIN_INC = 10;
var DEDUCT_VAR = 0.05;
var MIN_STATS = 1;

// CHANGING VARIABLES
var string = "";
var hackBool = false;

// THIS IS WHERE THE NEW HACKING STUFF WILL BE IMPLEMENTED
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
	statUp: function(theStat, box) {
		if (this[theStat] >= 70) this[theStat] = Math.floor(this[theStat] * (INC_RATIO + (Math.random() / 5)));
		else this[theStat] += MIN_INC;
	},
	atckUp: function() {
		this.statUp('atck', boxAtck);
		/*
		 *	update the display used for attack here
		 */
	},
	defUp: function() {
		this.statUp('def', boxDef);
		/*
		 *	update the display used for defence here
		 */
	},
	maskUp: function() {
		this.statUp('mask', boxMsk);
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
	statDown: function(theStat, deduct, box) {
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
		 *	clear the display used for stats here, if they are instances then remove them
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
	statUp: function(theStat, box) {
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
	statDown: function(theStat, deduct, box) {
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
		this.statDown('atck', deduct, box2Atck);
		/*
		 *	update the display used for attack here
		 */
	},
	selfLwrDef: function(deduct) {
		this.statDown('def', deduct, box2Def);
		/*
		 *	update the display used for defence here
		 */
	},
	selfLwrSec: function(deduct) {
		this.statDown('sec', deduct, box2Sec);
		/*
		 *	update the display used for sec(enemy equivalent for mask in some aspect) here
		 */
	},
	end: function() {
		/*
		 *	clear the display used for stats here, if they are instances then remove them
		 */
	}
};
