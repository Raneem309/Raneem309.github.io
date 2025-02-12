/* script.js */

/* ---------------- Global Variables ---------------- */
const apiKey = "f2ebd821732c6bbb4ceeb84d71225ca0"; // OpenWeatherMap API key
let bmiStatus;
let healthAppUserName;
let tempUnit = "C"; // "C" for Celsius, "F" for Fahrenheit

// Stopwatch variables
let timer;
let timeInSeconds = 0;
let timerRunning = false;
let lapTimes = [];
let h2Element = document.querySelector('#forecast h2');
let h3Element = document.querySelector('#forecast h3');

/* ---------------- Initialization on Window Load ---------------- */
window.onload = function () {
  cubeTalk();         // Initialize Three.js cube in Home section
  initTabLinks();     // Initialize header tab events
  initAboutSection(); // Initialize About Me sidebar options
  handleOpeningScreen(); // Show and fade out opening screen
};

/* ---------------- Tab Functions ---------------- */
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

function handleTabs(tabId) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => section.classList.add("displayNone"));
  if (tabId === "aboutMeTab") {
    document.getElementById("aboutMeSection").classList.remove("displayNone");
  } else if (tabId === "projectTab") {
    document.getElementById("projectsSection").classList.remove("displayNone");
  } else if (tabId === "contactTab") {
    document.getElementById("contactSection").classList.remove("displayNone");
  } else if (tabId === "homeTab") {
    document.getElementById("homeTabSection").classList.remove("displayNone");
    // Reinitialize cube on Home tab
    cubeTalk();
  }
}

/* ---------------- Opening Screen ---------------- */
function handleOpeningScreen() {
  const openingScreen = document.getElementById("openingScreen");
  const openName = document.getElementById("openName");
  const openTitle = document.getElementById("openTitle");

  // Show the opening screen immediately.
  openingScreen.classList.remove("displayNone");

  // Fade in the name immediately.
  setTimeout(() => { 
    openName.style.opacity = "1"; 
  }, 0);

  // Fade in the title after 1 second.
  setTimeout(() => { 
    openTitle.style.opacity = "1"; 
  }, 1000);

  // Delay the fade-out of the text to 7 seconds (instead of 5).
  setTimeout(() => { 
    openName.style.opacity = "0"; 
    openTitle.style.opacity = "0";
  }, 7000);

  // Delay the start of the container fade-out until 7 seconds.
  setTimeout(() => {
    openingScreen.style.transition = "opacity 6s ease";
    openingScreen.style.opacity = "0";

    // After the 6-second fade-out, hide the container.
    setTimeout(() => { 
      openingScreen.classList.add("displayNone"); 
    }, 6000);
  }, 7000);
}


/* ---------------- About Me Section ---------------- */
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

/* ---------------- Launch Functions for Projects ---------------- */
function launchWeatherApp() {
  // Show Weather App container and hide project grid
  document.getElementById("projectData").classList.add("displayNone");
  document.getElementById("project2Container").classList.remove("displayNone");
  document.getElementById("projectHeader").innerText = "Weather App";

}

function launchTimerApp() {
  // Show Stopwatch container and hide project grid
  document.getElementById("projectData").classList.add("displayNone");
  document.getElementById("project3Container").classList.remove("displayNone");
  document.getElementById("projectHeader").innerText = "Time Control";

}

/* ---------------- Health App (Fit Mindset) Functions ---------------- */
function launchHealthStats() {
  // Show Health App container and hide project grid
  document.getElementById("projectData").classList.add("displayNone");
  document.getElementById("project1Container").classList.remove("displayNone");
  // Show welcome screen and hide input/results sections
  document.getElementById("fitMindsetWelcome").classList.remove("displayNone");
  document.getElementById("mainAppContainer").classList.add("displayNone");
  document.getElementById("resultsContainer").classList.add("displayNone");
  // Hide Submit and Restart buttons initially
  document.getElementById("appSubmitBTN").classList.add("displayNone");
  document.getElementById("appRestartBTN").classList.add("displayNone");

  document.getElementById("projectHeader").innerText = "Fit Mindset";

}

