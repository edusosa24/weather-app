const openWeather = "ac579d204e6c963d49afeef21a45d4c4";

const Weather = (() => {
  const degreesMetric = document.querySelector(".degrees.metric");
  const degreesImperial = document.querySelector(".degrees.imperial");
  const feelsLikeMetric = document.querySelector(".feels-like.metric");
  const feelsLikeImperial = document.querySelector(".feels-like.imperial");
  const humidity = document.querySelector(".humidity");
  let city;
  let weatherMetric;
  let weatherImperial;


  const setCity = () => {
    city = document
      .getElementById("city")
      .value.toLowerCase()
      .split(" ")
      .join("+");
  };

  const retrieveWeather = async () => {
    try {
      const resultMetric = await fetch(
        `//api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeather}`,
        { mode: 'cors',
          method: 'get' } 
      );

      const resultImperial = await fetch(
        `//api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${openWeather}`,
        { mode: 'cors', 
          method: 'get' } 

      );

      weatherMetric = await resultMetric.json();
      weatherImperial = await resultImperial.json();

      console.log(weatherMetric);
      console.log(weatherImperial);

    } catch (err) {}
  };

  const assignWeatherImg = () => {
    let image = document.querySelector(".weather-img");
    let weatherType = weatherMetric.weather[0].main;
    let now = new Date();
    let dayTime = now.getHours() >= 7 && now.getHours() <= 19 ? "d" : "n";

    if (weatherType === "Clouds") {
      image.src = `//openweathermap.org/img/wn/02${dayTime}@2x.png`;
    } else if (weatherType === "Clear") {
      image.src = `//openweathermap.org/img/wn/01${dayTime}@2x.png`;
    } else if (weatherType === "Atmosphere") {
      image.src = `//openweathermap.org/img/wn/50${dayTime}@2x.png`;
    } else if (weatherType === "Snow") {
      image.src = `//openweathermap.org/img/wn/13${dayTime}@2x.png`;
    } else if (weatherType === "Rain") {
      image.src = `//openweathermap.org/img/wn/10${dayTime}@2x.png`;
    } else if (weatherType === "Drizzle") {
      image.src = `//openweathermap.org/img/wn/09${dayTime}@2x.png`;
    } else if (weatherType === "Thunderstorm") {
      image.src = `//openweathermap.org/img/wn/11${dayTime}@2x.png`;
    }
  };

  const setWeatherValues = async () => {
    try{
      setCity();
      await retrieveWeather();
      assignWeatherImg();

      degreesImperial.textContent = "Temp: " + weatherImperial.main.temp.toFixed(1) + "°F";
      degreesMetric.textContent = "Temp: " + weatherMetric.main.temp.toFixed(1) + "°C";
      feelsLikeImperial.textContent = "Feels like: " + weatherImperial.main.feels_like.toFixed(1) + "°F";
      feelsLikeMetric.textContent = "Feels like: " + weatherMetric.main.feels_like.toFixed(1) + "°C"; 
      humidity.textContent = "Humidity: " + weatherImperial.main.humidity.toFixed(1) + '%';
    }catch(err){
      alert("City not found.");
    }
  };

  return {
    setWeatherValues,
  };
})();

export { Weather };
