/**
 * playerCustom.js
 * 
 * Deals with the player customization code 
*/		
// ALL VARIABLES FOR THIS FILE		
	 	var player = [];	// First element is name, second is pic choice
		var nameElement = document.getElementById("input1");
		var button = document.getElementById("btn");
		var welcome = document.getElementById("welcome");
		var txt = document.getElementById('picChoose');
		var window = document.getElementById('beginCanvas');
		var pic1 = document.getElementById('picMale');
		var pic2 = document.getElementById('picFem');
		var card = document.getElementById('playerCard'); 
		var playerName;
		var c = card.getContext('2d');		
		
		var parag;
		var n;
		var e;
		
// Saves the name into an array and calls the icon selection screen		
		function saveName() {
			
			if (nameElement.value === "" || nameElement.value === " " || nameElement.value === "  ") {
				//parag = document.createElement("p");
				//n = document.createTextNode("Please enter in valid username.");
				//parag.appendChild(n);
				//e = document.getElementById("beginCanvas");
				//e.appendChild(parag);
				
			} else {
				//e.removeChild(parag);
				currentStats.theName = nameElement.value;
				player.push(currentStats.theName);			
				console.log(player);
				picSelect();
			}

		}
		
// Removes elements from name screen
		function clearNameScreen() {
			welcome.remove();
			nameElement.remove();
			button.remove();
		};
		
// Makes sure screen is clear before displaying picture choices
		function picSelect() {
			clearNameScreen();
			txt.style.display = "inline";
		};

// Saves the selected picture into the player array
		function savePic(pic) {
			if (pic === 'picMale'){
				currentStats.thePic = pic1.src;
				console.log("player chose male");
			} else if (pic === 'picFem') {
				currentStats.thePic = pic2.src;
				console.log("player chose female");
			}else {
				console.log("nothing here!");
			}
			player.push(currentStats.thePic);
			console.log(currentStats.thePic);
			console.log(player);
			clearPicScreen();
		};
		
// Clears the picture screen and displays ID card display		
		function clearPicScreen() {
			txt.remove();
			//showInfo();
			initCard();
		};

// Displays the player information onto the ID card
/*
		function showInfo() {
			document.getElementById("nameShow").style.display = "inline";
			playerName = player[0];
			document.getElementById("playName").value = playerName;
		};
*/	
// ID Card function, turns card into separate canvas
		function initCard(name, img) {
			document.getElementById("playerCard").style.display = "inline";
			document.getElementById("confirm").style.display = "inline";
			name = player[0];
			img = player[1];
			console.log(name);
			console.log(img);
			seal = new Image();
			seal.src = "images/sealIcon.PNG";
			seal.onload = function() {
				c.strokeStyle = 'black';
				c.drawImage(seal, 20, 130, 90,60 );
			};
			playerImage = new Image();
			playerImage.src = img;
			playerImage.onload = function() {
    			c.strokeStyle = 'black';
   				c.drawImage(playerImage, 20, 20, 100,100); 
			};	
			c.font = "30px courier";
			c.fillText(name, 130, 40, 250);
			c.fillText("National Security Service Hacker", 130, 70, 269);
		}

// Loads main game interface, with name and img as parameters
		function loadInter() {
			document.getElementById("saveMenu").style.display = "none";
			document.getElementById("beginCanvas").style.display = "none";
			document.getElementById("gameCanvas").style.display = "block";
		}	
	
function loadCustom() {
	document.getElementById('mainMenu').style.display = "none";
	document.getElementById("beginCanvas").style.display = "block";
	startGame(null);
	console.log("NEW GAME STARTED");
}

function loadSaves(){
	console.log("SAVES TO BE LOADED HERE, CLICK START NEW ONE FOR NOW");
	document.getElementById('mainMenu').style.display = "none";
	document.getElementById("saveMenu").style.display = "block";
}

function backMenu() {
	console.log("BACK TO MAIN MENU");
	document.getElementById('saveMenu').style.display = "none";
	document.getElementById('mainMenu').style.display = "block";
	
}

