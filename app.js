document.addEventListener("DOMContentLoaded", () => {

  const progressBar = document.getElementById("progress-bar");
  const touchScreen = document.getElementById("touch-fullscreen");
  const grid = document.getElementById("touch-grid");

  let step = 0;

  function setProgress(p) {
    progressBar.style.width = p + "%";
  }

  /* ===== TOUCH FULLSCREEN ===== */
  document.getElementById("startTouchTest").addEventListener("click", () => {
    touchScreen.classList.remove("hidden");
    setProgress(0);

    const cols = 6;
    const rows = 10;
    const total = cols * rows;
    let touched = 0;

    grid.innerHTML = "";

    for (let i = 0; i < total; i++) {
      const cell = document.createElement("div");
      cell.className = "touch-cell";

      cell.addEventListener("pointerdown", () => {
        if (!cell.classList.contains("done")) {
          cell.classList.add("done");
          touched++;

          if (touched === total) {
            touchScreen.classList.add("hidden");
            step = 1;
            setProgress(50);
            document.getElementById("test-vibration").classList.remove("hidden");
          }
        }
      });

      grid.appendChild(cell);
    }
  });

  /* ===== VIBRAÇÃO ===== */
  const btnVibrate = document.getElementById("btn-vibrate");
  const btnConfirm = document.getElementById("btn-confirm-vibration");
  const info = document.getElementById("vibration-info");

  btnVibrate.addEventListener("click", () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([200,100,200]);
      info.textContent = "Se o aparelho vibrou, confirme abaixo.";
      btnConfirm.classList.remove("hidden");
    } else {
      info.textContent = "Vibração não suportada.";
    }
  });

  btnConfirm.addEventListener("click", () => {
    setProgress(100);
    info.textContent = "✅ Teste de vibração concluído.";
  });

});
