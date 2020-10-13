// runs function right when page is loaded
$(document).ready(function() {
let date = moment().format("MMM " + "D " + "YYYY");

console.log(date);
$("#currentDay").append(date);
// searches weatherAPI with city name with input value
$("#citySearch").on("click", function(event){
    event.preventDefault();
    let city = $("#cityInput").val();
    let apiKey = "7afbc8b8b768281509406526989fc001";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let cityName = response.name;
        console.log(response);
        // uses lat and lon in response to do another ajax call for UV and 4 day forecast
        $.ajax({
          // had to change "weather" to "onecall" in URL 
          url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=Imperial&appid="+apiKey,
          method: "GET"
          // using "res" as shorthand for "response"
        }).then(function(res){
          console.log(res);
          // creating divs dynamically
          let todayWeatherCard = $(`
            <div class="card">
            <h2>${cityName} (${date})</h2><img src="http://openweathermap.org/img/wn/${res.current.weather[0].icon}@4x.png"/>
            <p>Temperature: ${Math.round(res.current.temp)}&#176;F</p>
            <p>Humidity: ${res.current.humidity}%</p>
            <p>WindSpeed: ${res.current.wind_speed} MPH</p>
            <p>UV: ${res.current.uvi}</p>
            </div>
            
          `) 
       $("#weatherDisplay").prepend(todayWeatherCard);
        })
      

    });
});

})
