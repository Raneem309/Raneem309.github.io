//Global Variables
const about = document.getElementById("aboutMeTab");
const projects = document.getElementById("projectTab");
const contact = document.getElementById("contactTab");
const projHeader = document.getElementById("projectHeader");
const project1Container = document.getElementById("project1Container");
const projectData = document.getElementById("projectData");
let bmiStatus;
let healthAppUserName;
const apiKey = "f2ebd821732c6bbb4ceeb84d71225ca0"; 


let timer;
let time = 0;
let running = false;


window.onload = function () {
  tabLinks();
  loadInitialData();
  handleOpeningScreen();
};



function loadInitialData() {
  let bio = `
Hi, I'm Raneem Ali, a dedicated and detail-oriented software and web developer based in Brooklyn, NY. With a solid foundation in programming languages such as JavaScript, HTML, CSS, Python, and Java, I specialize in creating scalable, responsive, and user-friendly web applications. My passion for problem-solving and innovation drives me to continuously learn and refine my technical expertise.<br><br>

I worked as a Junior Developer at Agility Consultants, where I collaborated with cross-functional teams to develop and maintain high-performance web applications. Leveraging JavaScript, HTML, and CSS, I optimized user experiences by ensuring responsiveness and cross-browser compatibility. I also implemented unit testing, debugging, and deployment strategies, ensuring the reliability and scalability of software solutions.<br><br>

In addition to technical development, I have experience using Agile methodologies and version control systems like GitHub, enabling efficient workflows and collaborative project delivery. My exposure to cloud computing platforms such as AWS during my studies and Azure in the workplace has given me a solid understanding of their capabilities.<br><br>

Prior to my development role, I honed my leadership and organizational skills as a First Line Manager at The Grooming Lounge, where I oversaw team operations, optimized database systems, and implemented streamlined workflows. This experience strengthened my ability to lead teams, train staff, and deliver results under tight deadlines.<br><br>

I earned my degree in Management Information Systems from George Mason University, where I gained hands-on experience with programming languages, cloud computing, and system management. My time there provided me with a strong foundation in software development principles and problem-solving techniques.<br><br>

With a commitment to building clean, functional, and scalable solutions, I am eager to bring my technical expertise and passion for development to a dynamic team. Let's connect and create innovative solutions together!
  `;
  aboutMeBio.innerHTML = bio;

  const contactInfo = `
    <div class="contact-list">
      <li><strong>Phone:</strong> <a href="tel:+17032689046">(703) 268-9046</a></li>
      <li><strong>Email:</strong> <a href="mailto:Raneem309@gmail.com">Raneem309@gmail.com</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/raneem-ali/" target="_blank">linkedin.com/in/raneem-ali</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Raneem309" target="_blank">github.com/Raneem309</a></li>
    </div>
  `;

  document.getElementById("contactInfo").innerHTML = contactInfo;

  let homeText = `Welcome to `;
}

function tabLinks() {
  // Adding onclick for each tab
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      handleTabs(this.id);
    });
  });
}

function handleTabs(tabId) {
  // Hide all sections by default
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.add("displayNone");
  });

  // Show the corresponding section based on tab click
  if (tabId === "aboutMeTab") {
    aboutMeSection.classList.remove("displayNone");
  } else if (tabId === "projectTab") {
    projectsSection.classList.remove("displayNone");
  } else if (tabId === "contactTab") {
    contactSection.classList.remove("displayNone");
  } else if (tabId === "homeTab") {
    sections.forEach((section) => {
      section.classList.add("displayNone");
    });
    homeTabSection.classList.remove("displayNone");
  }
}

function handleOpeningScreen() {
  const openingScreen = document.getElementById("openingScreen");
  const openName = document.getElementById("openName");
  const openTitle = document.getElementById("openTitle");
  openingScreen.classList.remove("displayNone");

  openingScreen.classList.remove("displayNone"); // Show the opening screen

  // Fade in "Raneem Ali" immediately
  setTimeout(() => {
    openName.style.opacity = "1"; // Make 'Raneem Ali' visible
  }, 0); // Immediately after opening screen is visible

  // Fade in "Portfolio" after 1 second
  setTimeout(() => {
    openTitle.style.opacity = "1"; // Make 'Portfolio' visible
  }, 1000); // 1 second delay

  // Fade out "Raneem Ali" after 5 seconds
  setTimeout(() => {
    openName.style.opacity = "0"; // Make 'Raneem Ali' fade out
  }, 5000); // 4 seconds delay

  setTimeout(() => {
    openingScreen.style.transition = "opacity 6s ease";
    openingScreen.style.opacity = "0";

    setTimeout(() => {
      openingScreen.classList.add("displayNone");
    }, 6000);
  }, 4000);
}

