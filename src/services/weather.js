const getWeather = async (lat, lng) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation`
  );
  const data = await response.json();
  console.log(data);
  return {
    temp: parseInt(data.hourly.temperature_2m[0] * 1.8 + 32),
    rain: data.hourly.precipitation[0],
  };
};
export { getWeather };
