# 06 Server-Side APIs: Weather Dashboard
* URL live: https://dempsey496.github.io/WeatherDashboard/

* First time done was create a jumbotron which displays the month, day, and year when the page is loaded. This was accomplised using Moment.

* I then created the element IDs in the html so I would have something to target with jquery.

* I then begin my Ajax calls, the first was used to look up _Lon_ and _Lat_, which in turn are used to put into my second Ajax call so more in depth data could be used (such as UV and 7 day forecast).

* Using Jquery I then prepended the targeted results to pre-exsisting ID elements.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```
![site image]<img src="Screenshot 2020-10-14 215933.png">

## Acceptance Criteria

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
* Done 
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
* Done
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
* Working
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
* Done
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
* Done
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
* Done

## Liscence 

MIT © Dempsey Finley