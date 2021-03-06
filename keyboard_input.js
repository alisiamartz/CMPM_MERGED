/*
 *	inputs should automatically be taken in when hackBool == true;
 *	the sole variable that is keeping storing the input string is "inputs", located directly underneath
 */
var input = "";

/* object for keys and their matching keycode */
var keys = {
	backspace: [8],
	enter: [13],
	A:[65], B:[66], C:[67], D:[68], E:[69], F:[70], G:[71], H:[72], I:[73], J:[74], K:[75], L:[76], M:[77], 
	N:[78], O:[79], P:[80], Q:[81], R:[82], S:[83], T:[84], U:[85], V:[86], W:[87], X:[88], Y:[89], Z:[90]
};

/* Checks for any key input in addEventListener */
Object.prototype.getKey = function(value) {
	for (var key in this) {
		if (this[key] instanceof Array && this[key].indexOf(value) >= 0) {
			return key;
		}
	}
	return null;
};

/* checks for key input */
addEventListener("keydown", function(e) {
	lastKey = keys.getKey(e.keyCode);
	if (['enter'].indexOf(lastKey) >= 0) {
		if (hackBool == true) {
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
			}
			enemyActions[Math.floor(Math.random() * enemyActions.length)].call(enemyStats);
			input = "";
		}
	} else if (['backspace'].indexOf(lastKey) >= 0) {
		if (input != "") {
			input = input.substring(0, input.length - 1);
		}
	} else if (['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].indexOf(lastKey) >= 0) {
		input += lastKey;
	}
	
	/*
	 *	update the display for what is being typed to nothing
	 */
}, false);
