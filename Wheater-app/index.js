const API_KEY = "67e447ae039e91e3a9b2c87f236eb5b1";

const getDate = () => {
  let date = new Date();
  return `${date.getDate()} / ${('0' + (date.getMonth() + 1)).slice(-2)}`;
};
cleanUp = () => {
  let hidden = document.querySelector(".hidden");
  let loader = document.getElementById('loader')

  loader.style.display = 'none';
  hidden.style.display = 'grid';
}

const setData = (data) => {
  console.log(data);

  const weatherData = {
    temperature: data.main.temp.toFixed(0)/* + " °C"*/,
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity+ '%',
    windSpeed: data.wind.speed + ' m/s',
    date: getDate(),
  };

  Object.keys(weatherData).forEach((key) => {
    document.getElementById(key).textContent = weatherData[key];
  });
  cleanUp();
};

const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => setData(data));

  console.log(position);
};

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};
