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

  function askLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { 
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        
        setQuery({lat, lon});
      })    
      
    }
    console.log('test');  
  };
  
  useEffect(() => {askLocation()}, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.';

      toast.info('Fetching weather for ' + message);
      await getFormattedWeatherData({...query, units}).then(data => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`);
        
        setWeather(data);
        toast.error(`Unsuccessful`);
      });
    };    
    fetchWeather();
  }, [query, units]); // everytime you change the location/query or units, you fetch new data

  const formatBackgroundMetric = () => {
    if (!weather) return 'from-gray-700 to-white-700';
    const thresholdMetric = 20;
    
    if (weather.temp <= thresholdMetric) return 'from-cyan-700 to-blue-700';

    return 'from-yellow-700 to-orange-700';
  }

  const formatBackgroundImperial = () => {
    if (!weather) return 'from-gray-700 to-white-700';
    const thresholdImperial = 60;
    if (weather.temp <= thresholdImperial) return 'from-cyan-700 to-blue-700';

    return 'from-yellow-700 to-orange-700';
  }


  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${units === "metric" ? formatBackgroundMetric() : formatBackgroundImperial()}`}>
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

    <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} /> 

    </div>

    

  );
}


export default App;
