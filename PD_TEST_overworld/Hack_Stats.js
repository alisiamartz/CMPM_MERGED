// Stats that affect hacking
//var crackStats = function(atck, def, spd, msk) {
var crackStats = function(atck, def, msk) {
	this.attack = atck;
	this.defense = def;
	//this.speed = spd;
	this.mask = msk;
};

// Stat functions
// generate enemy stats
var genEnemy = function(difficulty) {
	var genArr = [];
	for (var i = 0; i < 3; i++) {
		genArr.push(Math.floor(difficulty + (Math.random() * difficulty / 3)));
	}
	if (genArr[2] > 80) genArr[2] = 80;
	return new crackStats(genArr[0], genArr[1], genArr[2]);
};

var genPlayer = function(atck, def, mask) {
	var genArr = [];
	genArr.push(atck);
	genArr.push(def);
	genArr.push(mask);
	return new crackStats(genArr[0], genArr[1], genArr[2]);
};

/*************************************************************/
/* this function stores the player stats and commands */
playerStats = {
	atck: 50,
	def: 100,
	mask: 100,
	staticA: 50,
	staticD: 100,
	staticM: 100,
	increaseStat: function(theStat, increase) {		// to be used if we decide to implement status increases
		if (theStat == 'atck') this.staticA += increase;
		else if (theStat == 'def') this.staticD += increase;
		else if (theStat == 'mask') this.staticM += increase;
	},
	init: function(stats) {
		this.atck = stats.attack;
		boxAtck = new TextBox(),
		boxAtck.text = this.atck;
		boxAtck.fontSize = 50;
		boxAtck.x = 250;
		boxAtck.y = 10;
		world.addChild(boxAtck);

		this.def = stats.defense;
		boxDef = new TextBox(),
		boxDef.text = this.def;
		boxDef.fontSize = 50;
		boxDef.x = 250;
		boxDef.y = 70;
		world.addChild(boxDef);

		this.mask = stats.mask;
		boxMsk = new TextBox(),
		boxMsk.text = this.mask;
		boxMsk.fontSize = 50;
		boxMsk.x = 250;
		boxMsk.y = 130;
		world.addChild(boxMsk);

		playerStats.colorClear();
	},
	colorClear: function() {
		boxAtck.color = "#666633";
		boxDef.color = "#666633";
		boxMsk.color = "#666633";
	},
	statUp: function(theStat, box) {
		//input must be a string: the name of the variable
		//if ((this[theStat] * (INC_RATIO - 1)) >= MIN_INC) this[theStat] = Math.floor(this[theStat] * (INC_RATIO * (Math.random() / 5)));
		if (this[theStat] >= 70) this[theStat] = Math.floor(this[theStat] * (INC_RATIO + (Math.random() / 5)));
		else this[theStat] += MIN_INC;
		if (box) {
			if (box.color == "#993333") box.color = "#CC9900";
			else box.color = "#009900";
		}
	},
	atckUp: function() {
		// generate number here and update boxAtck
		this.statUp('atck', boxAtck);
		boxAtck.text = this.atck;
	},
	defUp: function() {
		// generate number here and update boxAtck
		this.statUp('def', boxDef);
		boxDef.text = this.def;
	},
	maskUp: function() {
		// generate number here and update boxAtck
		this.statUp('mask', boxMsk);
		boxMsk.text = this.mask;
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
		//input must be a string: the name of the variable
		if (theStat == 'def') this[theStat] -= deduct;
		else this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
		if (this[theStat] < MIN_STATS) {
			if (theStat == 'def' || theStat == 'mask') Hack.end();
			else this[theStat] = MIN_STATS;
			winLose.result(false);
		}
		if (box) {
			if (box.color == "#009900") box.color = "#CC9900";
			else box.color = "#993333";
		}
	},
	selfLwrAtck: function(deduct) {
		this.statDown('atck', deduct, boxAtck);
		boxAtck.text = this.atck;
	},
	selfLwrDef: function(deduct) {
		this.statDown('def', deduct, boxDef);
		boxDef.text = this.def;
	},
	selfLwrMsk: function(deduct) {
		this.statDown('mask', deduct, boxMsk);
		boxMsk.text = this.mask;
	},
	end: function() {
		boxAtck.remove();
		boxDef.remove();
		boxMsk.remove();
	}
};
/*************************************************************/
/* this function stores enemy stats and commands */
enemyStats = {
	atck: 5,
	def: 10,
	sec: 10,
	init: function(stats) {
		this.atck = stats.attack;
		box2Atck = new TextBox(),
		box2Atck.text = this.atck;
		box2Atck.fontSize = 50;
		box2Atck.x = 350;
		box2Atck.y = 10;
		world.addChild(box2Atck);

		this.def = stats.defense;
		box2Def = new TextBox(),
		box2Def.text = this.def;
		box2Def.fontSize = 50;
		box2Def.x = 350;
		box2Def.y = 70;
		world.addChild(box2Def);

		this.sec = stats.mask;
		box2Sec = new TextBox(),
		box2Sec.text = this.sec;
		box2Sec.fontSize = 50;
		box2Sec.x = 350;
		box2Sec.y = 130;
		world.addChild(box2Sec);

		enemyStats.colorClear();
	},
	colorClear: function() {
		box2Atck.color = "#666633";
		box2Def.color = "#666633";
		box2Sec.color = "#666633";
	},
	statUp: function(theStat, box) {
		//input must be a string: the name of the variable
		//if ((this[theStat] * (INC_RATIO - 1)) >= MIN_INC) this[theStat] = Math.floor(this[theStat] * (INC_RATIO * (Math.random() / 5)));
		if (this[theStat] >= 70) this[theStat] = Math.floor(this[theStat] * (INC_RATIO + (Math.random() / 5)));
		else this[theStat] += MIN_INC;
		if (theStat == 'sec') {
			if (this[theStat] >= 100) Hack.end();
		}
		if (box) {
			if (box.color == "#993333") box.color = "#CC9900";
			else box.color = "#009900";
		}
	},
	atckUp: function() {
		// generate number here and update boxAtck
		this.statUp('atck', box2Atck);
		box2Atck.text = this.atck;
	},
	defUp: function() {
		// generate number here and update boxAtck
		this.statUp('def', box2Def);
		box2Def.text = this.def;
	},
	secUp: function() {
		// generate number here and update boxAtck
		this.statUp('sec', box2Sec);
		box2Sec.text = this.sec;
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
		//input must be a string: the name of the variable
		if (theStat == 'def') this[theStat] -= deduct;
		else this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
		if (this[theStat] < MIN_STATS) {
			if (theStat == 'def') Hack.end();
			else this[theStat] = MIN_STATS;
			winLose.result(true);
		}
		if (box) {
			if (box.color == "#009900") box.color = "#CC9900";
			else box.color = "#993333";
		}
	},
	// this function has the enemyAI make intelligent decisions
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
		box2Atck.text = this.atck;
	},
	selfLwrDef: function(deduct) {
		this.statDown('def', deduct, box2Def);
		box2Def.text = this.def;
	},
	selfLwrSec: function(deduct) {
		this.statDown('sec', deduct, box2Sec);
		box2Sec.text = this.sec;
	},
	end: function() {
		box2Atck.remove();
		box2Def.remove();
		box2Sec.remove();
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