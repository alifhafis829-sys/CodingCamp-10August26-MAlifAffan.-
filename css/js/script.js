// Clock & Greeting
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString();
    document.getElementById('date').innerText = now.toDateString();
}
setInterval(updateClock, 1000);

// Timer
let timeLeft = 1500;
let timerId;
function setTimer(m) { timeLeft = m * 60; document.getElementById('timer').innerText = m + ":00"; }
document.getElementById('start').onclick = () => {
    timerId = setInterval(() => { timeLeft--; document.getElementById('timer').innerText = Math.floor(timeLeft/60) + ":" + (timeLeft%60); }, 1000);
};
document.getElementById('stop').onclick = () => clearInterval(timerId);

// Tasks
function addTask() {
    const input = document.getElementById('todo-input');
    const li = document.createElement('li');
    li.innerHTML = `${input.value} <button onclick="this.parentElement.remove()">Delete</button>`;
    document.getElementById('todo-list').appendChild(li);
    input.value = '';
}

// Theme
document.getElementById('theme-toggle').onclick = () => document.body.classList.toggle('dark');
