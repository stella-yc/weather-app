/* Free Code Camp Challenge
-- Check what the API is returning by visiting:
https://api.wunderground.com/api/0b0f37359b3ff36d/conditions/astronomy/q/40.4601141,-80.01276039999999.json
*/

const apiKey = '0b0f37359b3ff36d';

const dogs = {
	sunnyDog: {
		"url":"<img src='https://upload.wikimedia.org/wikipedia/commons/5/57/7weeks_old.JPG'>",
		"attribution": "<p>Image By Bodlina (Own work) [<a href='http://www.gnu.org/copyleft/fdl.html'>GFDL</a> or <a href='http://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA-3.0</a>], <a href='https://commons.wikimedia.org/wiki/File%3A7weeks_old.JPG'>via Wikimedia Commons</a></p>"},
	rainyDog: {
		"url":"<img src='https://upload.wikimedia.org/wikipedia/commons/d/df/Golden_retriever_swimming_1380221.jpg'>",
		"attribution":'<p>Image © Nevit Dilmen [<a href=http://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a> or <a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>], <a href="https://commons.wikimedia.org/wiki/File%3AGolden_retriever_swimming_1380221.jpg">via Wikimedia Commons</a></p>'},
	thunderDog: {
		"url": "<img src='https://upload.wikimedia.org/wikipedia/commons/4/4e/Kiara.JPG'>",
		"attribution":'<p>Image by LuKaS Cuba (Own work) [<a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA-3.0</a> or <a href="http://artlibre.org/licence/lal/en">FAL</a>], <a href="https://commons.wikimedia.org/wiki/File%3AKiara.JPG">via Wikimedia Commons</a></p>'},
	cloudyDog: {
		"url":"<img src='https://upload.wikimedia.org/wikipedia/commons/b/ba/Miniature_Pom.jpg'>",
		"attribution":'<p>Image by Summerinthecity90 (Own work) [<a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>], <a href="https://commons.wikimedia.org/wiki/File%3AMiniature_Pom.jpg">via Wikimedia Commons</a></p>'},
	snowyDog: {
		"url":"<img src='https://upload.wikimedia.org/wikipedia/commons/b/b7/Langhaardackel_merlin_2005.jpg'>",
		"attribution":'<p>Image by Rainer Spickmann (Own work) [<a href="http://creativecommons.org/licenses/by-sa/2.5">CC BY-SA 2.5</a>], <a href="https://commons.wikimedia.org/wiki/File%3ALanghaardackel_merlin_2005.jpg">via Wikimedia Commons</a></p>'},
	mistyDog: {
		"url":"<img src='https://upload.wikimedia.org/wikipedia/commons/b/bd/2014_Westminster_Kennel_Club_Dog_Show_%2812451551343%29.jpg'>",
		"attribution":'<p>Image by Pets Adviser from Brooklyn, USA (2014 Westminster Kennel Club Dog Show) [<a href="http://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>], <a href="https://commons.wikimedia.org/wiki/File%3A2014_Westminster_Kennel_Club_Dog_Show_(12451551343).jpg">via Wikimedia Commons</a></p>'},
	defaultDog: {
		"url":"<img src='https://upload.wikimedia.org/wikipedia/commons/8/8c/Sleeping_Pups.jpg'>",
		"attribution":'<p>By Bev Sykes from Davis, CA, USA (Flickr) [<a href="http://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>], <a href="https://commons.wikimedia.org/wiki/File%3ASleeping_Pups.jpg">via Wikimedia Commons</a></p>'}
	};

var latitude;
var longitude;
var address;
var htmlFahr;
var htmlCels;
var htmlMain;
var htmlCity;
var sunrise;
var sunset;
var timestamp;


jQuery(document).ready(function($) {
//Get geolocation coordinates
  // const geoSuccess = (position) => {
  //   console.log('position');
  //   latitude = position.coords.latitude;
  //   longitude = position.coords.longitude;
  //   console.log(latitude);
  //   console.log(longitude);
  //   //Create url to send request to
  //   address = "https://api.wunderground.com/api/" + apiKey + "/conditions/astronomy/q/" + latitude + "," + longitude +".json";
  //   //Run function getWeather, see below
  //   getWeather();

  // };

  if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			console.log(latitude);
			console.log(longitude);
			//Create url to send request to
			address = "https://api.wunderground.com/api/" + apiKey + "/conditions/astronomy/q/" + latitude + "," + longitude +".json";
			//Run function getWeather, see below
			getWeather();

		});
  } else {
    // no geolocation :(
    var msg = "Sorry, looks like your browser doesn't support geolocation";
    $(".coordinates").html(msg); // output error message
  }
});


