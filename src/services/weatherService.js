import {DateTime} from "luxon";

const API_KEY = '1fa9ff4126d95b8db54f3897a208e91c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((response) => response.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: {lat, lon},
    main: {temp, feels_like, temp_min, temp_max, humidity},
    name,
    dt, // UTC timestamp of that location
    sys: {country, sunrise, sunset},
    weather,
    wind: {speed},
  } = data;

  const {description, icon} = weather[0];

  return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, description, icon, speed};
}

const formatForecastWeather = (data) => {
  let {timezone, daily, hourly} = data;
  // daily[0] will give you today's which we already have
  daily = daily.slice(1,6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon
    }
  });

  hourly = hourly.slice(1,6).map(h => {
    return {
      title: formatToLocalTime(h.dt, timezone, "hh:mm a"),
      temp: h.temp,
      icon: h.weather[0].icon
    }
  });

  return {timezone, daily, hourly};

}


const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

  const {lat, lon} = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData('onecall', {lat, lon, exclude: 'current,minutely,alerts', units: searchParams.units
  }).then(formatForecastWeather);

  return {...formattedCurrentWeather, ...formattedForecastWeather};
}

const formatToLocalTime = (secs, zone, format = "ccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};
