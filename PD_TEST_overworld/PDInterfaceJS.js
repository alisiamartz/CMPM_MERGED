
/**
 * @author jy, am
 */


// JS: INTERNAL STRUCTURES, CONTENT, "EVENTS" WHEN PLAYER INTERACTS WITH INTERFACE //

/******************************************************************
 * functions that dictate how windows are toggled 
 ******************************************************************/

function toggle(window) {
	
	var el = document.getElementById(window);
	if (el.style.display == 'none') {
		el.style.display = 'block';
	} else {
		el.style.display = 'none';
	}	
}

function popup(window) {
	if (window != 'ipPopUp')	
		toggle(window);		
	else 
		downloadAttachment(window);
}

function closeAttachment() {
	console.log('close the popup');
	var el = document.getElementById('ipPopUp');
	if (el.style.display == 'block') {
		el.style.display = 'none';
	}
}


/******************************************************************
 * special toggle code that dictates how attachment windows are toggled
 * (because players shouldn't be able to "download" the attachment a second time and have the window minimize itself)
 ******************************************************************/
var attachmentCounter = 0;
function downloadAttachment(window) {
	
	attachmentCounter += 1;
	var el = document.getElementById(window);
	if (el.style.display == 'none') {
		console.log("should append now");
		ipWindow.appendChild(ipPro);
		
		el.style.display = 'block';
	} else {
		el.style.display = 'none';
	}
			
}

/******************************************************************
 * make pop ups draggable within gameCanvas
 ******************************************************************/

$(function() {
$( "#messagePopUp" ).draggable({
	containment: '#gameCanvas'
	});
});

$(function() {
$( "#terminalPopUp" ).draggable({
	containment: '#gameCanvas'
	});
});

$(function() {
$( "#ipPopUp" ).draggable({
	containment: '#gameCanvas'
	});
});


/******************************************************************
 * (FIXED?): FUNCTION CONTAINING LOGIC FOR WHICH WINDOW WILL APPEAR ON TOP AT ANY TIME 
 ******************************************************************/

function changeZIndex(id) {

	console.log("went into changezindex");

	switch(id) {
	    case "messagePopUp":
	        console.log("id is messagePopUp");
	        //change other window z index to 0
			document.getElementById("terminalPopUp").style.zIndex --;
			//document.getElementById("targetPopUp").style.zIndex -- ;
			document.getElementById("ipPopUp").style.zIndex -- ;
	    	//change z index to 1:
			document.getElementById(id).style.zIndex=50;
			
            break;
	
	    case "terminalPopUp":
	        console.log("id is terminalPopUp");	     
			document.getElementById("messagePopUp").style.zIndex --;
			//document.getElementById("targetPopUp").style.zIndex --;
			document.getElementById("ipPopUp").style.zIndex -- ;
			document.getElementById(id).style.zIndex=50;
			console.log ("message index " + document.getElementById("messagePopUp").style.zIndex);
	        break;
	        
	    case "ipPopUp":
	    	console.log("id is ipPopUp");
	    	document.getElementById("messagePopUp").style.zIndex --;
	    	document.getElementById("terminalPopUp").style.zIndex --;
	    	document.getElementById(id).style.zIndex=50;
	        break;
      
	    default:
	        console.log("default");
	        break;
	}
}

/******************************************************************
 * DISPLAYING INTERFACE AND ITEMS
 ******************************************************************/

var id = document.getElementById('playerID');
var d = id.getContext('2d');
var pName;
var pImg;

