const themeBtn = document.querySelector('#theme');
const body = document.querySelector('body');
const box = document.querySelector('.box');
const icon = document.querySelector('i');
const toggle = document.querySelector('#toggle');
const input = document.querySelector('input');
const search = document.querySelector('#search');
const cityName = document.querySelector('#city-name');
const weatherDetails = document.querySelector('#weather-details');
const detailBoxes = document.querySelectorAll('.detail');
const img = document.querySelector('img');
const degNum = document.querySelector('#number');
let currentTemp = null;
const minValue = document.querySelector('#min-value');
let minTemp = null;
const maxValue = document.querySelector('#max-value');
let maxTemp = null;
const feelsValue = document.querySelector('#feels-value');
let feelsTemp = null;
const descriptionValue = document.querySelector('#description-value');
let descriptionText = null;
const windValue = document.querySelector('#wind-value');
let windSpeed = null;
const timeValue = document.querySelector('#time-value');
const sunriseValue = document.querySelector('#sunrise-value');
const sunsetValue = document.querySelector('#sunset-value');

// Functions
// Theme toggle
const themeTog = () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');

        detailBoxes.forEach((box) => {
            box.classList.remove('dark-box');
            box.classList.add('light-box');
        });

        img.classList.remove('dark-img');
        img.classList.add('light-img');

        box.classList.remove('dark-box');
        box.classList.add('light-box');

        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');

        detailBoxes.forEach((box) => {
            box.classList.remove('light-box');
            box.classList.add('dark-box');
        });

        img.classList.remove('light-img');
        img.classList.add('dark-img');

        box.classList.remove('light-box');
        box.classList.add('dark-box');

        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

// Fetch
const getWeather = () => {
    const city = input.value.trim();
    const firstLetter = city.charAt(0).toLocaleUpperCase();
    const rest = city.slice(1);

    if (!city) return;

    fetch('/api/weather?city=' + city)
        .then((res) => res.json())
        .then((data) => {
            weatherDetails.classList.add('show');

            if (!data.main) {
                throw new Error('City not found');
            }
            const iconCode = data.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            currentTemp = data.main.temp;
            minTemp = data.main.temp_min;
            maxTemp = data.main.temp_max;
            feelsTemp = data.main.feels_like;
            descriptionText = data.weather[0].description;
            windSpeed = data.wind.speed;
            const timezoneOffset = data.timezone * 1000;
            const sunriseTime = data.sys.sunrise * 1000;
            const sunsetTime = data.sys.sunset * 1000;
            const nowUTC = Date.now();

            const localTime = new Date(nowUTC + timezoneOffset);
            const sunRise = new Date(sunriseTime + timezoneOffset);
            const sunSet = new Date(sunsetTime + timezoneOffset);

            const hoursTime = localTime
                .getUTCHours()
                .toString()
                .padStart(2, '0');
            const minutesTime = localTime
                .getUTCMinutes()
                .toString()
                .padStart(2, '0');
            const hoursRise = sunRise.getUTCHours().toString().padStart(2, '0');
            const minutesRise = sunRise
                .getUTCMinutes()
                .toString()
                .padStart(2, '0');
            const hoursSet = sunSet.getUTCHours().toString().padStart(2, '0');
            const minutesSet = sunSet
                .getUTCMinutes()
                .toString()
                .padStart(2, '0');

            timeValue.textContent = `${hoursTime}:${minutesTime}`;
            sunriseValue.textContent = `${hoursRise}:${minutesRise}`;
            sunsetValue.textContent = `${hoursSet}:${minutesSet}`;
            descriptionValue.textContent =
                descriptionText.charAt(0).toLocaleUpperCase() +
                descriptionText.slice(1);

            if (toggle.textContent === 'F') {
                degNum.textContent = Math.round((currentTemp * 9) / 5 + 32);
                minValue.textContent = Math.round((minTemp * 9) / 5 + 32);
                maxValue.textContent = Math.round((maxTemp * 9) / 5 + 32);
                feelsValue.textContent = Math.round((feelsTemp * 9) / 5 + 32);
                windValue.textContent = `${(data.wind.speed * 2.23694).toFixed(
                    2
                )} m/h`;
            } else {
                degNum.textContent = Math.round(currentTemp);
                minValue.textContent = Math.round(minTemp);
                maxValue.textContent = Math.round(maxTemp);
                feelsValue.textContent = Math.round(feelsTemp);
                windValue.textContent = `${(data.wind.speed * 3.6).toFixed(
                    2
                )} km/h`;
            }
            cityName.textContent = `${firstLetter}${rest}`;
            img.src = iconURL;
            input.value = '';
        })
        .catch((err) => {
            cityName.textContent = 'City not found';
            currentTemp = null;
            weatherDetails.classList.remove('show');
            console.log('Error', err);
            input.value = '';
        });
};

// Degree toggle
const toggleDeg = () => {
    if (!currentTemp) return;

    toggle.classList.add('toggled');
    setTimeout(() => toggle.classList.remove('toggled'), 300);

    if (toggle.textContent === 'C') {
        toggle.textContent = 'F';
        degNum.textContent = Math.round((currentTemp * 9) / 5 + 32);
        minValue.textContent = Math.round((minTemp * 9) / 5 + 32);
        maxValue.textContent = Math.round((maxTemp * 9) / 5 + 32);
        feelsValue.textContent = Math.round((feelsTemp * 9) / 5 + 32);
        windValue.textContent = `${(windSpeed * 2.23694).toFixed(2)} mph`;
    } else {
        toggle.textContent = 'C';
        degNum.textContent = Math.round(currentTemp);
        minValue.textContent = Math.round(minTemp);
        maxValue.textContent = Math.round(maxTemp);
        feelsValue.textContent = Math.round(feelsTemp);
        windValue.textContent = `${(windSpeed * 3.6).toFixed(2)} km/h`;
    }
};

// Event Listeners
themeBtn.addEventListener('click', themeTog);
toggle.addEventListener('click', toggleDeg);
search.addEventListener('click', getWeather);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') getWeather();
});
