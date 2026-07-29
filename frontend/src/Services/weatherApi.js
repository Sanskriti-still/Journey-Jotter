import axios from "axios";

const WEATHER_API_KEY = "11869a5cdc0e0d6c01794b29e4d08fbe";

export async function getWeather(city) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

   return {
  temperature: response.data.main.temp,
  description: response.data.weather[0].description,
  humidity: response.data.main.humidity,
  wind: response.data.wind.speed,
  icon: response.data.weather[0].icon,
  lat: response.data.coord.lat,
  lon: response.data.coord.lon,
};
  } catch (error) {
    console.log("Weather Error:", error);
    return null;
  }
}