// Function to display play id card to main interface (NOT INCLUDING FACTION AFFILIATION)
function displayID() {	
		pName = player[0];
		pImg = player[1];
		console.log(pName);
		console.log(pImg);
		seal = new Image();
		seal.src = "http://i1377.photobucket.com/albums/ah47/PublicDomainGame/smallSeal_zpsvvhlslcv.png";
		seal.onload = function() {
			d.strokeStyle = 'black';
			d.drawImage(seal, 15, 125, 90,60 );
		};
		playerImage = new Image();
		playerImage.src = pImg;
		playerImage.onload = function() {
    		d.strokeStyle = 'black';
   			d.drawImage(playerImage, 15, 15, 100,100); 
		};	
		d.font = "30px courier";
		d.fillText(pName, 120, 40, 205);
		d.fillText("NSS Hacker", 120, 70, 250);
		d.fillText('GOV: (AFFILIATION HERE)', 120, 130, 205);
		d.fillText('ANTI: (AFFILIATION HERE)', 120, 160, 205);
		
}


/******************************************************************
 * RENDERING"(appending) DATA FROM JS INTO TEXT OUTPUT ON THE INTERFACE
 * // http://www.w3schools.com/js/js_htmldom_nodes.asp
// http://www.w3schools.com/jsref/met_node_appendchild.asp
// VERSATILE METHOD THAT CAN BE ADAPTED!
 ******************************************************************/
var stuff;
var node2;
var elmnt;
	
function appendToTerminalWindow(){
	stuff = document.createElement("p");
	//node2 = document.createTextNode("this is the terminal window!!!");
	//stuff.appendChild(node2);
	//elmnt = document.getElementById("terminalPopUp");
	//elmnt.appendChild(stuff);
}


var people1d = [];
// TARGETS FOR TESTING 2 MAIN MISSIONS
people1d.push(new Person("Jon Gonzalez", "Difficulty: 3/10", "Occupation: Freedom Fighter", "Net Worth: $ 1 mill", "http://i.imgur.com/3yEtel6.jpg"));
people1d.push(new Person("Ben York", "Difficulty: 5/10", "Occupation: Wall Street broker", "Net Worth: $ 3.5 mill", "http://i.imgur.com/3yEtel6.jpg"));

// Random targets to make sure it worked, ignore for now
people1d.push(new Person("fernando", "5 STARS", "Nerd", "$21847947892", "http://i.imgur.com/3yEtel6.jpg"));
people1d.push(new Person("ipanema", "5 STARS", "Nerd", "$21847947892", "http://i.imgur.com/3yEtel6.jpg"));
people1d.push(new Person("marry me", "5 STARS", "Nerd", "$21847947892", "http://i.imgur.com/3yEtel6.jpg"));
people1d.push(new Person("archieo", "5 STARS", "Nerd", "$21847947892", "http://i.imgur.com/3yEtel6.jpg"));


var people2d = [];

var people3d = [];

var people4d = [];

var people5d = [];


function Person(name, diff, occ, netWorth, IP, image) {
	this.name = name;
	this.diff = diff;
	this.occ = occ;
	this.netWorth = netWorth;
	this.image = image;

}

var para; 
var node;
var element;
	
function appendToMessageWindow(){
	para = document.createElement("p");
	//node = document.createTextNode("this is the message window!!!!");
	//para.appendChild(node);	
	element = document.getElementById("messagePopUp");
	element.appendChild(para);
	
}

var par;
var txt;
var el;

function appendToIpPopUp() {
	par = document.createElement("p");
	console.log(temp.name);
	txt = document.createTextNode("Target is: " + temp.name);
	par.appendChild(txt);
	el = document.getElementById("targetName");
	el.appendChild(par);
	
}


/******************************************************************
 * EMAIL CODE
 * 
 * AN ARRAY THAT STORES ALL EMAIL CONTENT (STUFF THAT APPEARS IN THE SUBJECT BOX AND THE ACTUAL MAXIMIZED CONTENT)
 ******************************************************************/

var emailPreviewArray = [];

emailPreviewArray.push(new emailPreview(["*NEW ASSIGNMENT*","Today","Government Target",
	"Your target is 48 year old Jon Gonzalez. Gonzalez is a member of a large unorderly group"+ 
	" that has been causing much trouble lately." + " We believe that he has been illegally obtaining funds" + 
	" to power his campaign. Please look into Gonzalez further and get more information.", "2244", "report win here", "report lose here","0", "Jon Gonzalez"]));
	
