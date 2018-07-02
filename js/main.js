$(document).ready(function() {





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
	//var offset = 1000
	o = Math.abs(offset);								//Taking Absolute value of offset
	utcTime = Number(hours)*60 + Number(mins);			//Converting it to minutes
	if(offset<0){										//Adding or subtracting offset to get local time
		localTime = utcTime + o;
	}
	else{
		localTime = utcTime - o;
	}

	if(localTime<0){									//End point cases
		localTime = 1440 + localTime;
		prevDate = true;
	}

	else if(localTime>1440){
		localTime = localTime - 1440;
		nextDate = true;
	}



	localHrs = Math.floor(localTime/60);				//Finding hours from minutes
	localMins = ("00" + (localTime % 60)).slice(-2);	//Finding minutes from hours and converting to 2 digit format

	//converting 24hr format to 12hr format
	
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

	return(localHrs + ":" + localMins + " " + localAmPm);

}




var today = new Date();
var localDate = today.getDate();

for(let i=1; i<=56; i++){
	var utc = $(".utc"+i).text();					//get the utc time string from html
	var utcHrs = utc.charAt(0)+utc.charAt(1);		//assign first and second characters as utc hrs
	var utcMins = utc.charAt(3) + utc.charAt(4);	//assign minutes characters
	var localHrs, localMins, hrOffset, minOffset, sign, utcTime, localTime, newDate;
	var localAmPm = "am";
	var nextDate = false;
	var prevDate = false;

	var date = $(".date"+i).text();					//getting date from html
	var dateNumber = date.charAt(5)+date.charAt(6);	//storing the two digit date value
	var day = $(".date"+i).next();					//storing day string
	var month = date.substr(0,4);

	var time = getTimeZone(utcHrs,utcMins);			//getting the correct time returned by the function
	$(".utc"+i).text(time);

	newDate = dateNumber;

	if(nextDate === true){							//Date and day shift according to the time conversion
		newDate = Number(dateNumber) + 1;
		newDate = ("00"+newDate).slice(-2);
		if(month==="June"){			
			$(".date" +i).text("June"+ " "+newDate);
		}
		
		if(month==="July"){
			$(".date" +i).text("July"+ " "+newDate);
		}
		

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
		newDate = ("00"+newDate).slice(-2);
		if(month==="June"){			
			$(".date" +i).text("June"+ " "+newDate);
		}
		
		if(month==="July"){
			$(".date" +i).text("July"+ " "+newDate);
		}

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
 
	if(dateNumber === "30" && nextDate === true){
		$(".date" +i).text(" "+"July"+ " "+"01");
	}

	if(dateNumber === "01" && prevDate === true){
		$(".date" +i).text("June"+ " "+"30");
	}

	//today banner placement

	if(Number(newDate) === localDate){
		$(".date"+i).parent().next().children().attr('id','today');
	}
	else{
		$(".date"+i).parent().next().children().attr('id','');
	}


}

for(let i=1; i<=56; i++){
	var date = $(".date"+i).text();
	var month = date.substr(0,4)
	if(month==="July"){
		$(".date"+i).parent().next().children().css('margin-left', '5px');
	}
}


//scroll today's matches to center

var el = $("#scroll-container");
var testDiv = $("#today").first();
var divHeight = el.height();
if(testDiv.length!==0){
	var offset = testDiv.offset().top;
}

else{
	var offset = $(".schedule-wrapper").filter(":last").offset().top;
}

var scrollValue;

if(offset>divHeight/2){
	scrollValue = offset - divHeight/2 + 100;
}


function todayScroll(){
	el.animate({
		scrollTop: scrollValue
	}, 1000 );
}

setTimeout(function(){ todayScroll(); }, 1000);






var numberOfMatches = 48;
var finishedMatches = 0;


/*$.ajax({
    type: "GET",
    headers: {"X-Auth-Token": " d562887c93b24f148cf75768e92d186d"},
    url: "http://api.football-data.org/v1/competitions/467/fixtures"
}).done(function (data) {
    
	for(let j=0; j<numberOfMatches; j++){

		var homeGoals = data.fixtures[j].result.goalsHomeTeam;
		var awayGoals = data.fixtures[j].result.goalsAwayTeam;

		if((data.fixtures[j].status==="FINISHED") || (data.fixtures[j].status==="IN_PLAY") ){
			$(".utc"+(j+1)).text(homeGoals + " " + "-" + " " + awayGoals);
		}

		if(data.fixtures[j].status==="FINISHED"){
			finishedMatches++;
		}
	}

	$(".date"+finishedMatches).parent().parent().addClass("last-match");


});*/

var liveScore;

function fetchData(){
	$.ajax({
    type: "GET",
    url: "https://world-cup-json.herokuapp.com/matches"
	}).done(function (data) {

	data.sort(function(b,a){
	  	// Turn your strings into dates, and then subtract them
	  	// to get a value that is either negative, positive, or zero.
	  	return new Date(b.datetime) - new Date(a.datetime);
	});

	var finishedMatches = 0;

    
	for(let i=0; i<32; i++){
		if((data[i].status==="completed")||(data[i].status==="in progress")){
			var homeGoals = data[i].home_team.goals;
			var awayGoals = data[i].away_team.goals;
			$(".utc"+(i+1)).text(homeGoals + " " + "-" + " " + awayGoals);
		}

		if(data[i].status==="completed"){
			finishedMatches++;
		}

		if(data[i].status==="in progress"){
			//console.log("match in progress");
		}


	}

	/*$(".date"+finishedMatches).parent().parent().addClass("last-match");*/ 		//adding last-match class to provide margin-bottom to last match card

	});

	//console.log(liveScore);
}

fetchData();

//fetch data every 30 seconds

/*window.setInterval(function(){
  fetchData();
}, 30000);*/



$(".match2").click(function(){
	window.open("https://youtu.be/LPzZa-Btx6I");
});

$(".match3").click(function(){
	window.open("https://youtu.be/rG6hK0eZ_Ys");
});

$(".match30").click(function(){
	window.open("https://www.youtube.com/watch?v=kPAIcIBtCtE");
})

$(".match32").click(function(){
	window.open("https://www.youtube.com/watch?v=wa974tOozEI");
})

$(".match33").click(function(){
	window.open("https://www.youtube.com/watch?v=lEzuFPeSBcA");
});


//UCpcTrCXblq78GZrTUTLWeBw

var matchUrl = [];
var matchTitle = [];
var indexOfMatch = [];
var indexOfMatchNumber = [];
var matchNumber = [];

$.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLCGIzmTE4d0hww7NG9ytmooEUZov2k-23&key=AIzaSyDBfCLOFe7SgHUJ4xHvGit3b6EehoeeCRo"
	}).done(function (d) {


	function compare(a,b) {
	  if (a.snippet.publishedAt < b.snippet.publishedAt)
	    return -1;
	  if (a.snippet.publishedAt > b.snippet.publishedAt)
	    return 1;
	  return 0;
	}

	d.items.sort(compare);

	//console.log(d.items.length);


	for( let j=0; j<=31; j++){
		
		$(".match"+(j+1)).addClass("score");
		matchUrl[j] = "https://www.youtube.com/watch?v=" + d.items[j].snippet.resourceId.videoId;

	}



});



