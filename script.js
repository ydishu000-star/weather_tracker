let btn = document.getElementById("searchBtn");

btn.onclick = getWeather;


function log(text){

    let box = document.getElementById("console");

    box.innerHTML = box.innerHTML + text + "<br>";

}



async function getWeather(){

    let city = document.getElementById("city").value;

    log("Button clicked");

    try{

        log("Fetching data from API");

        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + 
        "&appid=27e807c2a039b323c1b75bac56c42894&units=metric";

        let res = await fetch(url);

        log("API responded");

        let data = await res.json();

        log("Data received");

        if(data.cod != 200){

            alert("City not found");
            return;

        }

        document.getElementById("cityName").innerText =
        "City : " + data.name;

        document.getElementById("temp").innerText =
        "Temp : " + data.main.temp + " °C";

        document.getElementById("condition").innerText =
        "Weather : " + data.weather[0].main;

        document.getElementById("humidity").innerText =
        "Humidity : " + data.main.humidity + "%";

        document.getElementById("wind").innerText =
        "Wind : " + data.wind.speed + " m/s";

        saveCity(city);

    }

    catch(e){

        alert("Some error happened");

        log("Error while fetching");

    }

}



function saveCity(city){

    let list = localStorage.getItem("cities");

    if(list == null){

        list = [];

    }
    else{

        list = JSON.parse(list);

    }

    list.push(city);

    localStorage.setItem("cities", JSON.stringify(list));

    showHistory();

}



function showHistory(){

    let list = localStorage.getItem("cities");

    if(list == null){

        list = [];

    }
    else{

        list = JSON.parse(list);

    }

    let history = document.getElementById("history");

    history.innerHTML = "";

    for(let i=0;i<list.length;i++){

        let span = document.createElement("span");

        span.innerText = list[i];

        span.style.margin = "5px";

        span.onclick = function(){

            document.getElementById("city").value = list[i];

            getWeather();

        };

        history.appendChild(span);

    }

}

showHistory();
