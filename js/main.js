$(document).ready(function() {


var el = $("#scroll-container");
var testDiv = $("#today");
var divHeight = el.height();
var offset = testDiv.offset().top;
var scrollValue;

if(offset>divHeight/2){
	scrollValue = offset - divHeight/2 + 100;
	console.log(scrollValue);

}


function todayScroll(){
	el.animate({
		scrollTop: scrollValue
	}, 400 );
}
todayScroll();


$(".team").click(function(){
	$(".team").removeClass("selected");			//removing selected class from all teams
	$(this).addClass("selected");				//adding selected class to clicked team	   
	var country = this.childNodes[3].innerHTML;	//getting the country name from the clicked team div
	country = country.replace(/\s/g,'');		//removing spaces from the string
	console.log(this.childNodes[3].innerHTML); 
	var cards = $(".schedule-wrapper");			//selecting all the cards
	var schedule = $(".match-container");		//selecting all the schedules
	var playingCountryCard = $(".schedule-wrapper."+country); //selecting cards with playing country
	var playingCountry = $(".match-container."+country); //selecting schedules with playing country
	playingCountryCard.show();					//show playing country card ( in case it was removed on other team click )
	playingCountry.show();						//show playing country schedule ( in case it was removed on other team click )
	cards.not(playingCountryCard).hide();		//removing cards without the playing country
	//schedule.not(playingCountry).hide();		//removing schedules without the playing country

});

$(".all-button").click(function(){
	$(".schedule-wrapper").show();				//show all cards
	//$(".match-container").show();				//show all schedules
	$(".team").removeClass("selected");			//remove selected class from all teams
})



$('#teambtn').click(function(){
	$(".schedule-container").addClass("overlay");
	$(".team-list-card").addClass("show");
})

$("#close").click(function(){
	$(".schedule-container").removeClass("overlay");
	$(".team-list-card").removeClass("show");
})



/*function getTimeZone(hours, mins) {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}*/



/*var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
document.write(today);*/


var utc = $(".utc").text();						//get the utc time string from html
var utcHrs = utc.charAt(0)+utc.charAt(1);		//assign first and second characters as utc hrs
var utcMins = utc.charAt(3) + utc.charAt(4);	//assign minutes characters
var localHrs, localMins, hrOffset, minOffset, sign, utcTime, localTime;
var localAmPm = "am";
getTimeZone(utcHrs,utcMins);



function getTimeZone(hours, mins, utcAmPm) {
	var offset = new Date().getTimezoneOffset()			//Find local time offset from UTC
	o = Math.abs(offset);								//Taking Absolute value of offset
	utcTime = Number(hours)*60 + Number(mins);			//Converting it to minutes
	if(offset<0){										//Adding or subtracting offset to get local time
		localTime = utcTime + o;
	}
	else{
		localTime = utcTime - o;
	}

	if(localTime<0){
		localTime = 1440 + localTime;
	}

	else if(localTime>1440){
		localTime = localTime - 1440;
	}



	localHrs = Math.floor(localTime/60);				//Finding hours from minutes
	localMins = ("00" + (localTime % 60)).slice(-2);	//Finding minutes from hours and converting to 2 digit format
	
	if(localHrs === 0 || localHrs === 24){
		localHrs = 12;
		localAmPm = "am";
	}

	else if(localHrs>12){
		localHrs = localHrs - 12;
		localAmPm = "pm";
	}

	else if(localHrs === 12){
		localAmPm = "pm";
	}

	console.log(localHrs + ":" + localMins + " " + localAmPm);

}








});
