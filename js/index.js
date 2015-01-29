//monkeypatch an addMinutes function to Date
Date.prototype.addMinutes= function(minute) {
	this.setMinutes(this.getMinutes() + minute);
	return this;
}

//this is the random addition to the time, in minutes
adjustment = 0;

$(function ($) {
	initTime();
	initListeners();

	function initTime() {
		setInterval(function() { clock() }, 500);
	}

	function initListeners() {
		$('.sleep').on('click', function () {
      setTimeout(function(){
        adjustment = Math.floor(Math.random() * 15) + 1
      }, 1800000);
		})

		$('.wake-up').on('click', function () {
      setTimeout(function(){
  			adjustment = 0;
      }, 1800000);
		})

		$('.set-alarm').on('click', function() { setAlarm() });
		$('.wake-up').on('click', function() { wakeUp() });
		$('.sleep').on('click', function() { sleep() });
		$('.alarm-meridian').on('click', function() { toggleMeridian() });
	}

	function clock(){
		timeSplitter();
		updateTime();
	}

	function timeSplitter() {
		Today  = new Date().addMinutes(adjustment);
		hour   = enforceDoubleDigits(Today.getHours());
		minute = enforceDoubleDigits(Today.getMinutes());
		second = enforceDoubleDigits(Today.getSeconds());
	}

	function updateTime() {
		$(".hour").text(hour % 12 + ": ");
		$(".minute").text(minute  + ": ");
		$(".second").text(second  + " ");
	}

  //convert single digits to double digit format, 5 becomes 05.
  function enforceDoubleDigits(str) {
  	return str.toString().length === 1 ? '0' + str : str;
  }

  function setAlarm() {
  	$(".alarm").css("opacity", "1");
  	$(".time").css("opacity", "0.4");
  	$(".selector").css("top", "45.5%");
  	$(".set-alarm").css("display", "none");
  	$(".sleep").css("display", "initial");
  	$("#hour-input").focus();
  }

  function sleep() {
  	$(".sleep").css("display", "none");
  	$(".wake-up").css("display", "initial");
  	$("body").css("background-color", "#162145");
  }

  function wakeUp() {
  	$(".alarm").css("opacity", "0");
  	$(".set-alarm").css("display", "initial");
  	$(".sleep").css("display", "none");
  	$(".wake-up").css("display", "none");
		$(".time").css("opacity", "1");

  	$("body").css("background-color", "#00ABA9");
  }

	function toggleMeridian() {
		var meridian = $(".alarm-meridian").text();
		if(meridian == "am") {
			$(".alarm-meridian").text("pm");
		} else {
			$(".alarm-meridian").text("am");
		}
	}

});