// Exit the app
function exitApp() {
  projHeader.innerText = "A - Z";
  let projectContainers = document.getElementsByClassName("projectContainers");
  for (let ele of projectContainers){
    ele.classList.add("displayNone")
}
  document.getElementById("projectData").classList.remove("displayNone"); // Show project section again
}

// Function to launch the Health Stats app
function launchHealthStats() {
  const welcomeScreen = document.getElementById("welcomeScreen");
  welcomeScreen.classList.remove("displayNone");

  const welcomeTitle = document.getElementById("welcomeTitle");
  const welcomeSubtitle = document.getElementById("welcomeSubtitle");

  projectData.classList.add("displayNone");
  document.getElementById("projectHeader").innerText = "Fit Mindset"
  project1Container.classList.remove("displayNone");

  // Fade in the welcome text
  setTimeout(() => (welcomeTitle.style.opacity = "1"), 500);
  setTimeout(() => (welcomeSubtitle.style.opacity = "1"), 1500);

  // Listen for Enter key to start
  document.addEventListener("keydown", function onEnterPress(e) {
    if (e.key === "Enter") {
      document.removeEventListener("keydown", onEnterPress); // Prevent multiple triggers
      document.getElementById("appSubmitBTN").classList.remove("displayNone");
      document.getElementById("mainAppContainer").classList.remove("displayNone");
      document.getElementById("projectHeader").classList.remove("displayNone");
      welcomeScreen.classList.add("displayNone");
    }
  });
}

function calculateHealthStats() {
  const height = parseFloat(document.getElementById("heightInput").value);
  const weight = parseInt(document.getElementById("weightInput").value);
  const age = parseInt(document.getElementById("ageInput").value);
  const gender = document.getElementById("genderInput").value;
  const activityLevel = parseFloat(
    document.getElementById("activityLevelInput").value
  );
  healthAppUserName = document.getElementById("nameInput").value;
  //check if all feilds are filled out
  if (!height || !weight || !age || !gender || !activityLevel) {
    alert("Please fill in all fields.");
    return;
  }

  const bmi = (703 * weight) / (height * 12 * height * 12);
  const bmr =
    gender === "Male"
      ? 66 + 6.23 * weight + 12.7 * height * 12 - 6.8 * age
      : 655 + 4.35 * weight + 4.7 * height * 12 - 4.7 * age;
  const tdee = bmr * activityLevel;
  evaluateBMI(bmi);
  displayResults(bmi, bmr, tdee);
}

// Function to evaluate BMI and output the corresponding category
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

// Display results in a chart
function displayResults(bmi, bmr, tdee) {
  const resultsContainer = document.getElementById("resultsContainer");
  const resultsChart = document.getElementById("resultsChart");
  const explanation = document.getElementById("resultsDescription");
  
  document.getElementById("appRestartBTN").classList.remove("displayNone");

  document.getElementById("mainAppContainer").classList.add("displayNone");
  resultsContainer.classList.remove("displayNone");

  resultsChart.innerHTML = `
    <table class="results-table">
      <thead>
        <tr><th>Metric</th><th>Value</th></tr>
      </thead>
      <tbody>
        <tr><td>BMI</td><td>${bmi.toFixed(2)}</td></tr>
        <tr><td>BMR</td><td>${Math.round(bmr)} kcal/day</td></tr>
        <tr><td>TDEE</td><td>${Math.round(tdee)} kcal/day</td></tr>
      </tbody>
    </table>
  `;

  explanation.innerHTML = `
    <p><strong>BMI (Body Mass Index):</strong> A measure of body fat based on height and weight. ${bmiStatus}</p>
    <p><strong>BMR (Basal Metabolic Rate):</strong> The number of calories your body needs at rest.</p>
    <p><strong>TDEE (Total Daily Energy Expenditure):</strong> The number of calories you burn daily including activity level.</p>
    <p>Use this information to plan your caloric intake for weight maintenance, loss, or gain.</p>
  `;

  document.getElementById("headerResults").innerHTML = `Hi ${healthAppUserName}! \n Here are your calculated health results.`
}


