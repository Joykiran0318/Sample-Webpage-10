let targetDate = null;
let timer = null;
let paused = false;

document.getElementById("startBtn").addEventListener("click", () => {
  const inputVal = document.getElementById("eventDateTime").value;
  if (!inputVal) {
    alert("Please select a date and time for the event.");
    return;
  }
  targetDate = new Date(inputVal).getTime();

  document.getElementById("countdown").classList.remove("hidden");
  document.getElementById("controls").classList.remove("hidden");
  document.getElementById("event-status").classList.add("hidden");

  paused = false;
  if (timer) clearInterval(timer);
  timer = setInterval(updateCountdown, 1000);
  updateCountdown();
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  paused = true;
});

document.getElementById("resumeBtn").addEventListener("click", () => {
  if (targetDate) {
    paused = false;
  }
});

function updateCountdown() {
  if (paused || !targetDate) return;

  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(timer);
    document.getElementById("countdown").classList.add("hidden");
    document.getElementById("event-status").classList.remove("hidden");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  setNumber("days", days);
  setNumber("hours", hours);
  setNumber("minutes", minutes);
  setNumber("seconds", seconds);
}

function setNumber(id, num) {
  const el = document.getElementById(id);
  const formattedNum = String(num).padStart(2, "0");
  if (el.textContent !== formattedNum) {
    el.textContent = formattedNum;
    el.style.animation = "none";
    el.offsetHeight; // trigger reflow
    el.style.animation = null;
  }
}
