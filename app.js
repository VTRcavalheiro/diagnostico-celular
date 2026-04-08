document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONTROLE DE FLUXO
  ================================*/
  function showTest(id) {
    document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  }

  /* ===============================
     TESTE 1 - TOUCH SCREEN
  ================================*/
  const grid = document.getElementById("touchGrid");
  const remainingSpan = document.getElementById("remaining");

  const TOTAL = 16;
  let remaining = TOTAL;
  remainingSpan.textContent = remaining;

  for (let i = 0; i < TOTAL; i++) {
    const cell = document.createElement("div");
    cell.className = "touch-cell";

    cell.addEventListener("pointerdown", () => {
      if (!cell.classList.contains("touched")) {
        cell.classList.add("touched");
        remaining--;
        remainingSpan.textContent = remaining;

        if (remaining === 0) {
          setTimeout(() => {
            showTest("test-vibration");
          }, 500);
        }
      }
    });

    grid.appendChild(cell);
  }

  /* ===============================
     TESTE 2 - VIBRAÇÃO
  ================================*/
  const vibrateBtn = document.getElementById("vibrateBtn");
  const vibrationStatus = document.getElementById("vibrationStatus");

  vibrateBtn.addEventListener("click", () => {
    let vibrou = false;

    if ("vibrate" in navigator) {
      vibrou = navigator.vibrate([200, 100, 200]);
    }

    if (!("vibrate" in navigator)) {
      vibrationStatus.textContent =
        "❌ Vibração não suportada neste dispositivo.";
      return;
    }

    vibrationStatus.textContent = vibrou
      ? "✅ Vibração executada com sucesso."
      : "⚠️ Vibração solicitada, mas ignorada pelo sistema.";

    setTimeout(() => {
      showTest("test-orientation");
    }, 1000);
  });

  /* ===============================
     TESTE 3 - ORIENTAÇÃO
  ================================*/
  const orientationBtn = document.getElementById("orientationBtn");
  const orientationInfo = document.getElementById("orientationInfo");

  orientationBtn.addEventListener("click", () => {

    function handle(e) {
      orientationInfo.innerHTML = `
        <p>Alpha: ${e.alpha?.toFixed(1)}</p>
        <p>Beta: ${e.beta?.toFixed(1)}</p>
        <p>Gamma: ${e.gamma?.toFixed(1)}</p>
        <p>✅ Teste concluído</p>
      `;
    }

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission().then(p => {
        if (p === "granted") {
          window.addEventListener("deviceorientation", handle);
        }
      });
    } else {
      window.addEventListener("deviceorientation", handle);
    }
  });

});