function launchWeatherApp() {
  document.getElementById("projectHeader").innerText = "Weather App"

  document.getElementById("location").value = ""
  projectData.classList.add("displayNone");
  document.getElementById('project2Container').classList.remove('displayNone');
}

function launchTimerApp() {
  resetTimer();
  document.getElementById("projectHeader").innerText = "Time Control"
  projectData.classList.add("displayNone");
  document.getElementById('project3Container').classList.remove('displayNone');
}


function startTimer() {
  if (!running) {
      running = true;
      timer = setInterval(() => {
          time++;
          document.getElementById('timerDisplay').textContent = new Date(time * 1000).toISOString().substr(11, 8);
      }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  stopTimer();
  time = 0;
  document.getElementById('timerDisplay').textContent = "00:00:00";
}

document.addEventListener("DOMContentLoaded", function () {
  // Set up Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3; // Move back slightly for better visibility

  // Create renderer and enable shadows
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.enabled = true; // Enable shadows
  const container = document.getElementById("cubeContainer");
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Add lighting for shadows
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 5);
  light.castShadow = true; // Enable shadow casting
  scene.add(light);

  // Create cube with solid and wireframe material
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: "green",      // Main color
    opacity: 0.2,        // 20% opacity, meaning 80% transparency
    transparent: true    // Enable transparency
});
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: "black" }); // Edge lines

  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true; // Cube casts shadow
  cube.receiveShadow = true; // Cube receives shadow
  cube.scale.set(1.15, 1.15, 1.15); // Scale the cube by 15% (without moving)

  scene.add(cube);

  // Add wireframe edges to show cube dimensions
  const edges = new THREE.EdgesGeometry(geometry);
  const wireframe = new THREE.LineSegments(edges, wireframeMaterial);
  cube.add(wireframe);

  // Create a shadow-receiving floor
  const floorGeometry = new THREE.PlaneGeometry(5, 5);
  const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
  floor.position.y = -1.5; // Move floor 1.5rem below the cube (adjust this as needed)
  floor.receiveShadow = true;
  scene.add(floor);

  // Animation loop
  function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
  }
  animate();

  // Resize handler to update renderer and camera
  window.addEventListener('resize', () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
  });
});





// Function to fetch and display location suggestions
async function getLocations() {
    const inputElement = document.getElementById("location");
    const suggestionsElement = document.getElementById("suggestions");

    if (!inputElement || !suggestionsElement) {
        console.error("Error: Missing input or suggestions element.");
        return;
    }

    let query = inputElement.value.trim();
    if (query.length < 3) return; // Prevent excessive API calls

    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch location suggestions");

        let data = await response.json();

        // Clear previous suggestions
        suggestionsElement.innerHTML = "";

        if (data.length === 0) {
            suggestionsElement.innerHTML = "<li>No results found</li>";
            return;
        }

        data.forEach((place) => {
            let li = document.createElement("li");
            li.textContent = `${place.name}, ${place.country}`;
            li.onclick = () => {
                inputElement.value = li.textContent;
                suggestionsElement.innerHTML = ""; // Hide suggestions after selection
            };
            suggestionsElement.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching location suggestions:", error);
    }
}

// Function to fetch weather data
async function getWeather() {
    const inputElement = document.getElementById("location");
    const forecastElement = document.getElementById("forecast");

    if (!inputElement || !forecastElement) {
        console.error("Error: Missing input or forecast element.");
        return;
    }

    const location = inputElement.value.trim();
    if (!location) {
        alert("Please enter a valid location.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();

        // Extract relevant forecast data (every 8 hours = 3 times per day)
        let forecastHTML = `<h2>${location} 5-Day Forecast</h2>`;
        for (let i = 0; i < data.list.length; i += 8) { // Picks 1 reading per day
            const day = data.list[i];
            const date = new Date(day.dt * 1000).toLocaleDateString();
            const temp = day.main.temp;
            const desc = day.weather[0].description;
            forecastHTML += `<p><strong>${date}:</strong> ${temp}°C - ${desc}</p>`;
        }

        forecastElement.innerHTML = forecastHTML;
    } catch (error) {
        console.error("Error retrieving weather data:", error);
        forecastElement.innerText = "Error retrieving weather data.";
    }
}
