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
	schedule.not(playingCountry).hide();		//removing schedules without the playing country

});

$(".all-button").click(function(){
	$(".schedule-wrapper").show();
	$(".match-container").show();
	$(".team").removeClass("selected");
})








});
