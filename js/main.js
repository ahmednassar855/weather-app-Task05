// https://www.weatherapi.com/

// http://api.weatherapi.com/v1

//http://api.weatherapi.com/v1/current.json?key=72c1c3226ade4eecbb4135111221610&q=London

// JSON: http://api.weatherapi.com/v1/forecast.json?key=72c1c3226ade4eecbb4135111221610&q=07112&days=7

var sercheadLocation = document.querySelector(".input-search");
var getVaildLocation = new String; 

var allForecasts = [];

function locationNameValidation(){
  var locationNameRegex = /^[a-z]{3,20}$/ig; 
  if (sercheadLocation.value.match(locationNameRegex) ){
    return true;
  }else if (sercheadLocation.value = ""){
    sercheadLocation.value = "cairo";
  }
  else{
   errorMessage()
   console.log("please enter character only min 3 max 20 chaarcters");
   return false;
  } 
}

function search(){
  if (locationNameValidation()){
    var getVaildLocation = sercheadLocation.value.toLowerCase();
    var req = new XMLHttpRequest();
    req.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=72c1c3226ade4eecbb4135111221610&q=${getVaildLocation}&days=7`);
    req.send();
    
    req.addEventListener("loadend" , function(){
      if (req.status == 400){
        console.log("this value is not exist please try again")
      }
      if ( req.status == 200 ){
          var getResponse = JSON.parse( req.response );
          if (allForecasts.length  >= 0){
            allForecasts.splice(allForecasts[0],1);
         }
          allForecasts.push(getResponse);
          
          console.log("hamada")
          console.log(allForecasts);
         display();
      }  
  });
  }
  
}

function display(){
    // got data and displayed in first column
   //  changeTempDegree();
    document.querySelector('.error-message').classList.replace('d-flex','d-none');

    determinWindDirection();
    document.querySelector('.today-forecast .weatherLocation').innerHTML = allForecasts[0].location.name;  
    document.querySelector('.today-forecast .weatherCountry').innerHTML = allForecasts[0].location.country;  
    
    document.querySelector('.today-forecast .day-calender').innerHTML = allForecasts[0].forecast.forecastday[0].date;
    document.querySelector('.today-forecast .forcast-day').innerHTML = getWeekendDayName();

   
   document.querySelector('.today-forecast .forecast-degree').innerHTML = allForecasts[0].current.temp_c + `<sup>o</sup>` + `<span>C</span>`;
    
    document.querySelector('.today-forecast .forecast-img').setAttribute("src", "https:"+ allForecasts[0].current.condition.icon);
    document.querySelector('.today-forecast .forecast-condition').innerHTML = allForecasts[0].current.condition.text;
    document.querySelector('.today-forecast .humidity').innerHTML = allForecasts[0].current.humidity;
    document.querySelector('.today-forecast .wind').innerHTML = allForecasts[0].current.wind_kph + " km/h";
    
    document.querySelector('.today-forecast .direction').innerHTML = windDirection;
    // got data and displayed in second column
    document.querySelector('.next-forecast .next-day').innerHTML = getWeekendNextDayName();
    document.querySelector('.next-day-forecast-img').setAttribute("src", "https:"+ allForecasts[0].forecast.forecastday[1].day.condition.icon);
    document.querySelector('.next-day-max-temp').innerHTML = allForecasts[0].forecast.forecastday[1].day.maxtemp_c;
    document.querySelector('.next-day-min-temp').innerHTML = allForecasts[0].forecast.forecastday[1].day.mintemp_c;
    document.querySelector('.next-day-forecast-degree .forecast-condition').innerHTML = allForecasts[0].forecast.forecastday[1].day.condition.text;

    // got data and displayed in third column
    document.querySelector('.next-after-day').innerHTML = getWeekendNextAfterDayName();
    document.querySelector('.next-after-forecast-img').setAttribute("src", "https:"+ allForecasts[0].forecast.forecastday[2].day.condition.icon);
    document.querySelector('.next-after-max-temp').innerHTML = allForecasts[0].forecast.forecastday[2].day.maxtemp_c;
    document.querySelector('.next-after-min-temp').innerHTML = allForecasts[0].forecast.forecastday[2].day.mintemp_c;
    document.querySelector('.next-after-forecast-degree .forecast-condition').innerHTML = allForecasts[0].forecast.forecastday[2].day.condition.text;
}    


// function to get the weedend day name  of current day
function getWeekendDayName(){
  var timestamp = allForecasts[0].forecast.forecastday[0].date_epoch;
  var xx = new Date();
  var yy = xx.setTime(timestamp*1000);
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = days[xx.getDay()];
  return day;
}

// function to get the weedend day name after one day
function getWeekendNextDayName(){
  var timestamp = allForecasts[0].forecast.forecastday[1].date_epoch;
  var xx = new Date();
  var yy = xx.setTime(timestamp*1000);
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = days[xx.getDay()];
  return day;
}

// function to get the weedend day name  after two days
function getWeekendNextAfterDayName(){
  var timestamp = allForecasts[0].forecast.forecastday[2].date_epoch;
  var xx = new Date();
  var yy = xx.setTime(timestamp*1000);
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = days[xx.getDay()];
  return day;
}

// funvtion to get the wind direction by name
var windDirection = "";
function determinWindDirection(){
 
  if ( allForecasts[0].current.wind_dir == "W" ){
     windDirection = 'West';
  }
  if ( allForecasts[0].current.wind_dir == "N"){
     windDirection = "North"
  }
  if ( allForecasts[0].current.wind_dir == "E"){
     windDirection = "East"
  }
  if ( allForecasts[0].current.wind_dir == "S"){
     windDirection = "South"
  }
  if ( allForecasts[0].current.wind_dir == "NE"){
     windDirection = "North-East"
  }
  if ( allForecasts[0].current.wind_dir == "SE"){
     windDirection = "South-East"
  }
  if ( allForecasts[0].current.wind_dir == "SW"){
     windDirection = "South-East"
  }
  if ( allForecasts[0].current.wind_dir == "NW"){
     windDirection = "North-East";
  }
  if ( allForecasts[0].current.wind_dir == "NNE"){
     windDirection = 'North North-East';
  }
  if ( allForecasts[0].current.wind_dir == "NSE"){
     windDirection = "North South-East";
  }
  if ( allForecasts[0].current.wind_dir == "ENW"){
     windDirection = "East North-west";
  }
  if ( allForecasts[0].current.wind_dir == "ESW"){
     windDirection = "East south-west";
  }
  if ( allForecasts[0].current.wind_dir == "SSE"){
     windDirection = "South South-East"
  }
  if ( allForecasts[0].current.wind_dir == "SSW"){
     windDirection = "South south west";
  }
  if ( allForecasts[0].current.wind_dir == "WSW"){
     windDirection = "west south-west"
  }
  if ( allForecasts[0].current.wind_dir == "WNW"){
     windDirection = "west north-west"
  }
}

function errorMessage(){
      document.querySelector('.error-message').classList.replace('d-none','d-flex');  
} 

