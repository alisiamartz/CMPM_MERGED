/*
 *	To use this function, you just call updateEmailArray.init() to update emailPreviewArray with data
 *	for that specific day, when implemented. Use updateEmailArray.clear() at the end of every day.
 */

var emailPreviewArray = [];
faction = {
	pos: 80,
	updateFaction: function(num) {
		if (this.pos < 100 || this.pos > 0) {
			this.pos += num;
			if (this.pos > 100) this.pos = 100;
			else if (this.pos < 0) this.pos = 0;
		}
	}
};
updateEmailPreviewArray = {
	init: function() {
		for(var i = 0; i < 5; i++) {
			emailPreviewArray.push(new emailPreview(getData(i)));
		}
	},
	clear: function() {
		//used at the end of the day to use array for the next day
		emailPreviewArray.length = 0;
	}
};
function emailPreview( data ) {
	this.sender = data[0];
	this.date = data[1];
	this.subject = data[2];
	this.content = data[3];
}
function getData(emailNum) {
	//if (day == ##) { implement when days are introduced successfully
		//if(faction != 0) { implement when days are introduced successfully
			if (emailNum == 0) {
				return ["Jill", "XX/XX/XX15", "Bon Chon Chicken",
					"Hungry hungry, give me yummy gummy, tummy hungry!"]
			} else if (emailNum == 1) {
				return ["Plankton", "XX/XX/XX15", "Gimme Formula",
					"Ravioli, ravioli, give me the formuoli!"]
			} else if (emailNum == 2) {
				return ["Plankton", "XX/XX/XX15", "Gimme Formula",
					"Ravioli, ravioli, give me the formuoli!"]
			} else if (emailNum == 3) {
				return ["Government", "XX/XX/XX15", "New Assignment",
					"Find and terminate Jack Nicoli's brother's server"]
			} else if (emailNum == 4) {
				return ["Justice", "XX/XX/XX15", "HELP",
					"A local woman has been hacked and had her privacy invaded" +
					", we ask of you to take those photos back from Jack Daniel of Big Tech Enterprise"]
			}	//may update to create an array that specifies, which email to get but is the same as this
				//just less manual
		//}
	//}
}
/******************************************************************************************/
/******************************************************************************************/
var people1d = [];
people1d.push(new Person("Jon Gonzalez", "Difficulty: 3/10", "Occupation: Freedom Fighter", "Net Worth: $ 1 mill", "http://i.imgur.com/3yEtel6.jpg"));
function Person(name, diff, occ, netWorth, IP, image, note) {
	this.name = name;
	this.diff = diff;
	this.occ = occ;
	this.netWorth = netWorth;
	this.image = image;
	this.note = note;
}
people1dObject = {
	init: function() {
		for(var i = 0; i < 5; i++) {		//manually put number larger than how much data there are
			temp = getID(i);
			if (temp != 0) {
				emailPreviewArray.push(new Person(getID(i)));
			}
		}
	},
	clear: function() {
		//may not need since people1d is always needed
		people1d.length = 0;
	}
};
function getID(person) {
	switch(person) {
		case 1:
			return ["Name; Jack Nicoli", "Difficulty: 3/10", "Occupation: Anti-Americk Group", "Net Worth: $ 1.5 million", "http://i.imgur.com/3yEtel6.jpg",
					"Note: [No Data]"];
			break;
		case 2:
			return ["Name: Jack Daniel", "Difficulty: 2/10", "Occupation: Lead Programmer at Big Tech Enterprise", "Net Worth: $ 1 million", "http://i.imgur.com/3yEtel6.jpg",
					"Note: Charged for involvement in two instances of terrorism, but was bailed by Big Tech Enterprise"];
			break;
		default:
			return 0;
			break;
	}
}
people1dObject.init();