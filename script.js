console.log("Hello World");

$("#citySearch").on("click", function(event){
    event.preventDefault();
    let city = $("#cityInput").val();
    let apiKey = "7afbc8b8b768281509406526989fc001";
    let queryURL = "api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $("#weatherDisplay").text(JSON.stringify(response));
    console.log(response.weather);  
    });
});