//open highlights URL when the card is clicked

$(".schedule-card-wrapper").click(function(){
	index = $(".schedule-card-wrapper").index(this);
	if(index<=matchUrl.length){

		if(index<16 || index>29){
			window.open(matchUrl[index]);
		}

		else if(index> 16 && index<29){
			window.open(matchUrl[index-1]);
		}

		


		
	}




	
});

//-------------------------------------------------------------scores (semi-automated update)----------------------------------------------------//

var fifaId = [
	"300331516",
	"300331500",
	"300340184",
	"300331506",
	"300331512",
	"300331519",
	"300331510",
	"300331548",
	"300331532",
	"300331534",
	"300331521",
	"300331553",
	"300331507",
	"300340182",
	"300331520",
	"300331537",
	"300331544",
	"300331517",
	"300331498",
	"300331535",
	"300331551",
	"300331514",
	"300331542"
];

var resultObj = [];



function fetchData2(){
	$.ajax({
    type: "GET",
    url: "https://world-cup-json.herokuapp.com/matches"
	}).done(function (data) {

	data.sort(function(b,a){
	  	// Turn your strings into dates, and then subtract them
	  	// to get a value that is either negative, positive, or zero.
	  	return new Date(b.datetime) - new Date(a.datetime);
	});

	var lastNumber = 33;

	for(let i=0; i<fifaId.length; i++){
		resultObj[i] = data.filter(function( d ) {
	  	return d.fifa_id == fifaId[i];

		});

		if((resultObj[i][0].status==="completed")||(resultObj[i][0].status==="in progress")){
			$(".utc"+(i+34)).text(resultObj[i][0].home_team.goals+" "+"-"+" "+resultObj[i][0].away_team.goals);
		}

		if(resultObj[i][0].status==="completed"){
			lastNumber++;
		}

	}
	$(".date"+lastNumber).parent().parent().addClass("last-match");
	



});



    
}

fetchData2();

//fetch data every 30 seconds

window.setInterval(function(){
  fetchData2();
}, 30000);






//-------------------------------------------------------------scores (fallback: manual update)----------------------------------------------------//

