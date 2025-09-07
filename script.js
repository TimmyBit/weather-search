const themeBtn = document.querySelector('#theme');
const body = document.querySelector('body');
const box = document.querySelector('.box');
const icon = document.querySelector('i');
const toggle = document.querySelector('#toggle');
const degNum = document.querySelector('#number');

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

// Degree toggle
const toggleDeg = () => {
    let celsius = Math.round(
        ((Number.parseInt(degNum.textContent) - 32) * 5) / 9
    );
    let fahrenheit = Math.round(
        (Number.parseInt(degNum.textContent) * 9) / 5 + 32
    );

    if (toggle.textContent === 'F') {
        toggle.textContent = 'C';
        degNum.textContent = celsius;
    } else {
        toggle.textContent = 'F';
        degNum.textContent = fahrenheit;
    }
};

// Event Listeners
themeBtn.addEventListener('click', themeTog);
toggle.addEventListener('click', toggleDeg);