emailPreviewArray.push(new emailPreview(["*NEW TASK*","Today ","We ask for help.",
	"Hello there. We have been interested in you for a while now and we are asking for help." +
	" We believe the DRA Government has made Jon Gonzalez a target." + 
	" His name and his organization have been everywhere lately, and we know the government does not approve of his objectives." +
	" Jon is a very good friend of ours, and anyone can plainly see he means more right than wrong." + 
	" We ask that you do not target Mr. Gonzalez, and instead look at a Mister Ben York." + 
	" York is a business man on Wall Street who we believe is working with the government and stealing the profit of other organizations." +
	" We trust that you will do the right thing. Iniustum non debet lucrari.    " +"     - a friend","1438", "report win here", "report lose here","1", "Ben York"]));


emailPreviewArray.push(new emailPreview([" A favor please ","date ","subject ","content "]));
emailPreviewArray.push(new emailPreview(["NEW MISSION","date ","subject ","content "]));
emailPreviewArray.push(new emailPreview(["NEW TASK ","date ","subject ","content "]));
emailPreviewArray.push(new emailPreview(["NEW MISSION"," date  ","subject ","content "]));


console.log(emailPreviewArray + "THIS EMAIL PREV");
// everything beneath this line is just for debugging purposes
printEmails(emailPreviewArray);



function printEmails(emailPreviewArray) {
	for (i=0;i<emailPreviewArray.length;i++) {
		console.log(emailPreviewArray[i].sender);
		console.log(emailPreviewArray[i].date);
		console.log(emailPreviewArray[i].subject);
		console.log(emailPreviewArray[i].content);
	}
}

/******************************************************************
 * looping function that appends data from emailArray to the email subject boxes and maximized email window
 ******************************************************************/
function appendToEmail (emailPreviewArray) {
	var emailSender;
	var emailDate;
	var emailSubject;
	var emailContent;
	var subjectBox;
	var emailButton;
	var emailContent;
	var emailOpen;
	var contentBox;
	var emailContent;
	var j = 10;
	var targetAttachment;
	var infoAttachment;
	
	
    for (i=0;i<emailPreviewArray.length;i++) {   
                        
        //append to email buttons
        emailButton = document.createElement("p");
        subjectBox = document.getElementById(i);
        emailSender = document.createTextNode(emailPreviewArray[i].sender);
        emailDate = document.createTextNode(emailPreviewArray[i].date);
        emailSubject = document.createTextNode(emailPreviewArray[i].subject);
        emailButton.appendChild(emailSender);
        emailButton.appendChild(document.createElement("br"));
        emailButton.appendChild(emailDate);
        emailButton.appendChild(document.createElement("br"));
        emailButton.appendChild(emailSubject);
        subjectBox.appendChild(emailButton);
       
       
        //actual email window
        contentBox = document.getElementById(j);
        //new div
        emailOpen = document.createElement("p");
        //text from array to put into new div
        emailContent = document.createTextNode(emailPreviewArray[i].content);
        //put text into new div
        emailOpen.appendChild(emailContent);
        //put new div into email window
        contentBox.appendChild(emailOpen);
		//call add attachments
		//addAttachments(event)

///////////////////////// EMAIL BUTTONS ///////////////////////////////////
		targetAttachment = document.createElement("input");
		targetAttachment.setAttribute("type", "button");
		targetAttachment.setAttribute("value","Initialize Hack");
		targetAttachment.setAttribute("onclick","downloadAttachment('ipPopUp'),changeZIndex('ipPopUp'), appendToIpPopUp()");	

		contentBox.appendChild(targetAttachment);		
		contentBox.appendChild(document.createElement("br"));
		
		j+=1;	
	}
	
}



