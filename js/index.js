//monkeypatch an addMinutes function to Date
Date.prototype.addMinutes= function(minute) {
	this.setMinutes(this.getMinutes() + minute);
	return this;
}

//this is the random addition to the time, in minutes.
//it is set by randomAdjustment(), and resetAdjustment().
adjustment = 0;

$(function ($) {
	initTime();
	initListeners();
	function initTime() {
		setInterval(function() { clock(); parseAlarmInput(); }, 500);
	}

	function initListeners() {
		$('.sleep').on('click', function () {
      $.when(
        endTimeouts()
        ).then(
        randomAdjustment()
        );
      });

		$('.wake-up').on('click', function () {
      $.when(
        endTimeouts()
        ).then(
        resetAdjustment()
        );
      });

    $("#hour-input, #minute-input").on('input', function() {
      var hour = $("#hour-input").val();
      var minute = $("#minute-input").val();

      //there's gotta be a better way to write these conditionals. Help, Augustine.
      if(hour != "" && minute != "" && hour < 13 && hour > 0 && minute > -1 && minute < 60) {
        $(".sleep").removeClass("unclickable faded");
      } else {
        $(".sleep").addClass("unclickable faded");
      }
    });

    $('.question-mark').on('click', function() { openAbout() });
    $('.close-chevron').on('click', function() { closeAbout() });
		$('.set-alarm').on('click', function() { setAlarm() });
		$('.wake-up').on('click', function() { wakeUp() });
		$('.sleep').on('click', function() { sleep() });
		$('#meridian-input').on('click', function() { toggleMeridian() });
	}

  function endTimeouts(){
    if (typeof timeout1 != 'undefined'){
      clearTimeout(timeout1);
    }else if (typeof timeout2 != 'undefined'){
      clearTimeout(timeout2);
    }
  }

  function randomAdjustment(){
    timeout1 = setTimeout(function(){
      adjustment = Math.floor(Math.random() * 15) + 1;
    }, 20000);
  }

  function resetAdjustment(){
    timeout2 = setTimeout(function(){
      adjustment = 0;
    }, 20000);
  }

  function clock(){
    timeSplitter();
    updateTime();
  }

  function parseClockVals(alarm){
    var timeInt = parseInt(hour) + ' ' + parseInt(minute);
    var sound = new Audio('alarm.wav');

    if (alarm == timeInt && $(".set-alarm").css("display") != "inline-block"){
      sound.play();
      $('#main-header').text('it is time! awake!');
    } else {
      $('#main-header').text('always on time');
    }
  }

  function parseAlarmInput(){
    var alarm_hour = parseInt($('#hour-input').val());
    var alarm_minute = parseInt($('#minute-input').val());
    var alarm_meridian = $('#meridian-input').text().trim();

    if (alarm_meridian == 'pm') {
      alarm_hour += 12;
    } else if (alarm_meridian == 'am' && alarm_hour == 12) {
      alarm_hour = 0;
    }
    var alarm = alarm_hour + ' ' + alarm_minute;
    return parseClockVals(alarm);
  }

  function timeSplitter() {
    Today  = new Date().addMinutes(adjustment);
    hour   = enforceDoubleDigits(Today.getHours());
    minute = enforceDoubleDigits(Today.getMinutes());
    second = enforceDoubleDigits(Today.getSeconds());
  }

  function updateTime() {
    if (hour % 12 == 0){
      hour_string = "12";
    } else {
      hour_string = hour % 12;
    }
    $(".hour").text(hour_string + " : ");
    $(".minute").text(minute  + " : ");
    $(".second").text(second  + " ");
  }

  //converts single digits to double digit format, 5 becomes 05.
  function enforceDoubleDigits(str) {
  	return str.toString().length === 1 ? '0' + str : str;
  }

  function openAbout() {
    $(".main-page").css("left", "-100vw");
    $(".about-page").css("left", "0vw");
  }

  function closeAbout() {
    $(".main-page").css("left", "0vw");
    $(".about-page").css("left", "100vw");
  }

  //TODO: add keydown functionality
  //tie button to enter and spacebar
  function setAlarm() {
    $(".alarm").css("opacity", "1");
    $(".time").css("opacity", "0.4");
    $(".selector").css("top", "45.5%");
    $(".set-alarm").css("display", "none");
    $(".sleep").css("display", "initial");
    $("#hour-input").focus();
    $(".alarm-label").removeClass("hide");
    $("input").css("border-bottom", "1px solid white");
    $("#hour-input").val("");
    $("#minute-input").val("");
  }

  function sleep() {
    $(".alarm-label").toggleClass("hide");
    $(".alarm-set-for").toggleClass("hide");
    $("input").css("border-bottom", "none");
    $(".sleep").css("display", "none");
    $(".wake-up").css("display", "initial");
    $("body").css("background-color", "#162145");
    $(".alarm-hour").toggleClass("unclickable");
    $(".alarm-minute").toggleClass("unclickable");
    $("#meridian-input").toggleClass("unclickable");
  }

  function wakeUp() {
    $(".alarm-set-for").toggleClass("hide");
    $(".sleep").addClass("unclickable faded");
  	$(".alarm").css("opacity", "0");
  	$(".set-alarm").css("display", "initial");
  	$(".sleep").css("display", "none");
  	$(".wake-up").css("display", "none");
    $(".time").css("opacity", "1");
    $(".alarm-hour").toggleClass("unclickable");
    $(".alarm-minute").toggleClass("unclickable");
    $("#meridian-input").toggleClass("unclickable");
    $("body").css("background-color", "#00ABA9");
  }

  function toggleMeridian() {
    var meridian = $("#meridian-input").text();
    if(meridian == "am") {
     $("#meridian-input").text("pm");
   } else {
     $("#meridian-input").text("am");
   }
 }
});