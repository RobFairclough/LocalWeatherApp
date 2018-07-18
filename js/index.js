let latitude = "",
	longitude = "",
	temp = 0,
	desc = "",
	units = "",
	dayNight = "";

$(document).ready(function() {
	$("#giveLocationButton").on("click", function() {
		$("#giveLocationButton").hide();
		$(".loading").css("visibility", "visible");
		if (navigator.geolocation) {
			//get current location
			navigator.geolocation.getCurrentPosition(function(position) {
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;
				//console.log(latitude + " " + longitude);
				getWeather(latitude, longitude);
			});
		} else {
			console.log(
				"Error: geolocation failed - may not be supported by your browser"
			);
		}
	});
});

function getWeather(latitude, longitude) {
	var urlString =
		"https://fcc-weather-api.glitch.me" +
		"/api/current?lon=" +
		longitude +
		"&lat=" +
		latitude;
		console.log(urlString);
	$.getJSON(urlString, function(result) {
		$("#location").html("The weather in " + (result.name) + " now is " + result.weather[0].description);
		$("#temperature").html(JSON.stringify(result.main.temp) + "°C");
		
		
		temp = result.main.temp;		
		desc = result.weather[0].main;
		units = "metric";
		$(".main-content").css("visibility", "visible");
		$(".loading").css("visibility", "hidden");
		
		//sets icon and background image 
		console.log(desc);
		switch(desc) { 
			case 'Drizzle':
				document.getElementById("weather-icon").className = "fa fa-braille"
				document.body.style.backgroundImage = "URL('https://i.imgur.com/gDlDrdm.jpg')";
				break;
			case 'Clouds':
				document.getElementById("weather-icon").className = "fa fa-cloud"
				document.body.style.backgroundImage = "URL('https://i.imgur.com/tqCdqTp.png')";
				break;
			case 'Rain':
				document.getElementById("weather-icon").className = "fa fa-braille"
				document.body.style.backgroundImage = "URL('https://i.imgur.com/6tne7cC.jpg')";
				break;
			case 'Snow':
				document.getElementById("weather-icon").className = "fa fa-snowflake"
				document.body.style.backgroundImage = "URL('https://i.imgur.com/VRgoAYf.jpg')";
				break;
			case 'Clear':
				document.getElementById("weather-icon").className = "fa fa-sun"
				document.body.style.backgroundImage = "URL('https://i.imgur.com/Vucet2h.jpg')";
				break;
			case 'Thunderstorm':
				document.getElementById("weather-icon").className = "fa fa-bolt"
				document.body.style.backgroundImage = "URL('https://i.imgur.com/8z1DrGM.jpg')";
				break;
			case 'Mist':
			case 'Smoke':
				document.getElementById("weather-icon").className = "fa fa-align-justify"
				document.body.style.backgroundImage = "URL('https://i.imgur.com/2bVghQ0.jpg')";
				break;
			default:
				document.getElementById("weather-icon").className = "fa fa-question"
				console.log("No weather match for " + desc);
		} 
	//end background 
	});
	//start change units
	$("#changeUnitsButton").on("click", function() {
		if (units === "metric") {
			units = "imperial";
			temp = ((temp * 1.8) + 32).toFixed(1);
			 console.log(units + " " + temp);
			$("#temperature").html(temp + "°F");
		} else if (units === "imperial") {
			units = "metric";
			temp = ((temp - 32) * 0.556).toFixed(1);
			console.log(units + " " + temp);
			$("#temperature").html(temp + "°C");
		} else {
			console.log("Error");
		}
	});
	//end change units

} //end getWeather function