// runs function right when page is loaded
$(document).ready(function() {
let date = moment().format("MMM " + "D " + "YYYY");
let getPastSearch = localStorage.getItem("pastSearch");
if(getPastSearch){

renderWeather(getPastSearch);
}


console.log(date);
$("#currentDay").append(date);
// tutor had me put all my work into this new function to help with local storage doesnt seem right?
function renderWeather(city){
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
      let uvi = res.current.uvi
        let todayWeatherCard = $(`
          <div class="card">
          <h2>${cityName} (${date})</h2><img src="http://openweathermap.org/img/wn/${res.current.weather[0].icon}@4x.png"/>
          <p>Temperature: ${Math.round(res.current.temp)}&#176;F</p>
          <p>Humidity: ${res.current.humidity}%</p>
          <p>WindSpeed: ${res.current.wind_speed} MPH</p>
          <p id="uviColor">UV: ${uvi}</p>
          </div>
          
        // `) 
        // if(uvi<10){
        
        // }
       
        let fiveDay = res.daily.slice(0, 5);
       for(i=0;i<fiveDay.length;i++){
         console.log(fiveDay[i].humidity);
         let fiveDaydate = moment.unix(fiveDay[i].dt).format("MMM " + "D " + "YYYY");
         let fiveDayCard = $(`
         <div class="card">
         <h2>${city} (${fiveDaydate})</h2>
         <img src="http://openweathermap.org/img/wn/${fiveDay[i].weather[0].icon}@4x.png"/>
         <p>Temp: ${Math.round(fiveDay[i].temp.day)}</p>
         <p>Humidity: ${fiveDay[i].humidity}%</p>
        
         `);
      $("#fiveDaydisplay").append(fiveDayCard);
       }
     $("#weatherDisplay").prepend(todayWeatherCard);
     
      })
    

  });
}
// searches weatherAPI with city name with input value
$("#citySearch").on("click", function(event){
    event.preventDefault();
    let city = $("#cityInput").val();
    localStorage.setItem("pastSearch", city);
    renderWeather(city);
    let cityList = $("<ul>");
    let cityListItem = $("<button>");
    cityListItem.text(city);
    cityList.append(cityListItem);
    $("#previousSearches").append(cityList);
    
    
    // let apiKey = "7afbc8b8b768281509406526989fc001";
    // let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   }).then(function(response) {
    //     let lat = response.coord.lat;
    //     let lon = response.coord.lon;
    //     let cityName = response.name;
    //     console.log(response);
    //     // uses lat and lon in response to do another ajax call for UV and 4 day forecast
    //     $.ajax({
    //       // had to change "weather" to "onecall" in URL 
    //       url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=Imperial&appid="+apiKey,
    //       method: "GET"
    //       // using "res" as shorthand for "response"
    //     }).then(function(res){
    //       console.log(res);
    //       // creating divs dynamically
    //       let todayWeatherCard = $(`
    //         <div class="card">
    //         <h2>${cityName} (${date})</h2><img src="http://openweathermap.org/img/wn/${res.current.weather[0].icon}@4x.png"/>
    //         <p>Temperature: ${Math.round(res.current.temp)}&#176;F</p>
    //         <p>Humidity: ${res.current.humidity}%</p>
    //         <p>WindSpeed: ${res.current.wind_speed} MPH</p>
    //         <p>UV: ${res.current.uvi}</p>
    //         </div>
            
    //       `) 
    //       let fiveDay = res.daily.slice(0, 5);
    //      for(i=0;i<fiveDay.length;i++){
    //        console.log(fiveDay[i]);
    //        let fiveDaydate = moment.unix(fiveDay[i].dt).format("MMM " + "D " + "YYYY");
    //        let fiveDayCard = $(`
    //        <div class="card">
    //        <h2>(${fiveDaydate})</h2>
    //        <p>Temp: ${Math.round(fiveDay[i].temp.day)}</p>
    //        `)
    //     $("#fiveDaydisplay").append(fiveDayCard);
    //      }
    //    $("#weatherDisplay").prepend(todayWeatherCard);
       
    //     })
      

    // });
});

})
