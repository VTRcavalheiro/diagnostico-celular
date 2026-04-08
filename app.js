let touched = 0;
let total = 60;

const progressBar = document.getElementById("progress-bar");
const grid = document.getElementById("touch-grid");

function setProgress(p) {
  progressBar.style.width = p + "%";
}

/* ========= TOUCH TEST ========= */
function startTouchTest() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("touch-fullscreen").classList.remove("hidden");

  grid.innerHTML = "";
  touched = 0;
  setProgress(0);

  for (let i = 0; i < total; i++) {
    const cell = document.createElement("div");
    cell.className = "touch-cell";

    cell.addEventListener("pointerdown", () => {
      if (!cell.classList.contains("done")) {
        cell.classList.add("done");
        touched++;

        setProgress((touched / total) * 50);

        if (touched === total) {
          document.getElementById("touch-fullscreen").classList.add("hidden");
          document.getElementById("test-vibration").classList.remove("hidden");
        }
      }
    });

    grid.appendChild(cell);
  }
}

/* ========= VIBRATION ========= */
function runVibration() {
  if ("vibrate" in navigator) {
    navigator.vibrate([250, 150, 250]);
    document.getElementById("confirmVibration").classList.remove("hidden");
  } else {
    alert("Vibração não suportada neste dispositivo");
  }
}

function finishVibration() {
  setProgress(100);
  alert("✅ Diagnóstico concluído");
}
``
