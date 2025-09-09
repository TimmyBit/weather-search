const themeBtn = document.querySelector('#theme');
const body = document.querySelector('body');
const box = document.querySelector('.box');
const icon = document.querySelector('i');
const toggle = document.querySelector('#toggle');
const degNum = document.querySelector('#number');
const input = document.querySelector('input');
const search = document.querySelector('#search');
const text = document.querySelector('#text');
let currentTemp = null;

// Functions
// Theme toggle
const themeTog = () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');

        box.classList.remove('dark-box');
        box.classList.add('light-box');

        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');

        box.classList.remove('light-box');
        box.classList.add('dark-box');

        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

// Fetch
const getWeather = () => {
    const city = input.value.trim();
    if (!city) return;

    fetch('/api/weather?city=' + city)
        .then((res) => res.json())
        .then((data) => {
            if (!data.main) {
                throw new Error('City not found');
            }
            currentTemp = data.main.temp;

            if (toggle.textContent === 'F') {
                degNum.textContent = Math.round((currentTemp * 9) / 5 + 32);
            } else {
                degNum.textContent = Math.round(currentTemp);
            }

            text.textContent = `Weather in ${city}:`;
            input.value = '';
        })
        .catch((err) => {
            text.textContent = 'City not found';
            degNum.textContent = '';
            console.log('Error', err);
            currentTemp = null;
        });
};

// Degree toggle
const toggleDeg = () => {
    if (!currentTemp) return;

    if (toggle.textContent === 'C') {
        toggle.textContent = 'F';
        degNum.textContent = Math.round((currentTemp * 9) / 5 + 32);
    } else {
        toggle.textContent = 'C';
        degNum.textContent = Math.round(currentTemp);
    }
};

// Event Listeners
themeBtn.addEventListener('click', themeTog);
toggle.addEventListener('click', toggleDeg);
search.addEventListener('click', getWeather);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') getWeather();
});
