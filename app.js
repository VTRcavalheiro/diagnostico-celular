document.addEventListener("DOMContentLoaded", () => {

  /* ================= VIBRAÇÃO ================= */
  const vibrateBtn = document.getElementById("vibrateBtn");
  const vibrationStatus = document.getElementById("vibrationStatus");

  vibrateBtn.addEventListener("click", () => {
    vibrationStatus.textContent = "Executando teste...";

    if (!("vibrate" in navigator)) {
      vibrationStatus.textContent =
        "Vibração não suportada neste navegador ❌";
      return;
    }

    navigator.vibrate([300, 200, 300]);
    vibrationStatus.textContent =
      "Comando de vibração enviado ✅";
  });

  /* ================= ORIENTAÇÃO ================= */
  const orientationBtn = document.getElementById("orientationBtn");
  const orientationInfo = document.getElementById("orientationInfo");

  orientationBtn.addEventListener("click", () => {

    function handleOrientation(e) {
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
      // iOS
      DeviceOrientationEvent.requestPermission()
        .then(permission => {
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        });
    } else {
      // Android
      window.addEventListener("deviceorientation", handleOrientation);
    }
  });

});