function startFitMindset() {
  // When user clicks start: hide welcome and show input form and submit button
  document.getElementById("fitMindsetWelcome").classList.add("displayNone");
  document.getElementById("mainAppContainer").classList.remove("displayNone");
  document.getElementById("appSubmitBTN").classList.remove("displayNone");
}

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
  
  // Hide the input form and Submit button after submission
  document.getElementById("mainAppContainer").classList.add("displayNone");
  document.getElementById("appSubmitBTN").classList.add("displayNone");
}

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

function displayHealthResults(bmi, bmr, tdee) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.classList.remove("displayNone");
  resultsContainer.innerHTML = `<h3 id="headerResults">Hi ${healthAppUserName}! Here are your calculated health results:</h3>`;
  
  // Create cards container
  const cardContainer = document.createElement("div");
  cardContainer.className = "healthCards";
  
  // Determine color for BMI card based on range
  let bmiColor = "#36A2EB"; // healthy blue
  if (bmi < 18.5) { 
    bmiColor = "#FF6384"; 
  } else if (bmi >= 25) { 
    bmiColor = "#FFCE56"; 
  }
  
  // BMI Card (already showing extra line: bmiStatus)
  const bmiCard = document.createElement("div");
  bmiCard.className = "healthCard";
  bmiCard.style.borderColor = bmiColor;
  bmiCard.innerHTML = `
    <h4>BMI</h4>
    <p>${bmi.toFixed(2)}</p>
    <p>${bmiStatus}</p>
  `;
  
  // Placeholder average values for BMR and TDEE (update these with your real data)
  const avgBmr = 1500;  // example average BMR value in kcal/day
  const avgTdee = 2200; // example average TDEE value in kcal/day
  
  // BMR Card with an extra line for average
  const bmrCard = document.createElement("div");
  bmrCard.className = "healthCard";
  bmrCard.style.borderColor = "#8A2BE2";
  bmrCard.innerHTML = `
    <h4>BMR</h4>
    <p>${Math.round(bmr)} kcal/day</p>
    <p class="avg">Average number of calories a person typically burns while at rest: ${avgBmr} kcal/day</p>
  `;
  
  // TDEE Card with an extra line for average
  const tdeeCard = document.createElement("div");
  tdeeCard.className = "healthCard";
  tdeeCard.style.borderColor = "#3CB371";
  tdeeCard.innerHTML = `
    <h4>TDEE</h4>
    <p>${Math.round(tdee)} kcal/day</p>
    <p class="avg">Average number of calories a person burns with your refrence data: ${avgTdee} kcal/day</p>
  `;
  
  // Append cards to container
  cardContainer.appendChild(bmiCard);
  cardContainer.appendChild(bmrCard);
  cardContainer.appendChild(tdeeCard);
  resultsContainer.appendChild(cardContainer);
  
  // Explanation paragraph
  const explanation = document.createElement("p");
  explanation.id = "definitions"
  explanation.innerHTML = `<strong>Body Mass Index (BMI)</strong>, is a measurement of weight relative to ones height.\n <strong>Basal Metabolic Rate (BMR)</strong>, is the minimum number of calories your body needs to function at a basic level.\n <strong>Total Daily Energy Expenditure (TDEE)</strong>, is your total daily energy expenditure needed to maintain your weight.`;
  resultsContainer.appendChild(explanation);
  
  // Show Restart button after results are displayed
  document.getElementById("appRestartBTN").classList.remove("displayNone");
}


function restartApp() {
  // Reset: hide results, show input form and Submit button, clear inputs
  document.getElementById("resultsContainer").classList.add("displayNone");
  document.getElementById("mainAppContainer").classList.remove("displayNone");
  document.getElementById("appSubmitBTN").classList.remove("displayNone");
  document.getElementById("appRestartBTN").classList.add("displayNone");
  const inputs = document.getElementById("mainAppContainer").querySelectorAll("input, select");
  inputs.forEach((el) => el.value = "");
}

/* ---------------- Weather App Functions ---------------- */
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

function toggleTemperatureUnit() {
  tempUnit = tempUnit === "C" ? "F" : "C";
  if (!document.getElementById("forecast").classList.contains("displayNone")) {
    getWeather();
  }
}

