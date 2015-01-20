$(document).ready(function (){
	updateTime();
});

Date.prototype.addMinutes= function(minute){
    this.setMinutes(this.getMinutes()+minute);
    return this;
}


rngr = 0;

function updateTime(rngr) {
	if (rngr){
		var Today  = new Date().addMinutes(rngr);
	} else {
		var Today  = new Date();
	}
	var hour   	 = returnDoubleDigits(Today.getHours());
	var minute 	 = returnDoubleDigits(Today.getMinutes());
	var second 	 = returnDoubleDigits(Today.getSeconds());
	var meridian = (hour < 11 ? "am" : "pm");

	$(".hour").text(hour % 12 + ": ");
	$(".minute").text(minute + ": ");

	if (second.toString().length == 1) {
		second = "0" + second;
	} else {
		$(".second").text(second + " " + meridian);
	}

	$('.go-to-sleep-btn').on('click', function(){
		rngr = Math.floor(Math.random() * 15) + 1;
	})

	$('.wake-up-btn').on('click', function(){
		rngr = 0;
	})
		setTimeout(function(){updateTime(rngr)},500);
}

function returnDoubleDigits(str) {
  return str.toString().length === 1 ? '0' + str : str;
}

function sleep() {
	$(".go-to-sleep-btn").css("display", "none");
	$(".wake-up-btn").css("display", "inline");
	$("body").css("background-color", "#162145");
}

function wakeUp() {
	$(".go-to-sleep-btn").css("display", "inline");
	$(".wake-up-btn").css("display", "none");
	$("body").css("background-color", "#00ABA9");
}