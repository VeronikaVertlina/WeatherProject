//jshint esversion:6.

//1. require my express module.
const express = require("express");

//defined https module
const https = require("https");

//2. app is going to initialize a new Express app.
const app = express();

//4. When the user to tries to go to my home page, the root router.
app.get("/", function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Tel-Aviv&appid=249dafc7a3b856c050ebd3668511291e&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      console.log(temp, weatherDescription);
    });
  });

  res.send("Server is up and running.");
});






//3. going to be listening on port 300 and add my call back function
//which is just going to console.console.log(
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
