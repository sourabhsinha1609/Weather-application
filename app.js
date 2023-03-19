const express = require("express");
const { get } = require("http");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function( req, res){
    
     res.sendFile(__dirname + "/index.html");
    
})
app.post("/", function(req, res){

    
    const query = req.body.cityName;
const apiKey = "00524d020ff244a25a984ebf4eaeeb00";
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +apiKey + "&units=" +unit;
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p> The weather is currently " +weatherDescription );
        res.write("<h1> The temperature in " + query + " is " + temp + "degrees Celsius. </h1>" );
        res.write("<img src=" +imageURl +">");  
        res.send();
    })  


})
    
})











app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})