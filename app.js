document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const startScreen = document.getElementById("start-screen");
  const touchScreen = document.getElementById("touch-fullscreen");
  const grid = document.getElementById("touch-grid");

  const vibrationScreen = document.getElementById("vibration-screen");
  const vibrateBtn = document.getElementById("vibrateBtn");
  const confirmBtn = document.getElementById("confirmVibration");
  const vibrationInfo = document.getElementById("vibration-info");

  /* =============================
     TESTE DE TOUCH (FULLSCREEN)
  ==============================*/
  startBtn.addEventListener("click", iniciarTouchTest);

  function iniciarTouchTest() {
    startScreen.classList.add("hidden");
    touchScreen.classList.remove("hidden");

    const cols = 6;
    const rows = 10;
    const total = cols * rows;
    let concluido = 0;

    grid.innerHTML = "";

    for (let i = 0; i < total; i++) {
      const cell = document.createElement("div");
      cell.className = "touch-cell";

      // USO CORRETO PARA DRAG
      cell.addEventListener("pointerenter", () => {
        if (!cell.classList.contains("done")) {
          cell.classList.add("done");
          concluido++;

          if (concluido === total) {
            finalizarTouchTest();
          }
        }
      });

      grid.appendChild(cell);
    }
  }

  function finalizarTouchTest() {
    setTimeout(() => {
      touchScreen.classList.add("hidden");
      vibrationScreen.classList.remove("hidden");
    }, 300);
  }

  /* =============================
     TESTE DE VIBRAÇÃO
  ==============================*/
  vibrateBtn.addEventListener("click", () => {

    // Vibração DEVE acontecer dentro do clique
    if ("vibrate" in navigator) {
      navigator.vibrate([300, 200, 300]);
      vibrationInfo.textContent =
        "Se o celular vibrou, confirme abaixo.";
      confirmBtn.classList.remove("hidden");
    } else {
      vibrationInfo.textContent =
        "Vibração não suportada neste dispositivo.";
    }
  });

  confirmBtn.addEventListener("click", () => {
    vibrationInfo.textContent =
      "✅ Teste de vibração concluído com sucesso.";
    confirmBtn.disabled = true;
  });

});
``