$(".utc1").text("5 - 0");
$(".utc2").text("0 - 1");
$(".utc3").text("0 - 1");
$(".utc4").text("3 - 3");
$(".utc5").text("2 - 1");
$(".utc6").text("1 - 1");
$(".utc7").text("0 - 1");
$(".utc8").text("2 - 0");
$(".utc9").text("0 - 1");
$(".utc10").text("0 - 1");
$(".utc11").text("1 - 1");


$(".utc33").text("2 - 1");
/*
$(".utc34").text("3 - 0");

$(".utc35").text("");
$(".utc36").text("");
$(".utc37").text("");
$(".utc38").text("");
$(".utc39").text("");
$(".utc40").text("");
$(".utc41").text("");
$(".utc42").text("");
$(".utc43").text("");
$(".utc44").text("");
$(".utc45").text("");
$(".utc46").text("");
$(".utc47").text("");
$(".utc48").text("");
*/





//-------------------------------------------------------------highlights (fallback: manual update)----------------------------------------------------//

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

$(".match9").click(function(){
	window.open("https://youtu.be/bA6_7wFvG0E");
});
   
$(".match10").click(function(){
	window.open("https://youtu.be/6BSeFs40QOI");
});

$(".match11").click(function(){
	window.open("https://youtu.be/3dWrKNrWbWQ");
});

$(".match12").click(function(){
	window.open("https://youtu.be/5ZlE-hUl5UU");
});

$(".match13").click(function(){
	window.open("https://youtu.be/XCr1xpwEuZQ");
});

$(".match14").click(function(){
	window.open("https://youtu.be/u3wfrhjoIJg");
});

$(".match15").click(function(){
	window.open("https://youtu.be/y4SeAfCg7-o");
});

$(".match16").click(function(){
	window.open("https://youtu.be/SXkg_12ukOk");
});

$(".match17").click(function(){
	window.open("https://youtu.be/AygUlfmQgBs");
});





$(".match33").addClass("score");
$(".match33").click(function(){
	window.open("https://www.youtube.com/watch?v=lEzuFPeSBcA");
});

$(".match34").addClass("score");
$(".match34").click(function(){
	window.open("https://www.youtube.com/watch?v=I_YrTEiOVGo");
});

$(".match35").addClass("score");
$(".match35").click(function(){
	window.open("https://youtu.be/JlPIrEKFCeo");
});

$(".match36").addClass("score");
$(".match36").click(function(){
	window.open("https://youtu.be/cIOqidBVnO4");
});

$(".match37").addClass("score");
$(".match37").click(function(){
	window.open("https://www.youtube.com/watch?v=fR-txBJG-B4");
});

$(".match38").addClass("score");
$(".match38").click(function(){
	window.open("https://www.youtube.com/watch?v=UvFP1ITZ7To");
});


$(".match39").addClass("score");
$(".match39").click(function(){
	window.open("https://youtu.be/RmlkAOwJ1gI");
});

$(".match40").addClass("score");
$(".match40").click(function(){
	window.open("https://youtu.be/wfy1ojdPyzA");
});


$(".match41").addClass("score");
$(".match41").click(function(){
	window.open("https://www.youtube.com/watch?v=BHT6V1SpmNA");
});

$(".match42").addClass("score");
$(".match42").click(function(){
	window.open("https://www.youtube.com/watch?v=OKjV2SQfKrw");
});

$(".match43").addClass("score");
$(".match43").click(function(){
	window.open("https://youtu.be/izvscMabH8o");
});

$(".match44").addClass("score");
$(".match44").click(function(){
	window.open("https://youtu.be/_dusyi-4pMs");
});


$(".match45").addClass("score");
$(".match45").click(function(){
	window.open("https://www.youtube.com/watch?v=2CRmHuN-O84");
});

$(".match46").addClass("score");
$(".match46").click(function(){
	window.open("https://www.youtube.com/watch?v=K7pVlD8Q660");
});


$(".match47").addClass("score");
$(".match47").click(function(){
	window.open("https://youtu.be/N5F1hqWW_5w");
});

$(".match48").addClass("score");
$(".match48").click(function(){
	window.open("https://youtu.be/nc9zirKrT0Q");
});

$(".match49").addClass("score");
$(".match49").click(function(){
	window.open("https://www.youtube.com/watch?v=6C6oOcDFmLY");
})

$(".match50").addClass("score");
$(".match50").click(function(){
	window.open("https://www.youtube.com/watch?v=auqyXFLZ_zw");
})

$(".match51").addClass("score");
$(".match51").click(function(){
	window.open("https://www.youtube.com/watch?v=gHPke43iqNg");
})

$(".match52").addClass("score");
$(".match52").click(function(){
	window.open("https://www.youtube.com/watch?v=5_iIW2DZ8nc");
})



});