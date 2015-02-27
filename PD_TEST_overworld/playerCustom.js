/**
 * @author Alisia Martinez
 */

// Make a player object that has a name and an image.

/*
function Player(name, image) {
	this.name = name;
	this.
}
*/				
	 	var player = [];	// First element is name, second is pic choice
		var nameElement = document.getElementById("input1");
		var theName;

		function saveName() {
			theName = nameElement.value;
			player.push(theName);			
			console.log(player);
			clearNameScreen();
			picSelect();
		}
				
		var button = document.getElementById("btn");
		var welcome = document.getElementById("welcome");
		
		function clearNameScreen() {
			welcome.remove();
			nameElement.remove();
			button.remove();
		};
		
		var txt = document.getElementById('picChoose');
		var window = document.getElementById('beginCanvas');
		var pic1 = document.getElementById('picMale');
		var pic2 = document.getElementById('picFem');
		
		function picSelect() {
			clearNameScreen();
			txt.style.display = "inline";
		};
		
		var thePic;

		function savePic(pic) {
			if (pic === 'picMale'){
				thePic = pic1.src;
				console.log("player chose male");
			} else if (pic === 'picFem') {
				thePic = pic2.src;
				console.log("player chose female");
			}else {
				console.log("nothing here!");
			}
			player.push(thePic);
			console.log(thePic);
			console.log(player);
			clearPicScreen();
		};
		
		
		function clearPicScreen() {
			txt.remove();
			showInfo();
			initCard();
		};
		
		var playerName;

		function showInfo() {
			document.getElementById("nameShow").style.display = "inline";
			playerName = player[0];
			document.getElementById("playName").value = playerName;
		};
		
		var card = document.getElementById('playerCard'); 
		var c = card.getContext('2d');
		
		function initCard(name, img) {
			document.getElementById("playerCard").style.display = "inline";
			document.getElementById("confirm").style.display = "inline";
			name = player[0];
			img = player[1];
			console.log(name);
			console.log(img);
			seal = new Image();
			seal.src = "http://i.imgur.com/dlRKNsf.png";
			seal.onload = function() {
				c.strokeStyle = 'black';
				c.drawImage(seal, 40, 135, 50,50 );
			};
			playerImage = new Image();
			playerImage.src = img;
			playerImage.onload = function() {
    			c.strokeStyle = 'black';
   				c.drawImage(playerImage, 20, 20, 100,100); 
			};	
			c.font = "30px courier";
			c.fillText(name, 130, 40, 250);
			c.fillText("NSA Hacker", 130, 70, 250);
		}
	
		var gamecanvas = document.getElementById("gameCanvas");
		
		function loadInter(name, img) {
			document.getElementById("beginCanvas").style.display = "none";
			document.getElementById("gameCanvas").style.display = "block";
			document.getElementById("gameCanvas").style.fontSize = 12; 
		}	
	