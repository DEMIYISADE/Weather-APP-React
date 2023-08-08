import React from "react";
import Weather from "./Weather";
import TemperatureConversion from "./TemperatureConversion";


export default function WeatherInfo(props){
    return ( 
<div>
<br/>
<div className="row md-4">
    <div className="col-3 second-Layer">
        <div className="currentTime">
            <span>{props.Datefull}</span>
        </div>
        <div className="city">
            <span> City: </span>
            <span> {props.DataWeather.city} </span>
        </div>
        <div className = "country">
            <span> Country: </span>
            <span> {props.DataWeather.country}</span>
        </div>
        <div className = "weatherDescription">
            <span> Description: </span>
            <span>{(props.DataWeather.description)}</span>
        </div>
        <br/>
        <TemperatureConversion celsiusTemp={Math.round(props.DataWeather.temperature)} WeatherImg={props.DataWeather.weatherIcon}/>
    </div>
    <div className="col-3"></div>
    <div className="col-3"></div>
    <div className="col-3 second-Layer">
        <ul className="detailsRight">
            <li>
                Humidity:
                <span className="humidity"> {props.DataWeather.humidity} </span>%
            </li>
            <li> Wind:
                <span className="wind"> {props.DataWeather.wind} </span>km/h
            </li>
            <li> Pressure:
                <span className="pressure"> {props.DataWeather.pressure} </span>
            </li>
        </ul>
    </div>
</div>
    </div>

    );
}