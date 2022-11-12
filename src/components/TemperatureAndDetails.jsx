import React from 'react';
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperatureThreeQuarter,
    UilTemperature,
    UilTemperatureEmpty,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({weather: {
    description, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone
}, units}) {

    function speedUnit() {
        return (units === "metric" ? "m/s" : "mph");
    }
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-xl text-white">
            <p className='capitalize text-2xl'>
                {description}
            </p>
        </div>

        <div className="flex flex-row items-center justify-between text-white py-3">

            <img src={iconUrlFromCode(icon)} alt="" className="w-20"/>

            {/* toFixed allows you to round */}
            <p className="flex flex-col space-y-2 text-6xl">{`${temp.toFixed()}`}&#176;</p>

            <div className="flex flex-col space-y-2">
                <div className='flex font-light text-sm items-center justify-start'>
                    <UilTemperatureThreeQuarter  size={18} className="mr-1"/>
                    Real feel:
                    <span className='font-medium ml-1'>{`${feels_like.toFixed()}`}&#176;</span>
                </div>
                <div className='flex font-light text-sm items-center justify-start'>
                    <UilTear  size={18} className="mr-1"/>
                    Humidity:
                    <span className='font-medium ml-1'>{humidity}%</span>
                </div>
                <div className='flex font-light text-sm items-center justify-start'>
                    <UilWind  size={18} className="mr-1"/>
                    Wind:
                    <span className='font-medium ml-1'>
                        {speed.toFixed() + " " + speedUnit()}
                    </span>
                </div>
            </div>

        </div>

        <div className='flex flex-row items-center justify-center space-x-1 text-white text-sm py-3'>

            <UilSun />
            <p className='font-light'>
                Rise: <span className='font-medium'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
            </p>
            <p className='font-light px-0.5'> | </p>

            <UilSunset />
            <p className='font-light'>
                Sunset: <span className='font-medium'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
            </p>
            <p className='font-light px-0.5'> | </p>

            <UilTemperature size={20}/>
            <p className='font-light'>
                High: <span className='font-medium'>{temp_max.toFixed()}&#176;</span>
            </p>
            <p className='font-light px-0.5'> | </p>

            <UilTemperatureEmpty size={20}/>
            <p className='font-light'>
                Low: <span className='font-medium'>{temp_min.toFixed()}&#176;</span>
            </p>

        </div>



    </div>
  )
}

export default TemperatureAndDetails