// --- 1. Jam & Tanggal Realtime ---
function updateClock() {
    const now = new Date();
    
    // Format Jam:Menit:Detik
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;

    // Format Tanggal
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options);

    // Dynamic Greeting Berdasarkan Waktu
    const currentHour = now.getHours();
    let greetingText = "Good Morning";
    if (currentHour >= 12 && currentHour < 18) {
        greetingText = "Good Afternoon";
    } else if (currentHour >= 18) {
        greetingText = "Good Evening";
    }
    document.getElementById('greeting').childNodes[0].nodeValue = greetingText + ", ";
}
setInterval(updateClock, 1000);
updateClock();

// --- 2. Custom Name (Simpan di LocalStorage) ---
const userNameSpan = document.getElementById('user-name');
const savedName = localStorage.getItem('my_dashboard_name');
if (savedName) userNameSpan.innerText = savedName;

userNameSpan.addEventListener('blur', () => {
    localStorage.setItem('my_dashboard_name', userNameSpan.innerText);
});

// --- 3. Light / Dark Mode ---
const themeToggleBtn = document.getElementById('theme-toggle');
if (localStorage.getItem('my_theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggleBtn.innerText = '☀️ Mode';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggleBtn.innerText = isDark ? '☀️ Mode' : '🌙 Mode';
    localStorage.setItem('my_theme', isDark ? 'dark' : 'light');
});

// --- 4. Focus Timer ---
let timerInterval = null;
let defaultMinutes = 25;
let timeLeft = defaultMinutes * 60;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function setTimer(mins) {
    clearInterval(timerInterval);
    timerInterval = null;
    defaultMinutes = mins;
    timeLeft = mins * 60;
    updateTimerDisplay();
}

document.getElementById('start').addEventListener('click', () => {
    if (timerInterval === null) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("Focus time is over!");
            }
        }, 1000);
    }
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset').addEventListener('click', () => {
    setTimer(defaultMinutes);
});

// --- 5. To-Do List (dengan Edit & Delete) ---
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let tasks = JSON.parse(localStorage.getItem('my_tasks')) || [];

function saveAndRenderTasks() {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
    todoList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function addTask() {
    const text = todoInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        todoInput.value = '';
        saveAndRenderTasks();
    }
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveAndRenderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRenderTasks();
}

saveAndRenderTasks();

// --- 6. Quick Links ---
const linkNameInput = document.getElementById('link-name');
const linkUrlInput = document.getElementById('link-url');
const linksContainer = document.getElementById('links-container');
let quickLinks = JSON.parse(localStorage.getItem('my_links')) || [
    { name: 'Google', url: 'https://google.com' }
];

function saveAndRenderLinks() {
    localStorage.setItem('my_links', JSON.stringify(quickLinks));
    linksContainer.innerHTML = '';

    quickLinks.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.innerText = link.name;
        a.style.marginRight = '10px';
        linksContainer.appendChild(a);
    });
}

function addLink() {
    const name = linkNameInput.value.trim();
    let url = linkUrlInput.value.trim();

    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    if (name && url) {
        quickLinks.push({ name, url });
        linkNameInput.value = '';
        linkUrlInput.value = '';
        saveAndRenderLinks();
    }
}

saveAndRenderLinks();
