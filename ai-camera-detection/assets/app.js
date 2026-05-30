const socket = io(`http://${window.location.host}`);
const connectionStatus = document.getElementById("connectionStatus");
const confidenceSlider = document.getElementById("confidenceSlider");
const confidenceValue = document.getElementById("confidenceValue");
const latestDetection = document.getElementById("latestDetection");
const recentDetections = document.getElementById("recentDetections");
const videoFrame = document.getElementById("videoFrame");
const videoPlaceholder = document.getElementById("videoPlaceholder");

const maxDetections = 8;
const detections = [];

function setStatus(text, state) {
  connectionStatus.textContent = text;
  connectionStatus.dataset.state = state;
}

function formatConfidence(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

function renderDetections() {
  recentDetections.innerHTML = "";

  if (detections.length === 0) {
    latestDetection.className = "latest-empty";
    latestDetection.textContent = "No object detected yet";
    return;
  }

  const latest = detections[0];
  latestDetection.className = "latest-card";
  latestDetection.innerHTML = `
    <strong>${latest.content}</strong>
    <span>${formatConfidence(latest.confidence)} confidence</span>
  `;

  for (const detection of detections) {
    const item = document.createElement("li");
    const time = new Date(detection.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    item.innerHTML = `
      <span>${detection.content}</span>
      <small>${formatConfidence(detection.confidence)} · ${time}</small>
    `;
    recentDetections.appendChild(item);
  }
}

function updateConfidence() {
  const value = Number(confidenceSlider.value).toFixed(2);
  confidenceValue.value = value;
  confidenceValue.textContent = value;
  socket.emit("override_th", Number(value));
}

socket.on("connect", () => setStatus("Connected", "connected"));
socket.on("disconnect", () => setStatus("Disconnected", "disconnected"));
socket.on("detection", (message) => {
  detections.unshift(message);
  detections.splice(maxDetections);
  renderDetections();
});

confidenceSlider.addEventListener("input", updateConfidence);
updateConfidence();
renderDetections();

const streamUrl = `http://${window.location.hostname}:4912/embed`;

videoFrame.addEventListener("load", () => {
  videoPlaceholder.hidden = true;
  videoFrame.hidden = false;
});

videoFrame.hidden = true;
setInterval(() => {
  if (videoFrame.hidden) {
    videoFrame.src = streamUrl;
  }
}, 1000);
