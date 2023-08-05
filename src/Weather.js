import React, {useState} from "react";
import "./Weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props){
    const [city, setCity] = useState(props.defaultCity)
    const [weatherData, setWeatherData] = useState({});
    const [load, setLoad] = useState(false);

    function getWeatherData(response){
        setLoad(true);
        setWeatherData({
            city: response.data.city,
            country: response.data.country,
            temperature:response.data.temperature.current,
            wind: Math.round(response.data.wind.speed),
            description: (response.data.condition.description),
            humidity: response.data.temperature.humidity,
            pressure: response.data.temperature.pressure,
            weatherIcon: response.data.condition.icon_url,
            time: response.data.time
        });
    }

    let today = new Date(weatherData.time);
    let day = today.getDay();
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let hour = today.getHours();
    let minute = today.getMinutes();

    function minuteUpdate(){
        if (minute < 10){
            minute = `0${minute}`
        }
        return minute
    } 

    let fullDate = `${weekDays[day]} ${hour}:${minuteUpdate()}`

    function handleSubmit(event){
        event.preventDefault();
        search();
    }

    function handleCityChange(event){
       setCity(event.target.value);
       
    }

    function search(){
        const apiKey = "e5t51009395b749oa22101e37e04fc92";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(getWeatherData);
    }

    function handleGeoLocation(event){
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(showCoords);
    }

    function showCoords (position){
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        let key = "e5t51009395b749oa22101e37e04fc92"
        let apiUrl1 = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}`;
        axios.get(apiUrl1).then(getWeatherData);
    }

    if (load){
        return(
            <div className = "container">
            <div className="border">
                <ul className="row">
                    <li className = "col-3 top-country">Lisbon</li>
                    <li className = "col-3 top-country">Paris</li>
                    <li className = "col-3 top-country">Sydney</li>
                    <li className = "col-3 top-country">San Francisco</li>
                </ul>
                <br/>

                <form className = "row g-3" onSubmit={handleSubmit}>
                    <div className = "col-auto">
                        <label form="city-search" className = "visually-hidden">City-Search</label>
                        <input type="text" className="form-control" placeholder="Type in a city name" autoComplete="off" onChange={handleCityChange}/>
                    </div>
                    <div className = "col-auto">
                        <button type="submit" className="btn btn-primary mb-3">Search</button>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3" onClick={handleGeoLocation}>Search Current Location</button>
                    </div>
                </form>
                <WeatherInfo  DataWeather={weatherData} Datefull = {fullDate}/>
                <br/>
                <WeatherForecast CityInput ={weatherData.city}/>
                </div>
            <div className = "adjust">
                <strong>
                <a href="/" target="_blanck" rel="noopener noreferrer">Open source-code by Bidemi Olayisade</a>
                </strong>
            </div>
        </div>
        );
    } else {
        search();
        return(
            "Loading..."
        )
    }

}