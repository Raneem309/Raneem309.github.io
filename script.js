/* script.js */

/* ---------------- Global Variables ---------------- */
const apiKey = "f2ebd821732c6bbb4ceeb84d71225ca0"; // OpenWeatherMap API key
let bmiStatus;
let healthAppUserName;
let tempUnit = "C"; // Temperature unit: "C" for Celsius, "F" for Fahrenheit

// Stopwatch variables
let timer;
let timeInSeconds = 0;
let timerRunning = false;
let lapTimes = [];

// Chart variable for health app results
let healthChart;

/* ---------------- Initialization on Window Load ---------------- */
window.onload = function () {
  cubeTalk();         // Initialize Three.js cube in Home section
  initTabLinks();     // Initialize header tab click events and hover effects
  initAboutSection(); // Initialize About Me interactive sidebar
  loadInitialData();  // Load any static data (e.g., contact info)
  handleOpeningScreen(); // Show opening screen and fade out
};

/* ---------------- Load Static Data ---------------- */
function loadInitialData() {
  // Additional static data can be loaded here if needed.
}

/* ---------------- Tab Functions ---------------- */
// Initialize header tab click and hover events
function initTabLinks() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      updateActiveTab(this);
      handleTabs(this.id);
    });
    tab.addEventListener("mouseover", function () {
      this.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    });
    tab.addEventListener("mouseout", function () {
      this.style.backgroundColor = "";
    });
  });
}

// Update active tab indicator: active tab shows a rotating cube icon
function updateActiveTab(activeTab) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    if (tab === activeTab) {
      tab.classList.add("active");
      tab.innerHTML = '<div class="activeCube"></div>';
    } else {
      tab.classList.remove("active");
      tab.innerHTML = tab.getAttribute("data-original");
    }
  });
}

// Show the appropriate section based on the clicked tab
function handleTabs(tabId) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.add("displayNone");
  });
  if (tabId === "aboutMeTab") {
    document.getElementById("aboutMeSection").classList.remove("displayNone");
  } else if (tabId === "projectTab") {
    document.getElementById("projectsSection").classList.remove("displayNone");
  } else if (tabId === "contactTab") {
    document.getElementById("contactSection").classList.remove("displayNone");
  } else if (tabId === "homeTab") {
    document.getElementById("homeTabSection").classList.remove("displayNone");
    // Ensure the Three.js cube is present
    const cubeContainer = document.getElementById("cubeContainer");
    if (cubeContainer.children.length === 0) {
      cubeTalk();
    }
  }
}

/* ---------------- Opening Screen ---------------- */
// Display opening screen text and fade out after a delay
function handleOpeningScreen() {
  const openingScreen = document.getElementById("openingScreen");
  const openName = document.getElementById("openName");
  const openTitle = document.getElementById("openTitle");
  openingScreen.classList.remove("displayNone");
  setTimeout(() => { openName.style.opacity = "1"; }, 0);
  setTimeout(() => { openTitle.style.opacity = "1"; }, 1000);
  setTimeout(() => { openName.style.opacity = "0"; }, 5000);
  setTimeout(() => {
    openingScreen.style.transition = "opacity 6s ease";
    openingScreen.style.opacity = "0";
    setTimeout(() => { openingScreen.classList.add("displayNone"); }, 6000);
  }, 4000);
}

/* ---------------- About Me Section ---------------- */
// Initialize interactive sidebar options in the About Me section
function initAboutSection() {
  const aboutOptions = document.querySelectorAll(".aboutOption");
  aboutOptions.forEach((option) => {
    option.addEventListener("click", function () {
      aboutOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      const tabId = this.getAttribute("data-tab");
      const aboutTabs = document.querySelectorAll(".aboutTab");
      aboutTabs.forEach((tab) => tab.classList.add("displayNone"));
      document.getElementById("about-" + tabId).classList.remove("displayNone");
    });
  });
}

