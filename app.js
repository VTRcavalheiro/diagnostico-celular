document.addEventListener("DOMContentLoaded", () => {

  /* ===== PROGRESSO ===== */
  const progressBar = document.getElementById("progressBar");
  function setProgress(percent) {
    progressBar.style.width = percent + "%";
  }

  /* =============================
     TESTE 1 — TOUCH
  ==============================*/
  const grid = document.getElementById("touchGrid");
  const touchInfo = document.getElementById("touchInfo");

  let totalCells = 16;
  let touchedCells = 0;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "touch-cell";

    cell.addEventListener("pointerdown", () => {
      if (!cell.classList.contains("done")) {
        cell.classList.add("done");
        touchedCells++;
        touchInfo.textContent =
          `Restantes: ${totalCells - touchedCells}`;

        if (touchedCells === totalCells) {
          setProgress(33);
          setTimeout(() => {
            document.getElementById("test-touch").classList.add("hidden");
            document.getElementById("test-vibration").classList.remove("hidden");
          }, 500);
        }
      }
    });

    grid.appendChild(cell);
  }

  touchInfo.textContent = `Restantes: ${totalCells}`;

  /* =============================
     TESTE 2 — VIBRAÇÃO
  ==============================*/
  const vibrateBtn = document.getElementById("vibrateBtn");
  const confirmVibration = document.getElementById("confirmVibration");
  const vibrationInfo = document.getElementById("vibrationInfo");

  vibrateBtn.addEventListener("click", () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
      vibrationInfo.textContent =
        "Se o aparelho vibrou, confirme abaixo.";
      confirmVibration.classList.remove("hidden");
    } else {
      vibrationInfo.textContent =
        "Vibração não suportada neste dispositivo.";
    }
  });

  confirmVibration.addEventListener("click", () => {
    setProgress(66);
    document.getElementById("test-vibration").classList.add("hidden");
    document.getElementById("test-orientation").classList.remove("hidden");
  });

  /* =============================
     TESTE 3 — ORIENTAÇÃO
  ==============================*/
  const orientationBtn = document.getElementById("orientationBtn");
  const orientationInfo = document.getElementById("orientationInfo");

  function handleOrientation(e) {
    if (e.beta !== null || e.gamma !== null) {
      orientationInfo.textContent =
        "✅ Orientação detectada. Teste concluído.";
      setProgress(100);
      window.removeEventListener("deviceorientation", handleOrientation);
    }
  }

  orientationBtn.addEventListener("click", () => {
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
``