//method calls
appendToMessageWindow();
appendToTerminalWindow();
appendToEmail(emailPreviewArray);

/******************************************************************
 * Keeps track of which email is being clicked and targetInfo being appended to screen
 ******************************************************************/

function targetIndex(index) {
				
		console.log("went into targetIndex()");
		//if day = 1 
		appendToTargetWindow(index, people1d);
		//else if 2 else if 3 else if4
		
}

//appendToTargetWindow(people1d);

var targetPro = document.createElement("p");
var ipPro = document.createElement("p");
var ipWindow = document.getElementById('ipPopUp');
//var targetWindow = document.getElementById('targetPopUp');

function appendToTargetWindow(index, targetArray) {

    var targetName = document.createTextNode(targetArray[index].name);
    var targetDifficulty = document.createTextNode(targetArray[index].diff);
    var targetOccupation = document.createTextNode(targetArray[index].occ);
    var targetNetworth = document.createTextNode(targetArray[index].netWorth);
    var targetImage = document.createTextNode(targetArray[index].image);
	
	console.log("right before targetArray[index]should print");
	console.log(index);	
	
	targetPro.remove();
	targetPro = document.createElement("p");
		
	targetPro.appendChild(targetName);
	targetPro.appendChild(document.createElement("br"));
	targetPro.appendChild(targetDifficulty);
	targetPro.appendChild(document.createElement("br"));
	targetPro.appendChild(targetOccupation);
	targetPro.appendChild(document.createElement("br"));
	targetPro.appendChild(targetNetworth);
	targetPro.appendChild(document.createElement("br"));
	targetPro.appendChild(targetImage);
	targetPro.appendChild(document.createElement("br"));
	
	console.log("target content is: " + targetArray[index].name);
	
	//targetWindow.appendChild(targetPro);
	
}

/******************************************************************
 * DATABASE SEARCH - PEOPLE SEARCH
 * (array of people with fields)
 * (search in format and returns field)
 ******************************************************************/
var databaseArray = [];

var result;

var searchElement = document.getElementById('input');

function saveInput() {

    var inputString = searchElement.value;
    console.log("you just searched for: "+ searchElement.value);
    
    searchDatabase(inputString);
}

function searchDatabase(input1) {
    // go through array of everything in database, store found person in var result

    for (i = 0; i < databaseArray.length; i++) {
        if (input1.toUpperCase() == (databaseArray[i].name).toUpperCase()) {
            result = databaseArray[i];
            console.log("search result is found.");
            console.log("result is: "+result.name);
            appendToSearch(result);  
            return;
        }
    }
    
        console.log("does not exist");    
        doesNotExist();
}  


var resultInfo;
var imageDiv;

function appendToSearch(result) {
    console.log("appendtosearch() called");
    var searchResult = document.getElementById('searchResult');
    imageDiv = document.getElementById("personPic");
    
    imageDiv.src = result.image;
    console.log(imageDiv);
    //resultInfo.remove();
    resultInfo = document.createElement("p");
       
    
    resultInfo.appendChild(document.createTextNode(result.name));
    resultInfo.appendChild(document.createElement("br"));
    resultInfo.appendChild(document.createTextNode(result.occ));
    resultInfo.appendChild(document.createElement("br"));
    resultInfo.appendChild(document.createTextNode(result.netWorth));
    resultInfo.appendChild(document.createElement("br"));
    resultInfo.appendChild(document.createTextNode(result.note));
    resultInfo.appendChild(document.createElement("br"));

    searchResult.appendChild(resultInfo);
}

