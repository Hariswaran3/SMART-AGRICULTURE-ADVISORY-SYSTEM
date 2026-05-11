// Weather controller - returns mock data structured for real API integration
// Replace mock data with OpenWeatherMap API call using process.env.WEATHER_API_KEY

const weatherData = {
  delhi: { temp: 38, humidity: 45, rainChance: 10, condition: 'Sunny', wind: 12, advice: 'High heat — irrigate crops early morning or evening' },
  mumbai: { temp: 29, humidity: 85, rainChance: 75, condition: 'Rainy', wind: 18, advice: 'Heavy rain expected — ensure proper field drainage' },
  bangalore: { temp: 24, humidity: 65, rainChance: 30, condition: 'Partly Cloudy', wind: 8, advice: 'Mild weather — ideal for transplanting seedlings' },
  chennai: { temp: 33, humidity: 78, rainChance: 40, condition: 'Humid', wind: 14, advice: 'High humidity — watch for fungal diseases in crops' },
  kolkata: { temp: 31, humidity: 80, rainChance: 60, condition: 'Cloudy', wind: 10, advice: 'Monsoon conditions — good for paddy cultivation' },
  pune: { temp: 27, humidity: 60, rainChance: 25, condition: 'Pleasant', wind: 9, advice: 'Good conditions for most vegetable crops' },
  hyderabad: { temp: 35, humidity: 50, rainChance: 15, condition: 'Hot', wind: 11, advice: 'Dry conditions — increase irrigation frequency' },
  jaipur: { temp: 40, humidity: 30, rainChance: 5, condition: 'Very Hot', wind: 15, advice: 'Extreme heat — use mulching to retain soil moisture' },
};

// GET /api/weather/:location
const getWeather = (req, res) => {
  const location = req.params.location.toLowerCase();
  const data = weatherData[location];

  if (!data) {
    // Return generic data for unknown locations
    return res.json({
      location: req.params.location,
      temperature: 28,
      humidity: 60,
      rainChance: 20,
      condition: 'Moderate',
      windSpeed: 10,
      farmingAdvice: 'Check local weather services for accurate forecasts',
      forecast: generateForecast(28),
    });
  }

  res.json({
    location: req.params.location,
    temperature: data.temp,
    humidity: data.humidity,
    rainChance: data.rainChance,
    condition: data.condition,
    windSpeed: data.wind,
    farmingAdvice: data.advice,
    forecast: generateForecast(data.temp),
  });
};

const generateForecast = (baseTemp) =>
  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => ({
    day,
    high: baseTemp + Math.floor(Math.random() * 4) - 2,
    low: baseTemp - 6 + Math.floor(Math.random() * 3),
    condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
  }));

module.exports = { getWeather };
