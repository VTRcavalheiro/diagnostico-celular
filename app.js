document.addEventListener("DOMContentLoaded", () => {

  /* ===== INFO DISPOSITIVO ===== */
  document.getElementById("deviceInfo").innerHTML = `
    <p>${navigator.userAgent}</p>
    <p>Resolução: ${screen.width} x ${screen.height}</p>
  `;

  /* ===== VIBRAÇÃO ===== */
  const vibrateBtn = document.getElementById("vibrateBtn");
  const vibrationStatus = document.getElementById("vibrationStatus");

  vibrateBtn.addEventListener("click", () => {
    vibrationStatus.textContent = "Executando teste...";

    if (!("vibrate" in navigator)) {
      vibrationStatus.textContent = "Vibração não suportada ❌";
      return;
    }

    navigator.vibrate([300,150,300]);
    vibrationStatus.textContent = "✅ Vibração acionada";
  });

  /* ===== ORIENTAÇÃO ===== */
  const orientationBtn = document.getElementById("orientationBtn");
  const orientationInfo = document.getElementById("orientationInfo");

  orientationBtn.addEventListener("click", () => {

    function handle(e) {
      orientationInfo.innerHTML = `
        <p>Alpha: ${e.alpha}</p>
        <p>Beta: ${e.beta}</p>
        <p>Gamma: ${e.gamma}</p>
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