function getWeather () {
	$.getJSON(address, function(json){
			//Get temperature
			htmlFahr = json.current_observation.temp_f;
			$(".temp").html(htmlFahr+ "&deg;F");
			//Get weather
			htmlMain = json.current_observation.weather;
			$(".main").html(htmlMain);
			//Get city
			htmlCity = json.current_observation.full;
			$(".city").html(htmlCity);
			//Gather time information to pass to function weatherIcon,
			//which will determine if it is day or night
			//store the time of sunrise in minutes
			var sunriseH = json.sun_phase.sunrise.hour;
			sunrise = sunriseH * 60 + json.sun_phase.sunrise.minute;
			//store the time of sunset in minutes
			var sunsetH = json.sun_phase.sunset.hour;
			sunset = sunsetH * 60 + json.sun_phase.sunrise.minute;
			//Get the current time in minutes
			var timestampH = json.moon_phase.current_time.hour;
			timestamp = timestampH * 60 + json.moon_phase.current_time.minute;
			// Call function weatherIcon to get the matching weather image/icon
			weatherIcon(htmlMain, sunrise, sunset, timestamp);
			//Hide initial loading text
			$("#loading-text").hide();
			//Show weather information
			$(".weatherdiv").show();
	});
}
// Get matching weather image/icon
function weatherIcon(htmlMain, sunrise, sunset, timestamp) {
	//CLEAR
	if (htmlMain === "Clear") {
			//Day
			// if the current time is greater than the sunrise and less than sunset
			//	then it must be daytime
			if (parseInt(timestamp) >= parseInt(sunrise) && parseInt(timestamp) <= parseInt(sunset)) {
				$(".icon").html(dogs.sunnyDog.url);
				$(".img-attribution").html(dogs.sunnyDog.attribution);
			//Night
			} else {
				$(".icon").html(dogs.defaultDog.url);
				$(".img-attribution").html(dogs.defaultDog.attribution);
			}
	//Cloudy
	} else if (htmlMain.indexOf('Cloud') >= 0) {
			$(".icon").html(dogs.cloudyDog.url);
			$(".img-attribution").html(dogs.cloudyDog.attribution);
	//Rainy
	} else if (htmlMain.indexOf('Rain') >= 0)  {
			console.log("RainyDog")
			$(".icon").html(dogs.rainyDog.url);
			$(".img-attribution").html(dogs.rainyDog.attribution);
	//Drizzle
	} else if (htmlMain.indexOf('Drizzle') >= 0) {
			$(".icon").html(dogs.rainyDog.url);
			$(".img-attribution").html(dogs.rainyDog.attribution);
	//Thunder
	} else if (htmlMain.indexOf('Thunder') >= 0 || htmlMain.indexOf('Hail') >= 0) {
			$(".icon").html(dogs.thunderDog.url);
			$(".img-attribution").html(dogs.thunderDog.attribution)
	//Snow
	} else if(htmlMain.indexOf('Snow') >=0) {
			$(".icon").html(dogs.snowyDog.url);
			$(".img-attribution").html(dogs.snowyDog.attribution)
	//Mist
	} else if(htmlMain.indexOf('Mist') >=0) {
			$(".icon").html(dogs.mistyDog.url);
			$(".img-attribution").html(dogs.mistyDog.attribution)
	//Default
	} else {
			$(".icon").html(dogs.defaultDog.url);
			$(".img-attribution").html(dogs.defaultDog.attribution)
			console.log("default")
	}
}
//Switch between Celsius and Fahrenheit
$(".temp-button").click(function() {
	if ($(".temp-button").html() === "Celsius") {
		htmlCels = Math.round((htmlFahr - 32) * 5/9)
		$(".temp").html(htmlCels + "&deg;C");
		$(".temp-button").html("Fahrenheit");
	} else {
		$(".temp").html(htmlFahr + "&deg;F");
		$(".temp-button").html("Celsius");
	}
});


function getLocation(callbackFn) {
  if('geolocation' in navigator){
    // geolocation is supported :)
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			//Create url to send request to
			address = "https://api.wunderground.com/api/" + apiKey + "/conditions/astronomy/q/" + latitude + "," + longitude +".json";
			//Run function getWeather, see below
			callbackFn();
		});
  } else {
    // no geolocation :(
    var msg = "Sorry, looks like your browser doesn't support geolocation";
    $(".coordinates").html(msg); // output error message
  }
}
