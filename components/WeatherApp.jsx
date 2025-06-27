'use client'
import React,{useState} from 'react'
import LocationInput from '@/components/LocationInput';
import WeatherCard from '@/components/WeatherCard';
import style from '@/components/WeatherCard.module.css';
import Song from '@/components/Song';

const WeatherApp = () => {
    const [weatherData, setweatherData] = useState({});
    let updateWeatherData =(result)=>{
        setweatherData(result.data);
    }
  return (
    <div> 
      <div >
         <h1 className={style.heading}>Weather-Music-App</h1>
         <LocationInput updateWeatherData={updateWeatherData}/>
         <WeatherCard weatherData={weatherData}/>
         <Song weatherData={weatherData}/>
         </div>
    </div>
  )
}

export default WeatherApp