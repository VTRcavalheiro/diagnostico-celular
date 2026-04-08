/*
  =============================
  INFORMAÇÕES DO DISPOSITIVO
  =============================
*/
const deviceInfoDiv = document.getElementById("deviceInfo");

const deviceInfo = {
  "User Agent": navigator.userAgent,
  "Plataforma": navigator.platform,
  "Idioma": navigator.language,
  "Resolução": `${screen.width} x ${screen.height}`,
  "Pixel Ratio": window.devicePixelRatio
};

deviceInfoDiv.innerHTML = Object.entries(deviceInfo)
  .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
  .join("");

/*
  =============================
  TESTE DE TOUCH SCREEN
  =============================
*/
const touchArea = document.getElementById("touchArea");
const touchStatus = document.getElementById("touchStatus");

touchArea.addEventListener("touchstart", e => {
  touchStatus.textContent = `Toques detectados: ${e.touches.length}`;
});

touchArea.addEventListener("touchmove", e => {
  touchStatus.textContent = `Movendo dedos: ${e.touches.length}`;
});

touchArea.addEventListener("touchend", () => {
  touchStatus.textContent = "Toque finalizado";
});

/*
  =============================
  STATUS DA BATERIA
  =============================
*/
const batteryInfo = document.getElementById("batteryInfo");

if ("getBattery" in navigator) {
  navigator.getBattery().then(battery => {
    function updateBattery() {
      batteryInfo.innerHTML = `
        <p>Nível: ${Math.round(battery.level * 100)}%</p>
        <p>Carregando: ${battery.charging ? "Sim" : "Não"}</p>
      `;
    }
    updateBattery();
    battery.addEventListener("levelchange", updateBattery);
    battery.addEventListener("chargingchange", updateBattery);
  });
} else {
  batteryInfo.textContent = "API de bateria não suportada neste dispositivo.";
}

/*
  =============================
  TESTE DE VIBRAÇÃO
  =============================
*/
function vibrate() {
  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  } else {
    alert("Vibração não suportada.");
  }
}

/*
  =============================
  TESTE DE ORIENTAÇÃO
  =============================
*/
const orientationInfo = document.getElementById("orientationInfo");

function initOrientation() {
  if (typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function") {

    // iOS
    DeviceMotionEvent.requestPermission()
      .then(permission => {
        if (permission === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      });

  } else {
    // Android
    window.addEventListener("deviceorientation", handleOrientation);
  }
}

function handleOrientation(event) {
  orientationInfo.innerHTML = `
    <p>Alpha: ${event.alpha?.toFixed(2)}</p>
    <p>Beta: ${event.beta?.toFixed(2)}</p>
    <p>Gamma: ${event.gamma?.toFixed(2)}</p>
  `;
}
