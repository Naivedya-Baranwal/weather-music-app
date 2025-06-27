'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MusicApp from '@/components/MusicApp';
const Song = ({weatherData}) => {
    const [showMusicApp, setShowMusicApp] = useState(false);
    if (!weatherData || !weatherData.main) return null;
    const {temp,humidity} = weatherData.main;

    const getWeatherCategory = ({ temp, humidity }) => {
      if (temp > 15 && humidity > 80) return 'lofi';
      if (temp > 25) return 'energetic';
      if (temp <= 15 && humidity < 50) return 'acoustic chill';
      return 'ambient';
    };
      
      const genre = getWeatherCategory({temp,humidity});
  
  return (
    <div style={{ textAlign: 'center', marginTop: '1.6rem' }}>
        <Button color='black' startIcon={<LibraryMusicIcon />} variant='outlined' onClick={()=>setShowMusicApp(true)}>Get Songs by Weather</Button>
        {showMusicApp && <MusicApp genre={genre}/>}
    </div>
  )
}

export default Song