/*
 *	updateEmailPreviewArray.init() should be called at the beginning of every day	<--- easy to implement
 *	updateEmailPreviewArray.clear() should be called at the end of every day	<--- easy to implement
 *	DAY should increase by one at the end of every day	<--- easy to implement
 *	databasebArrayObject.init() is called once	<--- easiest to implement
 *	faction.updateFaction(number of increase of decrement) should be called every time a mission a completed	<--- tedious, may need to add extra variable in email
 *	updateReport.update(either email.reportWin or email.reportLose) needs to be called by email or temp or some shit after a win or loss	<--- tricky
 *	IF you want to show faction as a string, the affiliation variable within the faction object will automatically update that string
 *	To get the string for the end of the day, use the variable progressReport
 */

//var HACK_WIN = false;
var emailPreviewArray = [];
faction = {
	gov: "PARTY",
	antigov: "",
	pos: 80,
	updateFaction: function(num) {
		this.pos += num;
		if (this.pos > 100) {this.pos = 100;}
		else if (this.pos < 0) {this.pos = 0;}
		if (this.pos >= 60 && this.pos <= 100) {
			this.gov = "PARTY";
			this.antigov = "";
		} else if (this.pos >= 40 && this.pos < 60) {
			this.gov = "NEUTRAL";
			this.antigov = "NEUTRAL";
		} else if (this.pos >= 0 && this.pos < 40) {
			this.gov = "";
			this.antigov = "PARTY";
		}
	}
};
updateEmailPreviewArray = {
	currentMission: null, // make this equate to the email mission that is accepted
	init: function() {
		for(var i = 1; i <= 5; i++) {
			emailPreviewArray.push(new emailPreview(getData(i)));
		}
	},
	updateReport: function(winBool) {
		//<--------------------------------------------- called by the winLose function
		// calls updateReport.update(string); depending on if win or lose - I can do this later
	},
	clear: function() {
		// used at the end of the day to use array for the next day
		emailPreviewArray.length = 0;
	}
};
function emailPreview( data ) {
	this.sender = data[0];
	this.date = data[1];
	this.subject = data[2];
	this.content = data[3];
	this.caseNum = data[4];
	this.reportWin = data[5];		// if the player completes the level then send the data to report
	this.reportLose = data[6];
	this.index = data[7];
	this.name = data[8];
	this.diff = data[9];
	this.factionChange = data[10];
}
function getData(emailNum) {
	if (currentStats.theDay == 0) {
		if(faction.pos) {
			if (emailNum == 1) {
				return ["Supervisor Tresha Brannon", "June 25", "TASK 1", "There have been hundreds of reports on the trial of Devan MacDougall’s for rigging a national sport championship. Plant the attached evidence in MacDougall’s machine and security will take care of the rest.", "0905", "MacDougall lost his chance at freedom as citizens press for his imprisonment.", "MacDougall was released for his last day in court, which has caused an uproar within several counties.", 1, "Devan MacDougall", 2];
			} else if (emailNum == 2) {
				return ["Supervisor Tresha Brannon", "June 25", "TASK 2", "Recent events have given Devan MacDougall notoriety and citizens want MacDougall stripped of everything so let us give them what they want. Gather MacDougall’s past criminal nude photos and bring it to light on the net.", "0945", "public hatred for MacDougall has risen once again after the subject got his photos leaked to the public. Public shaming of MacDougall has been at an all time high."," ", 2, "Devan MacDougall", 2];
			} else if (emailNum == 3) {
				return ["Supervisor Tresha Brannon", "June 25", "TASK 3", "Some rebel scum named Ellis McFarlane is showing up with an account for smuggling drugs. No orders were sent for his case but under my care he will be punished. Go into the files and bring to the public his previous case for stealing Orange electronic goods.", "1102", "the case of Ellis McFarlane’s old theft charges have resurfaced within the online community for reasons unknown as of now aside from garnering attention from the press", "Ellis McFarlane’s final trial ended with no sign of conviction.", 3, "Ellis McFarlane", 2];
			} else if (emailNum == 4) {
				return ["Supervisor Tresha Brannon", "June 25", "TASK 4", "Yet another rebel scum going against the law. The name is Lino Archer: accused of providing illegal fighter jet lessons. Working for terrorist groups most likely. Gather some evidence against this guy and report it back to nearby law enforcers.", "9422", "retired veteran and local flying instructor, Lino Archer, is sentenced to jail without trial for suspicion of being a terrorist."," ", 4, "Lino Archer", 2];
			} else if (emailNum == 5) {
				return ["Supervisor Tresha Brannon", "June 25", "TASK 5", "Katerina Bove, a Child Care Worker, was recently found with possessions of cannabis. Unfortunately she won’t comply to our questions. Find her residence and report all necessary information to the local force to drag her into questioning.", "9859", "Katerina Bove, who was recently caught possessing infinitesimal amounts of cannabis was also found concealing copious amounts of narcotics.", "Katerina Bove"+","+ "who was recently caught possessing infinitesimal amounts of cannabis has been let off from all charges.", 5, "Katerina Bove", 2];
			}
		}
	} else if (currentStats.theDay == 1) {
		if(faction.pos) {
			if (emailNum == 1) {
				return ["Supervisor Tresha Brannon", "June 26", "TASK 1", "One of our own civil servants, Trista Hedley, is being insubordinate and her department head wants her to change. Go into her files and teach her government work is no laughing matter.", "1123", "civil servant, Trista Hedley, nearly lost her life data when her personal machine had a malfunction and caught on fire. A close call indeed.", "Trista Hedley has been marked red for job performance. Take caution when receiving this individual’s service.", 1, "Trista Hedley", 2];
			} else if (emailNum == 2) {
				return ["Supervisor Tresha Brannon", "June 26", "TASK 2 ", "Jaslyn Vitali, was found illegally distributing drugs in a hospital. Ensure that Vitali will lose her case to bring her in for questioning.", "0707", "Jaslyn Vitali faced her final trial and lost today. Authorities are currently holding her for questioning for a slim chance of release.", "Dr. Jaslyn Vitali is released from questioning after partaking in her final trial.", 2, "Jaslyn Vitali", 2];
			} else if (emailNum == 3) {
				return ["Supervisor Tresha Brannon", "June 26", "TASK 3", "A corporate attorney is trying to bail from a case against her for forging evidence. It’s a crime that can’t be overlooked, we must do our task and put this Jennifer Wragge into prison.", "1147", "caught forging evidence for a national case, Jennifer Wragge is going to be punished without bail.", "Jennifer Wragge successfully bailed herself out after having clear evidence of forgery at a national court.", 3, "Jennifer Wragge", 2];
			} else if (emailNum == 4) {
				return ["Supervisor Tresha Brannon", "June 26", "TASK 4", "Gravedigger, Janella Earl, has recently been convicted of shoplifting. The powerful Kuvshinov family have urged further investigation as they suspect Earl to have stolen a valuable heirloom earlier that day in the same mall. Check more into Earl and see if any evidence shows up.", "0107", "Janella Earl was recently found to be guilty of stealing from the Kuvshinov and the family will not stop until Earl is in prison.", "local gravedigger, Janella Earl, got fined for shoplifting after pathetically attempting to outrun the mall security.", 4, "Janella Earl", 2];
			} else if (emailNum == 5) {
				return ["Insurgent Raimonda Robert", "June 26", "RESISTANCE", "Thank you for contacting us, having you supporting our anti-government group will help tremendously. We have taken a look into Aaron Johnson as you’ve mentioned; he is a criminal of heinous crimes but has yet to face any charges. We support you on the matter that the public needs to know even if they’re always left in the dark when it comes to government officials every other time.", "0331", "information about our very own international Panoi ambassador, Aaron Johnson, has leaked world wide through the internet. It states here that ‘Aaron Johnson… elicited Panoi slave trafficking… multiple occasions… killed three women… wow. We are surprised as you are.’", "Aaron Johnson was attacked by a mysterious hacker. Security enforcers are on the lookout.", 5, "Aaron Johnson", 10];
			}
		}
	} else if (currentStats.theDay == 2) {
		if(faction.pos) {
			if (emailNum == 1) {
				return ["Supervisor Tresha Brannon", "June 27", "TASK 1", "After Ellis McFarlane’s first case, she was caught vandalizing city hall immediately after. The court does not see a problem but the law will catch up. Provide evidence for the judge to punish the little troublemaker", "1108", "Ellis McFarlane was charged with possession of drugs.", "local court released Ellis McFarlane with a minor fine for vandalizing city hall and all previous charges.", 1, "Ellis McFarlane", 2];
			} else if (emailNum == 2) {
				return ["Supervisor Tresha Brannon", "June 27", "TASK 2", "Reports that Ellis McFarlane has also been smuggling drugs. Find evidence of her connections and smuggling, so the authorities can throw McFarlane even deeper in prison.", "1109", "it was discovered that, Ellis McFarlane, was conducting illegal drug exchanges for the past several months.", "", 2, "Ellis McFarlane", 2];
			} else if (emailNum == 3) {
				return ["Supervisor Tresha Brannon", "June 27", "TASK 3", "Another case on Janella Earl, a local gravedigger, but this time sued for grave robbing. The case is undecided and authorities are having a hard time finding the stolen properties and Earl is unwilling to speak. See if you can’t find any clues on her machine.", "0120", "local authorities found the alleged grave-robbed properties and the lawsuit on Janella Earl is going through.", "Janella Earl walks away from a lawsuit with absolutely no losses aside from her time, which is rather expensive given her age.", 3, "Janella Earl", 2];
			} else if (emailNum == 4) {
				return ["Supervisor Tresha Brannon", "June 27", "TASK 4", "A well-known stockbroker named, Marlin Amadori, has been reported to be manipulating stocks. This is a severe crime and if it’s true then this man needs immediate punishment. Peek into his network and report back anything of importance.", "7708", "Marlin Amadori, successful stockbroker, was arrested after convincing evidence of stock manipulation were brought to authorities.", "", 4, "Marlin Amadori", 2];
			} else if (emailNum == 5) {
				return ["Insurgent Raimonda Robert", "June 27", "RESISTANCE", "There has been a consensus that we ask you to look into the case of Jennifer Wragge. Multiple accounts of this individual promoting and driving several persons to attempt suicide. Her luxury is a far cry for justice by those she has done wrong.", "1286", "Jennifer Wragge went unfire within hours of public knowledge of her heinous act of encouraging suicide attempts.", "Jennifer Wragge was informed that her private system was nearly hacked and she won’t rest until the culprit is caught.", 5, "Jennifer Wragge", 10];
			}
		}
	} else if (currentStats.theDay == 3) {
		if(faction.pos) {
			if (emailNum == 1) {
				return ["Supervisor Tresha Brannon", "June 28", "TASK 1", "Multiple accounts of tax evasion has been recently be reported and you have been assigned the case of Martie Trueman. A dusty criminal record but keep caution as he may be hiding more crimes in his home system.", "4987", "hundreds of citizens were fined for tax evasion! An incredible event for reasons unknown.", "hundreds of citizens were fined for tax evasion! An incredible event for reasons unknown.", 1, "Martie Trueman", 2];
			} else if (emailNum == 2) {
				return ["Supervisor Tresha Brannon", "June 28", "TASK 2", "Martie Trueman, run-of-the-mill car mechanic committed welfare fraud but was also reported to be affiliated with some anti-government group. He has paid his due for the welfare fraud but having a possible rebel on our hands is dangerous. Do what you can to take him in.", "4906", "local car mechanic, Martie Trueman was taken in for harboring plans for building highly dangerous explosives.", "Martie Trueman was released from court and is expecting to continue his life as a car mechanic.", 2, "Martie Trueman", 2];
			} else if (emailNum == 3) {
				return ["Supervisor Tresha Brannon", "June 28", "TASK 3", "An attractive lady named Yoko Wyndham has been abusing her beauty for money as a taxi driver. Track her activities and put together a case for the court to detain her.", "3122", "taxi driver, now labeled prostitute, Yoko Wyndham has been detained by authorities and her taxi services will be shut down.", "", 3, "Yoko Wyndham", 2];
			} else if (emailNum == 4) {
				return ["Insurgent Raimonda Robert", "June 28", "RESISTANCE 1", "There have been no public reports on the case but Trista Hedley was reported by some of our friends that she has been trespassing local homes. Reasons are unknown but not once did the public have gotten heard. Hedley needs to know that being apart of the government does not grant authority to invade homes.", "1150", "footage of Trista Hedley trespassing homes leaked earlier today and local homeowners are outraged and demand immediate action.", "Trista Hedley was recently attacked by a professional hacker and authorities are tying the incident with prior attacks on government workers.", 4, "Trista Hedley", 10];
			} else if (emailNum == 5) {
				return ["Insurgent Raimonda Robert", "June 28", "RESISTANCE 2", "Another government worker gone awry. Amelia Rana, information specialist, was caught selling private information with no judicial actions taken to punish this individual. The system is corrupt and Rana needs to learn that privacy is of utmost importance.", "9760", "thousands of leaked photos of Amelia Rana have flooded the internet, which ranges from nudes to several other private sectors of her home. Ms. Rana has not left her home since.", "authorities are saying the recent hacker attack on Amelia Rana is a declaration of war against the government.", 5, "Amelia Rana", 10];
			}
		}
	} else if (currentStats.theDay == 4) {
		if(faction.pos) {
			if (emailNum == 1) {
				return ["Supervisor Tresha Brannon", "June 29", "TASK 1", "There has been too many attacks on government officials, we need to direct the attention to another party. Take a look at Ellis Walter and get started on the recently added case for perjury.", "3008", "astrophysicist, Ellis Walter, was found to be affiliated with rebel groups after being searched for perjury at a state court.", "respectable astrophysicist, Ellis Walter, was falsely accused of perjury and was released with a large compensation.", 1, "Ellis Walter", 2];
			} else if (emailNum == 2) {
				return ["Supervisor Tresha Brannon", "June 29", "TASK 2", "Yoko Wyndham strikes again and this time there is a case for sexual assault from her clients. Look through her files and forensics and see if anything comes up.", "3587", "Yoko Wyndham was successfully sued by one of her clients for sexual assault. A beautiful lady that has definitely gone too far off her righteous path.", "", 2, "Yoko Wyndham", 2];
			} else if (emailNum == 3) {
				return ["Insurgent Raimonda Robert", "June 29", "RESISTANCE 1", "Amelia Rana is furious with our group and she is out for blood. She needs to feel every loss. Her remaining crime is failure to abide by official ethical conducts. Take her for all she has got.", "9780", "as Amelia Rana was questioned for misconduct, she was hacked and part of her portion leaked out to the public without a trace. Lucky for million, a tragedy for Ms. Rana.", "Amelia Rana appears to be relentlessly fighting off hacker attacks yet again with even more success this time.", 3, "Amelia Rana", 7];
			} else if (emailNum == 4) {
				return ["Insurgent Raimonda Robert", "June 29", "RESISTANCE 2", "Caught in public and outside of every office, Nhung Rhier nonchalantly uses drugs and has never been charged with anything. If the public knew about how the government treats Mr. Rhier’s unlawful acts then they will surely be outraged.", "9910", "thousands of citizens and hundreds of thousands of others on the internet have raged about recent evidence of government officials turning their eyes when their workers use drugs in the open.", "Nhung Rhier, state security programmer, ensures the public that Americk’s security is among the best in the world.", 4, "Nhung Rhier", 7];
			} else if (emailNum == 5) {
				return ["Insurgent Raimonda Robert", "June 29", "RESISTANCE 3", "Recently Kelsie Toxell, reporter for national television, was sued for withholding information from the public. Protests on this matter speaks for itself that the people want to know and deserve a right to know. Ms. Toxell is keeping information buried deep in her personal machine; give them your strength and they’ll learn that there’s a powerful friend by their side.", "3709", "Kelsie Toxell’s withheld information have been leaked and the information is more than terrifying. It reads murder and criminal cover-ups for important government officials.", "hacker attacks on government workers and officials cease to stop.", 5, "Kelsie Toxell", 7];
			}
		}
	} else if (currentStats.theDay == 5) {
		if(faction.pos) {
			if (emailNum == 1) {
				return ["Supervisor Tresha Brannon", "June 30", "TASK 1", "Intel caught wind of insubordination within the ranks and Raimonda Robert is the man behind recent attacks. Everyone is under suspicion, including you. You’re one of the best and if you are trustworthy, prove it. Start with Raimonda’s case for grand theft and locate his location.", "4403", "Raimonda Robert, a leading figure for anti-government groups, was located and caught under the charges for grand theft in addition to heavy charges for treason.", "Raimonda Robert, a leading figure for anti-government groups, successfully avoided all government attacks and went underground.", 1, "Raimonda Robert", 10];
			} else if (emailNum == 2) {
				return ["Revolution Leader Beatrix Coutts", "June 30", "RESISTANCE 1", "Raimonda Robert is leading underground attacks, so I’ll be replacing Raimonda as messenger. It’s good to have you as an ally. We have targeted almost all classes of government workers and politicians are next in line. Brigham Tsukino was accused of corporate bribery and no case ever went through. There are several courts that are willing to take the case if sufficient evidence show up.", "6628", "a well known politician, Brigham Tsukino, has been called to court for corporate bribery after a countless amount of evidence propped up online through several anonymous networks.", "authorities are having a hard time keeping up with the amount of hacker attacks on government officials.", 2, "Brigham Tsukino", 5];
			} else if (emailNum == 3) {
				return ["Revolution Leader Beatrix Coutts", "June 30", "RESISTANCE 2", "Since Brigham Tsukino is going to be in the headlines today, his image needs to be tarnished completely. His remaining case from what you’ve informed us was his unlawful possession of firearm. Take away all chances of Tsukino getting away from his crimes.", "7444", "after being attacked by a hacker before, Brigham Tsukino’s position as politician is put into question.", "there have been over a thousand cases of hacker attacks. The government of Americk are in shambles.", 3, "Brigham Tsukino", 5];
			} else if (emailNum == 4) {
				return ["Revolution Leader Beatrix Coutts", "June 30", "RESISTANCE 3", "We are closing in to our final stand with the government of Americk. One of the last persons to stand in our way is NSS Technician, Dinal Senft. The only crime you can pin him down for is stalking public figures. Put him into federl jail and report any details to us.", "6890", "Dinal Senft, NSS Technician, is currently under protection from a recent hacker attack that took over half of all the data he possessed in his machine. The machine malfunctioned and burnt itself out beyond retrieving.", "more than half a thousand hackers have been caught in the past several hours but no information on the leader of these hacker attacks.", 4, "Dinal Senft", 5];
			}
		}
	} else if (currentStats.theDay == 6) {
		if(faction.pos) {
			if (emailNum == 1) {
				return ["Chief of NSS Fawn Murdok", "June 31", "END THE RESISTANCE", "We have caught up to you, hacker. There is no evidence on your involvement but we know you are being contacted by Beatrix Coutts. That means that you are in close proximity to Beatrix Coutts in one way or another. You can still redeem yourself by stopping the leader in his tracks. Open his case for dumping anthrax into our water networks and endangering our citizens.", "6056", "Win String", "Losing String", 1, "Beatrix Coutts", 30];
			} else if (emailNum == 2) {
				return ["Revolution Leader Beatrix Coutts", "June 31", "PIECE DE RESISTANCE", "We understand that you have to take down some of our own but we hope it's for the true greater good. The final piece to our coup. The world will understand that a government that disregards their citizens will only lose. We have provided you with the best equipments for this occasion and through thousands of join efforts, we only managed to give you the ability to target Fawn Murdok. The rest is up to you.", "6513", "Win String", "Losing String", 2, "Fawn Murdok", 30];
			}
		}
	}
}
updateEmailPreviewArray.init();
/******************************************************************************************/
/******************************************************************************************/
var databaseArray = [];
databasebArrayObject = {
	init: function() {
		for(var i = 1; i <= 21; i++) {		//manually put number larger than how much data there are
			var tempp = getID(i);
			databaseArray.push(new databaseUnit(tempp[0], tempp[1], tempp[2], tempp[3], tempp[4]));
		}
	},
	clear: function() {
		//may not need since databaseArray is always needed
		databaseArray.length = 0;
	}
};
var databaseUnit = function(name, occ, netWorth, image, note) {
	this.name = name;
	this.occ = occ;
	this.netWorth = netWorth;
	this.image = image;
	this.note = note;
};
function getID(person) {
	switch(person) {
		case 1:
			return ["Aaron Johnson", "Occupation: Panoi Ambassador", "Net Worth: 150.000", "http://i.imgur.com/3yEtel6.jpg", 
			"Note: case 0331 elicited panoi slave trafficking"];
		case 2:
			return ["Trista Hedley", "Occupation: Civil Servant", "Net Worth: 50.000", "TEMP", 
			"Note: case 1123 failure to commit with schedule, case 1150 caught trespassing local homes"];
		case 3:
			return ["Amelia Rana", "Occupation: Information Specialist", "Net Worth: 10.000", "TEMP", 
			"Note: case 9760 publically caught selling private information, case 9780 failure to abide by official ethical conducts"];
		case 4:
			return ["Nhung Rhier", "Occupation: State Security Programme", "Net Worth: 20.000", "TEMP", 
			"Note: case 9910 unlawful possession of marijuana and traces of cocaine"];
		case 5:
			return ["Brigham Tsukino", "Occupation: Politician", "Net Worth: 80.000", "TEMP", 
			"Note: case 6628 accused of corporate bribery, case 7444 unlawful possession of firearm"];
		case 6:
			return ["Kelsie Toxell", "Occupation: Reporter", "Net Worth: 70.000", "TEMP", 
			"Note: case 3709 sued for withholding information from the public"];
		case 7:
			return ["Jennifer Wragge", "Occupation: Corporate Attorney", "Net Worth: 150.000", "TEMP", 
			"Note: case 1147 accused of forging evidence, case 1286 caught promoting a suicide attempt"];
		case 8:
			return ["Dinah Senft", "Occupation: NSS Technician", "Net Worth: 200.000", "TEMP", 
			"Note: case 6890 accused of stalking public figure"];
		case 9:
			return ["Fawn Murdok", "Occupation: Chief of NSS", "Net Worth: 250.000", "TEMP", 
			"Note: case 6513 accused of corporate blackmailing"];
		case 10:
			return ["Devan MacDougall", "Occupation: Amtrak Operator", "Net Worth: 2.000", "TEMP", 
			"Note: case 0905 tampering with a sports contest, case 0945 public nudity"];
		case 11:
			return ["Jaslyn Vitali", "Occupation: Doctor", "Net Worth: 15.000", "TEMP", 
			"Note: case 0707 illegal distribution of drugs to patients"];
		case 12:
			return ["Janella Earl", "Occupation: Grave Digger", "Net Worth: 550", "TEMP", 
			"Note: case 0107 convicted of shoplifting, case 0120 sued for grave robbing"];
		case 13:
			return ["Marlin Amadori", "Occupation: Stockbroker", "Net Worth: 70.000", "TEMP", 
			"Note: case 7708 accused of stock manipulation"];
		case 14:
			return ["Yoko Wyndham", "Occupation: Taxi Driver", "Net Worth: 4.000", "TEMP", 
			"Note: case 3122 convicted for work-related sex scandal, case 3587 sued for sexual assault"];
		case 15:
			return ["Ellis McFarlane", "Occupation: unknown", "Net Worth: 10", "TEMP", 
			"Note: case 1102 stole orange electronic goods, case 1108 vandalized city hall, case 1109 accused of smuggling drugs"];
		case 16:
			return ["Lino Archer", "Occupation: Flying Instructor", "Net Worth: 780", "TEMP", 
			"Note: case 9422 accused of providing illegal fighter jet lessons"];
		case 17:
			return ["Katerina Bove", "Occupation: Child Care Worker", "Net Worth: 5.000", "TEMP", 
			"Note: case 9859 possession of cannabis"] ;
		case 18:
			return ["Martie Trueman", "Occupation:Car Mechanic", "Net Worth: 5.500", "TEMP", 
			"Note: case 4906 welfare fraud, case 4987 tax evasion"];
		case 19:
			return ["Ellis Walter", "Occupation: Astrophysicist", "Net Worth: 10.500", "TEMP", 
			"Note: case 3008 perjury at a state court"];
		case 20:
			return ["Raimonda Robert", "Occupation: unknown", "Net Worth: 100.000", "TEMP", 
			"Note: case 4400 unlawful fleeing a police officer in a motor vehicle, case 4401 grand larceny, case 4403 grand theft auto, case 4405 promotion of prostitution in the first degree"];
		case 21:
			return ["Beatrix Coutts", "Occupation: unknown", "Net Worth: 200.000", "TEMP", 
			"Note: case 6037 massacre of 200 citizens, case 6040 mass political conspiracy, case 6041 wide spread distribution of cyanide, case 6056 mass dumping of anthrax in four major water networks"];
		default:
			return null;
	}
}
databasebArrayObject.init();
/******************************************************************************************/
/******************************************************************************************/
var progressReport = "";
updateReport = {
	reportNum: 1,	// reset to zero after displaying the string for that day
	update: function(newStr) {
		switch(this.reportNum) {	// needs to be called by email or something after a win or loss
			case 1:
				if (newStr != " ") {
					progressReport += "Earlier today ";
					progressReport += newStr;
				}
				this.reportNum++;
				break;
			case 2:
				if (newStr != " ") {
					progressReport += "Following that, ";
					progressReport += newStr;
				}
				this.reportNum++;
				break;
			case 3:
				if (newStr != " ") {
					progressReport += "Soon after, ";
					progressReport += newStr;
				}
				this.reportNum++;
				break;
			case 4:
				if (newStr != " ") {
					progressReport += "Not to mention that ";
					progressReport += newStr;
				}
				this.reportNum++;
				break;
			case 5:
				if (newStr != " ") {
					progressReport += "And to conclude today' report, we inform you that ";
					progressReport += newStr;
				}
				progressReport += "This has been your Daily Digest, farewell and good night friends!";
				break;
			default:
				break;
		}
	},
	clear: function() {
		progressReport = "";
		this.reportNum = 1;
	}
};
