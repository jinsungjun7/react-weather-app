import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({q: "London"});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('from-gray-700 to-white-700');

  function askLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { 
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          setQuery({lat, lon});
      })    
    }
  };
  
  useEffect(() => {askLocation()}, []);

  useEffect(() => {
    const fetchWeather = async () => {
      let message = "";
      if (query.q) {
        message = query.q.charAt(0).toUpperCase() + query.q.slice(1);
      } else {
        message = 'current location.';
      }
      toast.info('Fetching weather for ' + message);
      await getFormattedWeatherData({...query, units}).then(data => {
        let locationName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        toast.success(`Successfully fetched weather for ${locationName}, ${data.country}`);
        setWeather(data);
      });     
    };    
    fetchWeather();    
  }, [query, units]); // everytime you change the location/query or units, you fetch new data


  useEffect(() => {
    setBackgroundColor(formatBackground);
  }, [weather]);

  const formatBackground = () => {
    if (!weather) return 'from-gray-700 to-white-700';
    const threshold = units === "metric" ? 20 : 60;
    
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700';

    return 'from-yellow-700 to-orange-700';
  }

  function getBackgroundColor() {
    return backgroundColor;
  }


  return (
    // <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${units === "metric" ? formatBackgroundMetric() : formatBackgroundImperial()}`}>
    // <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 from-gray-700 to-white-700 ${((getUnits() === "metric" && getWeather() >= 20) || (getUnits() === "imperial" && getWeather() >= 60)) ? 'from-yellow-700 to-orange-700' : 'from-cyan-700 to-blue-700'}`}>
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${getBackgroundColor()}`}>

      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} units={units}/>

          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </div>
      )}

    <ToastContainer autoClose={1000} theme='colored' newestOnTop={true} /> 

    </div>

    

  );
}


export default App;