// THIS pushes the new people into the search array (Makes them searchable)
//databaseArray.push(new database("homerun", "hitter", "December 4th, 1972", "99", "maria", "none", "11 street, city, country"));
//databaseArray.push(new database("hannah", "montana", "January 1st, 1990", "42", "Phoenix Wright", "kidz", "77 street, city, country"));
//databaseArray.push(new database("hannah", "FAKEHANNAH", "January 1st, 1990", "20", "Phoenix Wright", "kidz", "77 street, city, country"));
databaseArray.push(new databaseUnit("Jon Gonzalez", "Occupation: Freedom Fighter", "Net Worth: $ 1 mill", "http://i.imgur.com/3yEtel6.jpg", "No note."));
databaseArray.push(new databaseUnit("Ben York", "Occupation: Wall Street broker", "Net Worth: $ 3.5 mill", "http://i.imgur.com/cGwRjRh.png", "No note."));


/******************************************************************
 * HACK INITIALIZATION CODE - (CASENUM COMPARE)
 * Accepts user input and compares user input to target information
 * If correct then begin hack, if not, try again message
 ******************************************************************/
var eCase;
var searchEl = document.getElementById('ipinput');

var case1;

var temp = {
	sender:null,
	date:null,
	subject:null,
	content:null,
	caseNum:null,
	reportWin:null,
	reportLose:null,
	index: null,
	name:null
};

// save contents of the email into a function
function saveEcontent(index) {
	console.log("index of email clicked is: " + index);
	//console.log(temp.sender);
	console.log(emailPreviewArray[index]);
	// saves content of email into a temp object
	temp.sender = emailPreviewArray[index].sender;
	temp.date = emailPreviewArray[index].date;
	temp.subject = emailPreviewArray[index].subject;
	temp.content = emailPreviewArray[index].content;
	temp.caseNum = emailPreviewArray[index].caseNum;
	temp.reportWin = emailPreviewArray[index].reportWin;
	temp.reportLose = emailPreviewArray[index].reportLose;
	temp.index = emailPreviewArray[index].index;
	temp.name = emailPreviewArray[index].name;
	
	// for testing
	console.log(temp.sender);
	console.log(temp.date);
	console.log(temp.subject);
	console.log(temp.content);
	console.log(temp.index);
	
	console.log("this target casenum is: " + temp.caseNum);
}

var hackBack;
var win;
//var p;
//var no;
//var ele;

// Compares user input to case number attached to email
function caseCompare(input, caseNum) {

	console.log(input);
	console.log(caseNum);
	
	if (input == caseNum) {
		console.log("INPUT AND CASE # MATCH. BEGIN HACK");
		//hackBoolTrue();	
		//console.log(hackBool)
		win = document.getElementById("hackWin");
		win.style.display = "inline";
		// GETS RID OF BACK BUTTON ((REMEMBER TO ADD BACK IN AFTER HACK IS OVER))
		hackBack = document.getElementById('back1').style.display = "none";
		
		
		// send info over
		// remove back button
		// AT THE END OF HACK, ADD BACK BUTTON BACK IN
		//hackInit();
		
	} else {
		console.log("INPUT AND CASE # DO NOT MATCH. NO HACK");
		
	}
}

var divHack;

function hackInit() {
	divHack = document.getElementById("hackDiv");
	hackBoolTrue();
	console.log(hackBool);
}


/******************************************************************
 * CODE TO CLEAN UP AND REMOVE ELEMENTS
 ******************************************************************/
var noResult;

function doesNotExist() {
    console.log("does not exist");
    var doesNotExist = document.createTextNode("Search did not yield any results.");
    var searchResult = document.getElementById('searchResult');
    
    
    noResult = document.createElement("p");
    noResult.appendChild(doesNotExist);
    searchResult.appendChild(noResult);

}

//changed this in html also
//and added serach format prompt
function clearResults() {
    resultInfo.remove();
    noResult.remove();
    imageDiv.remove();

}


function clearNoResults() {
    noResult.remove();
    imageDiv.remove();
}

function removePrevHack() {
	par.remove();
	txt.remove();
	
}

var userIn;
function clearInput() {
	userIn = document.getElementById('ipinput');
	userIn.value = "";
}


