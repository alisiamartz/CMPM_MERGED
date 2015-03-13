/*
 *	inputs should automatically be taken in when hackBool == true;
 *	the sole variable that is keeping storing the input string is "inputs", located directly underneath
 */
var input = "";

/* object for keys and their matching keycode */
/*var keys = {
	backspace: [8],
	enter: [13],
	A:[65], B:[66], C:[67], D:[68], E:[69], F:[70], G:[71], H:[72], I:[73], J:[74], K:[75], L:[76], M:[77], 
	N:[78], O:[79], P:[80], Q:[81], R:[82], S:[83], T:[84], U:[85], V:[86], W:[87], X:[88], Y:[89], Z:[90]
};
*/
/* Checks for any key input in addEventListener */
/*
Object.prototype.getKey = function(value) {
	for (var key in this) {
		if (this[key] instanceof Array && this[key].indexOf(value) >= 0) {
			return key;
		}
	}
	return null;
};
*/
function getKey(value) {
	/*
	for (var key in keys) {
		console.log(key);
		/*
		if (this[key] instanceof Array && this[key].indexOf(value) >= 0) {
			return key;
		}
	}
	*/
	switch (value) {
		case 8:
			return 'backspace';
		case 13:
			return 'enter';
		case 65:
			return 'A';
		case 66:
			return 'B';
		case 67:
			return 'C';
		case 68:
			return 'D';
		case 69:
			return 'E';
		case 70:
			return 'F';
		case 71:
			return 'G';
		case 72:
			return 'H';
		case 73:
			return 'I';
		case 74:
			return 'J';
		case 75:
			return 'K';
		case 76:
			return 'L';
		case 77:
			return 'M';
		case 78:
			return 'N';
		case 79:
			return 'O';
		case 80:
			return 'P';
		case 81:
			return 'Q';
		case 82:
			return 'R';
		case 83:
			return 'S';
		case 84:
			return 'T';
		case 85:
			return 'U';
		case 86:
			return 'V';
		case 87:
			return 'W';
		case 88:
			return 'X';
		case 89:
			return 'Y';
		case 90:
			return 'Z';
	}
	return null;
}
/* checks for key input */
addEventListener("keydown", function(e) {
	lastKey = getKey(e.keyCode);
	if (hackBool == true) {
		if (['enter'].indexOf(lastKey) >= 0) {
			if (input.localeCompare("ATCKUP") == 0 || input.localeCompare("ATTACKUP") == 0) {
				
				playerStats.atckUp();
				//condition to increase enemy stat depending on player stat
			} else if (input.localeCompare("ATCK") == 0 || input.localeCompare("ATTACK") == 0) {
				
				playerStats.enemyLwrDef();
				//condition to increase enemy stat depending on player stat
			}  else if (input.localeCompare("ATCKDOWN") == 0 || input.localeCompare("ATTACKDOWN") == 0 || 
				input.localeCompare("ATCKDWN") == 0 || input.localeCompare("ATTACKDWN") == 0 || 
				input.localeCompare("ATCKDN") == 0 || input.localeCompare("ATTACKDN") == 0) {
				
				playerStats.enemyLwrAtck();
				//condition to increase enemy stat depending on player stat
			} else if (input.localeCompare("DEFUP") == 0 || input.localeCompare("DEFENSEUP") == 0) {
			
				playerStats.defUp();
				//condition to increase enemy stat depending on player stat
			} else if (input.localeCompare("MASKUP") == 0 || input.localeCompare("MSKUP") == 0 || 
				input.localeCompare("MSK") == 0 || input.localeCompare("MASK") == 0) {
				
				playerStats.maskUp();
				//condition to increase enemy stat depending on player stat
			} else if (input.localeCompare("SECDOWN") == 0 || input.localeCompare("SCDOWN") == 0 || 
				input.localeCompare("SECDWN") == 0 || input.localeCompare("SCDWN") == 0 || 
				input.localeCompare("SECDN") == 0 || input.localeCompare("SCDN") == 0) {
				
				playerStats.enemyLwrSec();
				//condition to increase enemy stat depending on player stat
			} else {
				hackMission[input].call(playerStats);
			}
			enemyActions[Math.floor(Math.random() * enemyActions.length)].call(enemyStats);
			input = "";
			--turns.turnsLeft;
			if (turns.turnsLeft == 0 && turns.turnsBool == true) {
				Hack.end();
				winLose.result(false);
			}
		} else if (['backspace'].indexOf(lastKey) >= 0) {
			if (input != "") {
				input = input.substring(0, input.length - 1);
			}
		} else if (['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].indexOf(lastKey) >= 0
				&& input.length <= 21) {
			input += lastKey;
		}
		if (hackBool == true) {
			clearCanvas();
			hackInter();
		}
	}
	/*
	 *	update the display for what is being typed to nothing
	 */
}, false);
