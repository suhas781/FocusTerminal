let timer;
let timeLeft = 0;

const input = document.getElementById('commandInput');
const output = document.getElementById('output');

const commands = {
  start: () => {
    startTimer(25 * 60, 'WORK');
  },
  break: () => {
    startTimer(5 * 60, 'SHORT BREAK');
  },
  long: () => {
    startTimer(15 * 60, 'LONG BREAK');
  },
  reset: () => {
    clearInterval(timer);
    outputLine('[TIMER RESET] ⏹');
  },
  help: () => {
    outputLine(`Available Commands:
> start       : Start 25-minute work timer
> break       : Start 5-minute short break
> long        : Start 15-minute long break
> reset       : Stop and reset the timer
> help        : Show available commands`);
  }
};

function outputLine(text) {
  output.innerText += `\n${text}`;
  output.scrollTop = output.scrollHeight;
}

function startTimer(seconds, label) {
  clearInterval(timer);
  timeLeft = seconds;
  outputLine(`[${label}] ${formatTime(timeLeft)} ⏳`);

  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      outputLine(`[${label} DONE] ⏰`);
    }
  }, 1000);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = input.value.trim().toLowerCase();
    outputLine(`> ${cmd}`);
    input.value = '';
    if (commands[cmd]) {
      commands[cmd]();
    } else {
      outputLine('[ERROR] Command not found. Type "help"');
    }
  }
});
const typeSound = document.getElementById('typeSound');

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    typeSound.play();
    const cmd = input.value.trim().toLowerCase();
    outputLine(`> ${cmd}`);
    input.value = '';
    if (commands[cmd]) {
      commands[cmd]();
    } else {
      outputLine('[ERROR] Command not found. Type "help"');
    }
  }
});
function incrementSession(label) {
  if (label === 'WORK') {
    const current = parseInt(localStorage.getItem('focusSessions') || '0');
    localStorage.setItem('focusSessions', current + 1);
    outputLine(`[STATS] Sessions Completed: ${current + 1} ✅`);
  }
}