async function getWeather() {
  const inputElement = document.getElementById("location");
  const forecastElement = document.getElementById("forecastContianer");
  const forecastDiv = document.getElementById("forecast");
  const weatherBtn = document.getElementById("weatherBtn");
  const location = inputElement.dataset.apiValue;
  const tempBtn = document.getElementById("toggleTempUnit");
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
      if(h3Element){
        h3Element.innerHTML = location;
      }
      h2Element.classList.remove("displayNone");
      h3Element.classList.remove("displayNone");
    forecastElement.innerHTML = "";
    let forecastHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
      const dayData = data.list[i];
      const dateObj = new Date(dayData.dt * 1000);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
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
    forecastDiv.classList.remove("displayNone");
  } catch (error) {
    console.error("Error retrieving weather data:", error);
    forecastElement.innerText = "Error retrieving weather data.";
    h2Element.classList.add("displayNone");
    h3Element.classList.add("displayNone");
  }

  inputElement.value = "";
  weatherBtn.disabled = true;
  weatherBtn.style.cursor = "";
  weatherBtn.style.backgroundColor = "#003e0700";
 
  if(forecastElement.innerHTML === ""){
    tempBtn.classList.add("displayNone")
  }else{
    tempBtn.classList.remove("displayNone");
  }

  tempFillColor()
}

function tempFillColor(){
  // Get all elements with class "thermometer-fill" inside the #forecastContianer
const thermometerFills = Array.from(document.querySelectorAll('#forecastContianer .thermometer-fill'));

// Iterate over each element
thermometerFills.forEach((el) => {
  // Assume the height is set as a percentage string, e.g. "60%"
  const heightStr = el.style.height; // "60%"
  const heightValue = parseFloat(heightStr); // 60

  // Check the height and set the corresponding background
  if (heightValue > 50 && heightValue < 70) {
    el.style.background = "linear-gradient(to top, white, orange)";
  } else if (heightValue >= 70) {
    el.style.background = "linear-gradient(to top, white, red)";
  } else if (heightValue < 50) {
    el.style.background = "linear-gradient(to top, white, blue)";
  }
});
}

/* ---------------- Stopwatch Functions ---------------- */
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

function startTimer() {
  if (!timerRunning) {
    timerRunning = true;
    timer = setInterval(() => {
      timeInSeconds++;
      updateTimeDisplay();
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  timerRunning = false;
}

function resetTimer() {
  stopTimer();
  timeInSeconds = 0;
  lapTimes = [];
  updateTimeDisplay();
  document.getElementById("lapContainer").innerHTML = "";
  document.getElementById("toggleTimerBtn").innerText = "Start";
  document.getElementById("lapBtn").disabled = true;
  document.getElementById("resetTimerBtn").disabled = true;
  document.getElementById("lapContainer").classList.add("displayNone");
}

function updateTimeDisplay() {
  const display = document.getElementById("timeDisplay");
  const hrs = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(timeInSeconds % 60).padStart(2, '0');
  display.innerText = `${hrs}:${mins}:${secs}`;
}

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
  if(lapContainer.childElementCount === 0){
    lapContainer.classList.add("displayNone");
  }else{
    lapContainer.classList.remove("displayNone");
  }
}

/* ---------------- Three.js Cube in Home Section ---------------- */
function cubeTalk() {
  const container = document.getElementById("cubeContainer");
  container.innerHTML = "";
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, container.clientWidth / container.clientHeight, 0.9, 1000);
  camera.position.z = 2.5;
  
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: "black",
    opacity: 0.5,
    transparent: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.scale.set(2, 2, 2);
  scene.add(cube);
  
  const edges = new THREE.EdgesGeometry(geometry);
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: "grey" });
  const wireframe = new THREE.LineSegments(edges, wireframeMaterial);
  cube.add(wireframe);
  
  
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
function exitApp() {
  document.getElementById("projectHeader").innerText = "Projects";
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
  document.getElementById("toggleTempUnit").classList.add("displayNone");

  
  resetTimer();
  
  const inputs = document.getElementById("mainAppContainer").querySelectorAll("input, select");
  inputs.forEach((el) => el.value = "");
  document.getElementById("mainAppContainer").classList.add("displayNone");
  document.getElementById("resultsContainer").classList.add("displayNone");
  document.getElementById("appRestartBTN").classList.add("displayNone");
  document.getElementById("projectData").classList.remove("displayNone");
}
