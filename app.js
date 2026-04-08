/* ===============================
   INFORMAÇÕES DO DISPOSITIVO
================================*/
const deviceInfo = {
  "User Agent": navigator.userAgent,
  "Plataforma": navigator.platform,
  "Idioma": navigator.language,
  "Resolução": `${screen.width} x ${screen.height}`,
  "Pixel Ratio": window.devicePixelRatio
};

document.getElementById("deviceInfo").innerHTML =
  Object.entries(deviceInfo)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
    .join("");

/* ===============================
   TESTE DE TOUCH SCREEN
================================*/
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

/* ===============================
   STATUS DA BATERIA
================================*/
const batteryInfo = document.getElementById("batteryInfo");

if ("getBattery" in navigator) {
  navigator.getBattery().then(battery => {
    const update = () => {
      batteryInfo.innerHTML = `
        <p>Nível: ${Math.round(battery.level * 100)}%</p>
        <p>Carregando: ${battery.charging ? "Sim" : "Não"}</p>
      `;
    };
    update();
    battery.addEventListener("levelchange", update);
    battery.addEventListener("chargingchange", update);
  });
} else {
  batteryInfo.textContent = "Informações de bateria não suportadas.";
}

/* ===============================
   TESTE DE VIBRAÇÃO (CORRIGIDO)
================================*/
const vibrateBtn = document.getElementById("vibrateBtn");
const vibrationStatus = document.getElementById("vibrationStatus");

vibrateBtn.addEventListener("click", () => {
  if (!("vibrate" in navigator)) {
    vibrationStatus.textContent =
      "Vibração não suportada neste navegador.";
    return;
  }

  const result = navigator.vibrate([300, 150, 300]);

  if (result) {
    vibrationStatus.textContent =
      "Comando de vibração enviado ✅";
  } else {
    vibrationStatus.textContent =
      "API disponível, mas vibração foi ignorada ⚠️";
  }
});

/* ===============================
   TESTE DE ORIENTAÇÃO
================================*/
const orientationBtn = document.getElementById("orientationBtn");
const orientationInfo = document.getElementById("orientationInfo");

orientationBtn.addEventListener("click", () => {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    // iOS
    DeviceMotionEvent.requestPermission().then(permission => {
      if (permission === "granted") {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    });
  } else {
    // Android
    window.addEventListener("deviceorientation", handleOrientation);
  }
});

function handleOrientation(e) {
  orientationInfo.innerHTML = `
    <p>Alpha: ${e.alpha?.toFixed(1)}</p>
    <p>Beta: ${e.beta?.toFixed(1)}</p>
    <p>Gamma: ${e.gamma?.toFixed(1)}</p>
  `;
}
