// --- QUẢN LÝ CÔNG VIỆC ---
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    if (taskInput.value === '') { alert("Bạn chưa nhập nội dung!"); return; }
    let li = document.createElement("li");
    li.innerHTML = `<span>${taskInput.value}</span><button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-trash"></i></button>`;
    taskList.appendChild(li);
    taskInput.value = "";
    saveData();
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveData();
}

function saveData() { localStorage.setItem("myTasks", taskList.innerHTML); }
function showTask() { taskList.innerHTML = localStorage.getItem("myTasks") || ""; }
showTask();

// --- ĐỒNG HỒ POMODORO ---
let timeLeft = 25 * 60;
let timerId = null;
const timerDisplay = document.getElementById("timer");

function updateDisplay() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    timerDisplay.innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
}

function startTimer() {
    if (timerId !== null) return;
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) { clearInterval(timerId); timerId = null; alert("Hết giờ!"); }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId); timerId = null;
    timeLeft = 25 * 60; updateDisplay();
}
updateDisplay();