import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Inputs({setQuery, units, setUnits}) {
  
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') {
      setQuery({q: city})
      clearInput();
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchClick();
  }

  function clearInput() {
    let locationInput = document.getElementById('locationSearch');
    locationInput.value = '';
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({lat, lon});
      })      
    }
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);

    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
        
        <div className="flex flex-row w-3-4 items-center justify-center space-x-4">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input 
              id='locationSearch'
              // value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
              type="text" 
              className="text-xl font-light p-2 w-full shadow-xl  focus:outline-none capitalize placeholder:normal-case"
              placeholder="Search for city" 
              />
            </form>
            <UilSearch size={25} className="text-white cursor-pointer   transition ease-out hover:scale-125" onClick={handleSearchClick} />

            <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick} />
        </div>

        <div className="flex flex-row w-1/4 items-center justify-center">
            <button 
            name="metric" 
            className= {'text-xl text-white font-light transition ease-out  hover:scale-125 ' + (units === "metric" ? "font-bold" : '')}
            onClick={handleUnitsChange}             
            >
              &#176;C
            </button>
            <p className="text-xl text-white mx-1"> | </p>
            <button 
            name="imperial" 
            className= {'text-xl text-white font-light transition ease-out  hover:scale-125 ' + (units === "imperial" ? "font-bold" : '')}
            onClick={handleUnitsChange}         
            >
                &#176;F
            </button>
        </div>
    </div>
  )
}

export default Inputs;