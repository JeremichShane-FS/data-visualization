const form = document.querySelector("form"),
  minInput = document.getElementById("min"),
  maxInput = document.getElementById("max"),
  showGraphBtn = document.getElementById("showGraphBtn"),
  average = document.getElementById("average"),
  canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

showGraphBtn.addEventListener("click", createChart);

function createChart(e) {
  e.preventDefault();
  clearGraph();
  average.textContent = "";

  canvas.width = 600;
  canvas.height = 400;

  ctx.fillStyle = "#fff";
  ctx.fillRect(25, 25, 550, 350);

  if (minInput.checkValidity() && maxInput.checkValidity()) {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    let sum = 0;

    if (min > max) {
      alert("The minimum number must be less than the maximum number.");
    } else {
      ctx.fillStyle = "black";
      ctx.fillText("Temperatures (°F)", 250, 20);

      for (let i = 0; i < 5; i++) {
        const temperature = Math.floor(Math.random() * (max - min + 1)) + min;
        const color = getBarColor(temperature);
        const x = 50 + i * 100;
        const y = 380 - temperature * 2.8;
        const width = 50;
        const height = temperature * 2.8;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = "black";
        ctx.fillText(`${temperature}°F`, x + 15, y - 10);

        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        ctx.fillText(days[i], x, 390);

        sum += temperature;
        average.textContent = `Average: ${sum / 5}°F`;
      }
    }
  } else {
    minInput.reportValidity();
    maxInput.reportValidity();
  }
}

function clearGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getBarColor(temperature) {
  if (temperature < 32) {
    return "blue";
  } else if (temperature < 50) {
    return "lightblue";
  } else if (temperature < 70) {
    return "green";
  } else if (temperature < 90) {
    return "yellow";
  } else {
    return "red";
  }
}
