$(document).ready(function() {
let date = moment().format("MMM " + "D " + "YYYY");

console.log(date);
$("#currentDay").append(date);
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
        $.ajax({
          url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=Imperial&appid="+apiKey,
          method: "GET"
        }).then(function(res){
          console.log(res);
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
