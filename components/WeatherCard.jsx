'use client'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import style from '@/components/WeatherCard.module.css';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import Box from '@mui/material/Box';

const WeatherCard = ({ weatherData }) => {
    if (!weatherData || !weatherData.main) return null;
    let weatherInfo = {
        city: weatherData.name,
        temp: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        weather: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
    }
    let HOT_URL = "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";

    let RAIN_URL = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHJhaW55fGVufDB8fDB8fHww";

    let COLD_URL = "https://plus.unsplash.com/premium_photo-1671962687834-ace92a99e634?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhhemV8ZW58MHx8MHx8fDA%3D";

    return (
        <div className={style.cardContainer}>
            <Card sx={{
                maxWidth: 345, mt: 4, padding: 0,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transformStyle: 'preserve-3d',
                '&:hover': {
                    transform: 'scale(1.01) perspective(1000px) translateZ(20px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                },
            }}>
                <CardContent className={style.container}>
                    <img className={style.img} src={(weatherInfo.humidity > 80 && weatherInfo.temp > 10) ? RAIN_URL : weatherInfo.temp > 15 ? HOT_URL : COLD_URL} alt={weatherInfo.description} />

                    <Typography variant="h5">
                        <Box display="flex" alignItems="center" gap={1}>
                            {weatherInfo.city}
                            {(weatherInfo.humidity > 80 && weatherInfo.temp > 10) ? (
                                <ThunderstormOutlinedIcon />
                            ) : weatherInfo.temp > 15 ? (
                                <WbSunnyOutlinedIcon />
                            ) : (
                                <AcUnitIcon />
                            )}
                        </Box>
                    </Typography>
                    <Typography variant="body1" component={"span"}>
                        <p> <strong>Temperature:</strong> {weatherInfo.temp}°C </p>
                        <p> <strong>Weather:</strong> {weatherInfo.weather} </p>
                        <p> <strong>Min:</strong> {weatherInfo.temp_min}°C | <strong>Max:</strong> {weatherInfo.temp_max}°C </p>
                        <p> <strong>Humidity:</strong> {weatherInfo.humidity}% </p>
                        <p> The weather can be described as <i>{weatherInfo.description}</i> and feels like {(weatherInfo.feels_like)}°C </p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default WeatherCard
