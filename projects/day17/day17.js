const getDate = () => {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  let date = `Today is ${new Date().toLocaleDateString('en-us', options)}`;

  return date;
};

const getWeather = async options => {
  try {
    let defaults = {
      selector: 'app', //any selector you want
      temperature: 'C', //C or F, automatically converts the temperature
      icon: true, // enable/disabe weather icon
      //remember to add apiKey while invoking a function
      //getWeather({apiKey: 'yourApiKey'});
    };

    let settings = Object.assign(defaults, options);

    const app = document.getElementById(settings.selector);
    let res = await fetch('https://ipapi.co/json');
    let ip = await res.json();
    let url = `https://api.weatherbit.io/v2.0/current?key=${settings.apiKey}&lat=${ip.latitude}&lon=${ip.longitude}`;

    let resWeather = await fetch(url);
    let weatherData = await resWeather.json();
    let weather = weatherData.data[0];

    app.innerHTML = `
    <h1>${weather.city_name}, ${ip.country_name}</h1>
    <h3>${getDate()}</h3>
    <p id="temperature">${
      settings.temperature === 'C' ? weather.temp : weather.temp * 1.8 + 32
    }\u00B0${settings.temperature}</p>
    <span id="feels">Feels like: ${
      settings.temperature === 'C' ? weather.temp : weather.temp * 1.8 + 32
    }\u00B0${settings.temperature}</span>
    <div class="more-info">
      <img id="weather-icon" src=${`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}/>
      <div class="info">
        <p class="info-desc">Clouds</p>
        <p>${weather.clouds}%</p>
      </div>
      
      <div class="info">
        <p class="info-desc">Wind</p>
        <p>${Math.floor(weather.wind_spd)} m/s</p>
      </div>
      
      <div class="info">
        <p class="info-desc">Humidity</p>
        <p>${Math.floor(weather.rh)}%</p>
      </div>
      
    </div>
    `;

    if (!settings.icon) {
      document.getElementById('weather-icon').classList.add('hidden');
    }
  } catch (err) {
    console.log(err);
    app.innerHTML = `<h1>Something went wrong, please refresh the page or turn off ad blockers (they block API fetching). If still not working, please contact me.</h1>`;
  }
};

getWeather({ apiKey: '5b162d66a98e4562adb129d87cd0555b' });
