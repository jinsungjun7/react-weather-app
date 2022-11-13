import React from 'react'
import { formatToLocalTime } from '../services/weatherService';
import { useEffect, useState } from 'react';

function TimeAndLocation({weather: {dt, timezone, name, country}}) { 

    const getCurrentTime = () => {
        return new Date();
    }

    // keeps track of current Time as a hook so we can use it to update the time string
    const [currentTime, setCurrentTime] = useState({q: new Date()});
    const [timeAndLocationString, setTimeAndLocation] = useState("");

    // updates the currentTime every second
    setInterval( () => {
        let newDate = new Date();
        setCurrentTime({q: newDate})
    }, 1000);

    useEffect(() => {
            setTimeAndLocation(`${formatToLocalTime(currentTime.q.getTime()/1000, timezone, "ccc, dd LLL yyyy' | Local time: 'hh:mm:ss a")}`
            );
        
    }, [currentTime]);

  return <div>
        <div className="flex items-center justify-center my-6"  id="timeAndDateContainer">
            <p className="text-white text-xl font-extralight" id="timeAndDate">
                {timeAndLocationString}
            </p>
        </div>

        <div className="flex items-center justify-center my-3">
            <p className="text-white text-3xl font-medium">
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
}

export default TimeAndLocation
