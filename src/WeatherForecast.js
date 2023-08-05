import React, {useState, useEffect} from "react";
import axios from "axios";
import Weather from "./Weather";

export default function WeatherForecast(props){
    const [load, setLoaded] = useState(false);
    const [forecastData, setForecastData] = useState({});
    
    useEffect(() => {
        setLoaded(false);
    }, [props.CityInput]);

    function showForecast (response){
        
        setLoaded(true);
        setForecastData (response.data.daily)
        console.log(response.data.daily);
    }

    if (load === true){
        let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
        return(
            <div className ="forecastBlock">
                <div className="row">
                {forecastData.map(function(forecastDaily, index){
                    if (index < 6){
                        return(
                            <div className="col-2" key={index}>
                            <div className="weekDay">{days[new Date(forecastDaily.time *1000).getDay()]}</div>
                            <div className="forecastImage">
                                <img src={forecastDaily.condition.icon_url} alt="forecast weather icon"/>
                            </div>
                            <div className="forecastTemperature">
                                <span className="maxTemp"> {Math.round(forecastDaily.temperature.maximum)} </span> |
                                <span className="minTemp"> {Math.round(forecastDaily.temperature.minimum)} </span>
                            </div>
                        </div>
                        )
                    }else{
                        return (null);
                    }
                })}
                </div>
            </div>
        )
    } else {
        let appkey = "e5t51009395b749oa22101e37e04fc92";
        let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${props.CityInput}&key=${appkey}&units=metric`;
        axios.get(apiUrl2).then(showForecast);
        
        return (
            "Loading..."
        )
    }
    
    
}