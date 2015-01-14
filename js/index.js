$(document).ready(function (){
	updateTime();
});

function updateTime() {
	var Today = new Date();
	var Hour = Today.getHours();
	var Minute = Today.getMinutes();
	var Second = Today.getSeconds();
	var Meridian = "AM";
	if(Hour > 11) {
		Meridian = "PM";
	}

	$(".hour").text(Hour%12 + ": ");
	$(".minute").text(Minute + ": ");
	$(".second").text(Second + " " + Meridian);

	setTimeout(function(){updateTime()},500);
}

function sleep() {
	$(".go-to-sleep-btn").css("display", "none");
	$(".wake-up-btn").css("display", "inline");
}

function wakeUp() {
	$(".go-to-sleep-btn").css("display", "inline");
	$(".wake-up-btn").css("display", "none");
}