/* ---------------- Health App (Fit Mindset) Functions ---------------- */
// Launch the Health App: show the welcome screen
function launchHealthStats() {
  document.getElementById("projectHeader").innerText = "Fit Mindset";
  document.getElementById("projectData").classList.add("displayNone");
  document.getElementById("project1Container").classList.remove("displayNone");
  document.getElementById("fitMindsetWelcome").classList.remove("displayNone");
}

// Called when the user clicks the “Start” button on the welcome screen
function startFitMindset() {
  document.getElementById("fitMindsetWelcome").classList.add("displayNone");
  document.getElementById("mainAppContainer").classList.remove("displayNone");
}

// Calculate health statistics (BMI, BMR, TDEE)
function calculateHealthStats() {
  const height = parseFloat(document.getElementById("heightInput").value);
  const weight = parseFloat(document.getElementById("weightInput").value);
  const age = parseInt(document.getElementById("ageInput").value);
  const gender = document.getElementById("genderInput").value;
  const activityLevel = parseFloat(document.getElementById("activityLevelInput").value);
  healthAppUserName = document.getElementById("nameInput").value;
  
  if (!height || !weight || !age || !gender || !activityLevel) {
    alert("Please fill in all fields.");
    return;
  }
  
  const bmi = (703 * weight) / (Math.pow(height * 12, 2));
  const bmr = gender === "Male" ?
              66 + (6.23 * weight) + (12.7 * height * 12) - (6.8 * age) :
              655 + (4.35 * weight) + (4.7 * height * 12) - (4.7 * age);
  const tdee = bmr * activityLevel;
  
  evaluateBMI(bmi);
  displayHealthResults(bmi, bmr, tdee);
}

// Determine BMI category
function evaluateBMI(bmi) {
  if (bmi < 18.5) {
    bmiStatus = "Underweight (below 18.5)";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    bmiStatus = "Normal Weight (18.5 - 24.9)";
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiStatus = "Overweight (25 - 29.9)";
  } else {
    bmiStatus = "Obese (above 29.9)";
  }
}

// Display results using Chart.js (doughnut chart)
function displayHealthResults(bmi, bmr, tdee) {
  document.getElementById("mainAppContainer").classList.add("displayNone");
  document.getElementById("resultsContainer").classList.remove("displayNone");
  document.getElementById("appRestartBTN").classList.remove("displayNone");
  document.getElementById("headerResults").innerText =
    `Hi ${healthAppUserName}! Here are your calculated health results.`;
  
  const ctx = document.getElementById("healthChart").getContext("2d");
  const data = {
    labels: ['BMI', 'BMR', 'TDEE'],
    datasets: [{
      data: [parseFloat(bmi.toFixed(2)), Math.round(bmr), Math.round(tdee)],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };
  
  if (healthChart) { healthChart.destroy(); }
  healthChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) { label += ': '; }
              label += context.parsed;
              return label;
            }
          }
        }
      }
    }
  });
  
  document.getElementById("resultsDescription").innerHTML = `
    <p><strong>BMI (Body Mass Index):</strong> A measure of body fat based on height and weight. ${bmiStatus}</p>
    <p><strong>BMR (Basal Metabolic Rate):</strong> The number of calories your body needs at rest.</p>
    <p><strong>TDEE (Total Daily Energy Expenditure):</strong> The number of calories you burn daily including activity level.</p>
    <p>Use this information to plan your caloric intake for weight maintenance, loss, or gain.</p>
  `;
}

