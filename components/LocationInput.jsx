'use client'
import React,{useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudIcon from '@mui/icons-material/Cloud';
import style from '@/components/LocationInput.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const LocationInput = ({updateWeatherData}) => {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY=process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const [location, setlocation] = useState('');
  
  const getWeatherData= async()=>{
    try{
       const response = await axios.get(`${API_URL}?q=${location}&appid=${API_KEY}&units=metric`); 
       return response; 
    } catch(error){
      toast.error('❌ City not found. Please enter a valid location.');
      return null;
    }
  }
  
  const handleChange =(e)=>{
    setlocation(e.target.value);
  } 
  const handleSubmit = async(e)=>{
      e.preventDefault();
      const info = await getWeatherData();
      if(info){
      updateWeatherData(info);
      setlocation("");
    }
  }
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
      <TextField color='black' onChange={handleChange} className={style.textfield} id="outlined-basic" label="Enter City" variant="outlined" required value={location}/>
      <Button color='black' type='submit' startIcon={<CloudIcon />} variant="outlined" size="medium" >Get Weather</Button>
      </form>
    </div>
  )
}

export default LocationInput
