document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const startScreen = document.getElementById("start-screen");
  const touchScreen = document.getElementById("touch-fullscreen");
  const grid = document.getElementById("touch-grid");

  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    touchScreen.classList.remove("hidden");
    iniciarTouch();
  });

  function iniciarTouch() {
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
            alert("✅ Teste de Touch concluído!");
            touchScreen.classList.add("hidden");
          }
        }
      });

      grid.appendChild(cell);
    }
  }

});
