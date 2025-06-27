'use client'
import WeatherApp from '@/components/WeatherApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  return (
    <div>
    <ToastContainer position="top-center" />
     <WeatherApp/>
    </div>
  );
}
