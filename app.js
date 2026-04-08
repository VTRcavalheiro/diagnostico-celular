document.addEventListener("DOMContentLoaded", () => {

  let step = 1;

  const progressBar = document.getElementById("progress-bar");

  function updateProgress() {
    progressBar.style.width = `${(step - 1) * 33}%`;
  }

  function showStep(id) {
    document.querySelectorAll(".card").forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
    updateProgress();
  }

  /* ==================== STEP 1: TOUCH ==================== */

  const grid = document.getElementById("touch-grid");
  const infoTouch = document.getElementById("touch-info");

  const TOTAL = 16;
  let count = 0;

  for (let i = 0; i < TOTAL; i++) {
    const cell = document.createElement("div");
    cell.className = "touch-cell";

    cell.addEventListener("pointerdown", () => {
      if (!cell.classList.contains("done")) {
        cell.classList.add("done");
        count++;
        infoTouch.textContent = `Restantes: ${TOTAL - count}`;

        if (count === TOTAL) {
          step = 2;
          showStep("step-vibration");
        }
      }
    });

    grid.appendChild(cell);
  }

  infoTouch.textContent = `Restantes: ${TOTAL}`;

  /* ==================== STEP 2: VIBRAÇÃO ==================== */

  const btnVibrate = document.getElementById("btn-vibrate");
  const btnConfirm = document.getElementById("btn-confirm-vibration");
  const infoVibration = document.getElementById("vibration-info");

  btnVibrate.addEventListener("click", () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
      infoVibration.textContent = "Se o aparelho vibrou, confirme abaixo.";
      btnConfirm.classList.remove("hidden");
    } else {
      infoVibration.textContent = "Vibração não suportada.";
    }
  });

  btnConfirm.addEventListener("click", () => {
    step = 3;
    showStep("step-orientation");
  });

  /* ==================== STEP 3: ORIENTAÇÃO ==================== */

  const btnOrientation = document.getElementById("btn-orientation");
  const infoOrientation = document.getElementById("orientation-info");

  function handleOrientation(e) {
    infoOrientation.textContent = "✅ Movimento detectado. Teste concluído.";
    step = 4;
    progressBar.style.width = "100%";
    window.removeEventListener("deviceorientation", handleOrientation);
  }

  btnOrientation.addEventListener("click", () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission().then(p => {
        if (p === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }
  });

});