/* ---------------- Weather App Functions ---------------- */
// Fetch location suggestions as the user types
async function getLocations() {
  const inputElement = document.getElementById("location");
  const suggestionsElement = document.getElementById("suggestions");
  const weatherBtn = document.getElementById("weatherBtn");
  let query = inputElement.value.trim();
  if (query.length < 3) {
    suggestionsElement.classList.add("displayNone");
    return;
  }
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch location suggestions");
    const data = await response.json();
    suggestionsElement.innerHTML = "";
    let seenLocations = new Set();
    if (data.length === 0) {
      const option = document.createElement("div");
      option.textContent = "No results found";
      option.classList.add("no-results");
      suggestionsElement.appendChild(option);
    } else {
      data.forEach((place) => {
        let city = place.name;
        let country = place.country;
        let state = place.state || "";
        let displayName = country === "US" && state ? `${city}, ${state}, ${country}` : `${city}, ${country}`;
        let apiFormattedName = country === "US" && state ? `${city},${state},${country}` : `${city},${country}`;
        if (!seenLocations.has(displayName)) {
          seenLocations.add(displayName);
          const option = document.createElement("div");
          option.textContent = displayName;
          option.classList.add("suggestions-item");
          option.dataset.apiName = apiFormattedName;
          option.onclick = function () {
            inputElement.value = displayName;
            inputElement.dataset.apiValue = apiFormattedName;
            suggestionsElement.classList.add("displayNone");
            weatherBtn.disabled = false;
            weatherBtn.style.cursor = "pointer";
            weatherBtn.style.backgroundColor = "#003e07";
          };
          suggestionsElement.appendChild(option);
        }
      });
    }
    suggestionsElement.classList.remove("displayNone");
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
  }
}

// Toggle between Celsius and Fahrenheit; refresh forecast if displayed
function toggleTemperatureUnit() {
  tempUnit = tempUnit === "C" ? "F" : "C";
  if (!document.getElementById("forecast").classList.contains("displayNone")) {
    getWeather();
  }
}

// Fetch and display the 5‑day weather forecast
async function getWeather() {
  const inputElement = document.getElementById("location");
  const forecastElement = document.getElementById("forecastContianer");
  const forecastHeader = document.querySelector("#forecast h2");
  const weatherBtn = document.getElementById("weatherBtn");
  const location = inputElement.dataset.apiValue;
  if (!location) {
    alert("Please select a valid location from the suggestions.");
    return;
  }
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${units}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    const data = await response.json();
    forecastHeader.textContent = inputElement.value;
    forecastElement.innerHTML = "";
    let forecastHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
      const dayData = data.list[i];
      const dateObj = new Date(dayData.dt * 1000);
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString(undefined, options);
      let tempC = dayData.main.temp;
      let tempDisplay = tempC;
      if (tempUnit === "F") {
        tempDisplay = (tempC * 9/5) + 32;
      }
      tempDisplay = tempDisplay.toFixed(1);
      const weatherDesc = dayData.weather[0].description;
      const iconCode = dayData.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      const thermometer = `<div class="thermometer">
                              <div class="thermometer-fill" style="height: ${Math.min(Math.max((tempC + 10) * 3, 0), 100)}%;"></div>
                           </div>`;
      forecastHTML += `
        <div class="forecastItem">
          <div class="forecastDate">${formattedDate}</div>
          <img src="${iconUrl}" alt="${weatherDesc}" class="weatherIcon"/>
          <div class="forecastTemp">${tempDisplay}°${tempUnit}</div>
          ${thermometer}
          <div class="forecastDesc">${weatherDesc}</div>
        </div>
      `;
    }
    forecastElement.innerHTML = forecastHTML;
    document.getElementById("forecast").classList.remove("displayNone");
  } catch (error) {
    console.error("Error retrieving weather data:", error);
    forecastElement.innerText = "Error retrieving weather data.";
  }
  inputElement.value = "";
  weatherBtn.disabled = true;
  weatherBtn.style.cursor = "";
  weatherBtn.style.backgroundColor = "#003e0700";
}

/* ---------------- Stopwatch Functions ---------------- */
// Toggle the stopwatch (start/stop)
function toggleTimer() {
  const toggleBtn = document.getElementById("toggleTimerBtn");
  if (!timerRunning) {
    startTimer();
    toggleBtn.innerText = "Stop";
    document.getElementById("lapBtn").disabled = false;
    document.getElementById("resetTimerBtn").disabled = true;
  } else {
    stopTimer();
    toggleBtn.innerText = "Start";
    document.getElementById("lapBtn").disabled = true;
    document.getElementById("resetTimerBtn").disabled = false;
  }
}

