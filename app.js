document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const startScreen = document.getElementById("start-screen");
  const touchScreen = document.getElementById("touch-fullscreen");
  const grid = document.getElementById("touch-grid");

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

      // ✅ USAR POINTERENTER (ESSA É A CHAVE)
      cell.addEventListener("pointerenter", () => {
        if (!cell.classList.contains("done")) {
          cell.classList.add("done");
          concluido++;

          if (concluido === total) {
            finalizarTeste();
          }
        }
      });

      grid.appendChild(cell);
    }
  }

  function finalizarTeste() {
    setTimeout(() => {
      alert("✅ Teste de Touch concluído com sucesso");
      touchScreen.classList.add("hidden");
    }, 300);
  }

});
