use2D = true;
							
/*************************************************************/
/* this function can be ignored as it is just for testing */
LoadContent = function() {
	hackBox.width = 100;
	hackBox.height = 50;
	hackBox.x = 20;
	hackBox.y = 100;
	hackBox.image = Textures.load("http://www.largeyellowbutton.com/largeyellowbutton.jpg");
	clickables.push(hackBox);
	world.addChild(hackBox);

	world.addChild(input);
	gInput.addMouseDownListener(input);
	gInput.addKeyboardListener(input);
};
function Collision(obj, mouseX, mouseY) {
	var left = obj.x;
	var right = obj.x + obj.width;
	var top = obj.y;
	var bot = obj.y + obj.height;
	if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bot) {
		return true;
	}
	return false;
}
input.onMouseDown = function(button) {
	for (var click in clickables) {
		click = clickables[click];
		if (Collision(click, gInput.mouse.x, gInput.mouse.y)) {
			//Hack.init();
			hackBool = true;
			HackStart(30);
			string = "|";
		}
	}
};

LoadContent();