// Start the stopwatch timer
function startTimer() {
  if (!timerRunning) {
    timerRunning = true;
    timer = setInterval(() => {
      timeInSeconds++;
      updateTimeDisplay();
    }, 1000);
  }
}

// Stop the stopwatch timer
function stopTimer() {
  clearInterval(timer);
  timerRunning = false;
}

// Reset the stopwatch and clear lap times
function resetTimer() {
  stopTimer();
  timeInSeconds = 0;
  lapTimes = [];
  updateTimeDisplay();
  document.getElementById("lapContainer").innerHTML = "";
  document.getElementById("toggleTimerBtn").innerText = "Start";
  document.getElementById("lapBtn").disabled = true;
  document.getElementById("resetTimerBtn").disabled = true;
}

// Update the displayed time on the stopwatch
function updateTimeDisplay() {
  const display = document.getElementById("timeDisplay");
  const hrs = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(timeInSeconds % 60).padStart(2, '0');
  display.innerText = `${hrs}:${mins}:${secs}`;
}

// Record a lap time and display it
function recordLap() {
  if (!timerRunning) return;
  lapTimes.push(timeInSeconds);
  const lapContainer = document.getElementById("lapContainer");
  const lapItem = document.createElement("div");
  const lapNumber = lapTimes.length;
  const hrs = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(timeInSeconds % 60).padStart(2, '0');
  lapItem.innerText = `Lap ${lapNumber}: ${hrs}:${mins}:${secs}`;
  lapContainer.appendChild(lapItem);
}

/* ---------------- Three.js Cube in Home Section ---------------- */
// Initialize a rotating cube in the Home section
function cubeTalk() {
  const container = document.getElementById("cubeContainer");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, container.clientWidth / container.clientHeight, 0.9, 1000);
  camera.position.z = 2.5;
  
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  light.castShadow = true;
  scene.add(light);
  
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: "black",
    opacity: 0.5,
    transparent: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.scale.set(2, 2, 2);
  scene.add(cube);
  
  const edges = new THREE.EdgesGeometry(geometry);
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: "grey" });
  const wireframe = new THREE.LineSegments(edges, wireframeMaterial);
  cube.add(wireframe);
  
  const floorGeometry = new THREE.PlaneGeometry(5, 5);
  const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.5;
  floor.receiveShadow = true;
  scene.add(floor);
  
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
  
  window.addEventListener("resize", () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });
}

/* ---------------- Exit App Function ---------------- */
// Exit the current app/project, reset states and show the main project grid
function exitApp() {
  document.getElementById("projectHeader").innerText = "A - Z";
  const projectContainers = document.querySelectorAll(".projectContainers");
  projectContainers.forEach((container) => container.classList.add("displayNone"));
  
  const weatherBtn = document.getElementById("weatherBtn");
  weatherBtn.disabled = true;
  weatherBtn.style.cursor = "";
  weatherBtn.style.backgroundColor = "#003e0700";
  document.getElementById("location").value = "";
  const suggestionsElement = document.getElementById("suggestions");
  suggestionsElement.innerHTML = "";
  suggestionsElement.classList.add("displayNone");
  document.getElementById("forecastContianer").innerHTML = "";
  document.getElementById("forecast").classList.add("displayNone");
  
  resetTimer();
  
  const inputs = document.getElementById("mainAppContainer").querySelectorAll("input, select");
  inputs.forEach((el) => el.value = "");
  document.getElementById("mainAppContainer").classList.add("displayNone");
  document.getElementById("resultsContainer").classList.add("displayNone");
  document.getElementById("appRestartBTN").classList.add("displayNone");
  document.getElementById("projectData").classList.remove("displayNone");
}
