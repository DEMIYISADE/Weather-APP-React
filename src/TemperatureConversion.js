import React, {useState} from "react";
import WeatherInfo from "./WeatherInfo";
import "./TemperatureConversion.css";


export default function TemperatureConversion(props){
    const [fault, setFault] = useState (true);
    const [conversion, setConversion] = useState(props.celsiusTemp);

    function handleFarenConv(event){
        event.preventDefault();
        setConversion (Math.round((props.celsiusTemp * 9/5) + 32));
        setFault(false);
    }

    function handleCelConv(event){
        event.preventDefault();
        setConversion (props.celsiusTemp);
        setFault(true);
    }
    if (fault) {

        return(
            <div className="temperature">
            <img src={props.WeatherImg} alt=""/>
            <span className="temperatureNumber" id="TemperatureNumber"> {props.celsiusTemp} </span>
            <span className="degree" id="celsius">
                <a href="/"> ℃ </a>
            </span>
            <span className="degree">
                <a href="/" className="active" onClick={handleFarenConv} > |℉ </a>
            </span>
        </div>
        );
    } else {
        return (
            <div className="temperature">
            <img src={props.WeatherImg} alt=""/>
            <span className="temperatureNumber" id="TemperatureNumber"> {conversion} </span>
            <span className="degree" id="celsius">
                <a href="/" className= "active" onClick={handleCelConv}> ℃ </a>
            </span>
            <span className="degree">
                <a href="/"> |℉ </a>
            </span>
        </div>
        )
    }


}