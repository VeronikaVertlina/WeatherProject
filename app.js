//jshint esversion:6.


const express = require("express");//1. require my express module.
const https = require("https");//defined https module
const bodyParser = require("body-parser");

const app = express();//2. app is going to initialize a new Express app.
app.use(bodyParser.urlencoded({extended: true}));

//4. When the user to tries to go to my home page, the root router.
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  //res.send("Server is up and running.");
});

app.post("/", function(req, res){
  //console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "249dafc7a3b856c050ebd3668511291e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather currently is " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
      //console.log(temp, weatherDescription);
  });
  //console.log("Post request received.")
});







//3. going to be listening on port 300 and add my call back function
//which is just going to console.console.log(
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
