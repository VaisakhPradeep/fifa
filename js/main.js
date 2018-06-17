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

	$(".schedule-container").removeClass("overlay");
	$(".team-list-card").removeClass("show");

});

$(".all-button").click(function(){
	$(".schedule-wrapper").show();				//show all cards
	//$(".match-container").show();				//show all schedules
	$(".team").removeClass("selected");			//remove selected class from all teams

	$(".schedule-container").removeClass("overlay");
	$(".team-list-card").removeClass("show");
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






function getTimeZone(hours, mins) {
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
		prevDate = true;
	}

	else if(localTime>1440){
		localTime = localTime - 1440;
		nextDate = true;
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

	//$("#temp").text(offset);

	return(localHrs + ":" + localMins + " " + localAmPm);

}




var today = new Date();
var localDate = today.getDate();

for(let i=1; i<=48; i++){
	var utc = $(".utc"+i).text();					//get the utc time string from html
	var utcHrs = utc.charAt(0)+utc.charAt(1);		//assign first and second characters as utc hrs
	var utcMins = utc.charAt(3) + utc.charAt(4);	//assign minutes characters
	var localHrs, localMins, hrOffset, minOffset, sign, utcTime, localTime, newDate;
	var localAmPm = "am";
	var nextDate = false;
	var prevDate = false;

	var date = $(".date"+i).text();
	var dateNumber = date.charAt(5)+date.charAt(6);
	var day = $(".date"+i).next();

	var time = getTimeZone(utcHrs,utcMins);
	$(".utc"+i).text(time);

	newDate = dateNumber;

	if(nextDate === true){	

		newDate = Number(dateNumber) + 1;
		$(".date" +i).text("June"+ " "+newDate);

		switch(day.text()){
			case "Sun": day.text("Mon"); break;
			case "Mon": day.text("Tue"); break;
			case "Tue": day.text("Wed"); break;
			case "Wed": day.text("Thu"); break;
			case "Thu": day.text("Fri"); break;
			case "Fri": day.text("Sat"); break;
			case "Sat": day.text("Sun"); break;
		}
	}

	if(prevDate === true){	
		
		newDate = Number(dateNumber) - 1;
		$(".date" +i).text("June"+ " "+newDate);

		switch(day.text()){
			case "Sun": day.text("Sat"); break;
			case "Mon": day.text("Sun"); break;
			case "Tue": day.text("Mon"); break;
			case "Wed": day.text("Tue"); break;
			case "Thu": day.text("Wed"); break;
			case "Fri": day.text("Thu"); break;
			case "Sat": day.text("Fri"); break;
		}
	}



	if(Number(newDate) === localDate){
		$(".date"+i).parent().next().children().attr('id','today');
	}
	else{
		$(".date"+i).parent().next().children().attr('id','');
	}


}

//-------------------------------------------------------------scores----------------------------------------------------//

$(".utc1").text("5 - 0");
$(".utc2").text("0 - 1");
$(".utc3").text("0 - 1");
$(".utc4").text("3 - 3");
$(".utc5").text("2 - 1");
$(".utc6").text("1 - 1");
$(".utc7").text("0 - 1");
$(".utc8").text("2 - 0");

//-------------------------------------------------------------highlights----------------------------------------------------//

$(".match1").click(function(){
	window.open("https://youtu.be/SDY1N-IJOA8");
});

$(".match2").click(function(){
	window.open("https://youtu.be/LPzZa-Btx6I");
});

$(".match3").click(function(){
	window.open("https://youtu.be/rG6hK0eZ_Ys");
});

$(".match4").click(function(){
	window.open("https://youtu.be/4rp2aLQl7vg");
});

$(".match5").click(function(){
	window.open("https://youtu.be/-4_SXeQdIJo");
});

$(".match6").click(function(){
	window.open("https://youtu.be/Xvarnwv6hRk");
});

$(".match7").click(function(){
	window.open("https://youtu.be/O4odLCih0Os");
});

$(".match8").click(function(){
	window.open("https://youtu.be/qS-V5h0wKr8");
});





});
