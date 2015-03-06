//this line is for test only, comment it out later

var INC_RATIO = 1.15;
var MIN_INC = 10;
var DEDUCT_VAR = 0.05;
var MIN_STATS = 1;

var clickables = new Array();
var hackBox = new Sprite();
var input = new Sprite();
//gInput.addKeyboardListener(input);
var string = "";
var hackBool = false;

/*************************************************************/
function HackStart(difficulty) {
	Hack = {
		boxType: null,
		countDown: null,
		init: function() {
			//playerStats.init(currentStats.hackCrack);
			playerStats.init(genPlayer(playerStats.staticA, playerStats.staticD, playerStats.staticM));
			enemyStats.init(genEnemy(difficulty));
			this.boxType = new TextBox("YOOO");
			this.boxType.fontSize = 50;
			this.boxType.x = 0;
			this.boxType.y = 230;
			world.addChild(this.boxType);
			
			this.countDown = new Clock(10, 0, this, this.end);
			this.countDown.fontSize = 50;
			this.countDown.x = 100;
			this.countDown.y = 300;
			this.countDown.startClock();
			world.addChild(this.countDown);
		},
		updateTypeBox: function(string) {
			this.boxType.text = string;
		},
		end: function() {
			playerStats.end();
			enemyStats.end();
			string = "";
			hackBool = false;
			this.countDown.remove();
		}
	};
	Hack.init();
	//for (var i = 0; i < 5; i++) {
	//	enemyActions.push(enemyStats['intelligence'])
	//}
	/*************************************************************/
	input.onKeyDown = function(key) {
		var char = String.fromCharCode(key);
		if (hackBool == true) {
			switch (key) {
				case 13:
					string = string.substring(0, string.length - 1);
					if (string.localeCompare("ATCKUP") == 0 || string.localeCompare("ATTACKUP") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.atckUp();
						//condition to increase enemy stat depending on player stat
					} else if (string.localeCompare("ATCK") == 0 || string.localeCompare("ATTACK") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.enemyLwrDef();
						//condition to increase enemy stat depending on player stat
					}  else if (string.localeCompare("ATCKDOWN") == 0 || string.localeCompare("ATTACKDOWN") == 0 || 
						string.localeCompare("ATCKDWN") == 0 || string.localeCompare("ATTACKDWN") == 0 || 
						string.localeCompare("ATCKDN") == 0 || string.localeCompare("ATTACKDN") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.enemyLwrAtck();
						//condition to increase enemy stat depending on player stat
					} else if (string.localeCompare("DEFUP") == 0 || string.localeCompare("DEFENSEUP") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.defUp();
						//condition to increase enemy stat depending on player stat
					} else if (string.localeCompare("MASKUP") == 0 || string.localeCompare("MSKUP") == 0 || 
						string.localeCompare("MSK") == 0 || string.localeCompare("MASK") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.maskUp();
						//condition to increase enemy stat depending on player stat
					} else if (string.localeCompare("SECDOWN") == 0 || string.localeCompare("SCDOWN") == 0 || 
						string.localeCompare("SECDWN") == 0 || string.localeCompare("SCDWN") == 0 || 
						string.localeCompare("SECDN") == 0 || string.localeCompare("SCDN") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.enemyLwrSec();
						//condition to increase enemy stat depending on player stat
					} else {
						playerStats.colorClear();
						enemyStats.colorClear();
						//condition to increase enemy stat depending on player stat
					}
					enemyActions[Math.floor(Math.random() * enemyActions.length)].call(enemyStats);
					string = "";
					break;
				default:
					if (string.charAt(0) == 0) string = string.substring(1);
					if (key == 8) {
						string = string.substring(0, string.length - 2);
						string += '|';
					} else {
						string = string.substring(0, string.length - 1);
						string += char + '|';
					}
					break;
			}
			Hack.updateTypeBox(string);
		}
	};
}
winLose = {
	result: function(winBool) {
		if (winBool) this.boxRes = new TextBox("Victory");
		else this.boxRes = new TextBox("Caught");
		this.boxRes.fontSize = 50;
		this.boxRes.x = 275;
		this.boxRes.y = 50;
		world.addChild(this.boxRes);
	},
	end: function() {
		boxRes.remove();
	}
};
// when either one dies, send a true or false to some function to print out winning / losing statement
/*************************************************************/
