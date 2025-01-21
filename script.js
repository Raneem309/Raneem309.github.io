//Global Variables
const about = document.getElementById("aboutMeTab");
const projects = document.getElementById("projectTab");
const contact = document.getElementById("contactTab");

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
    mainHeader.classList.remove("displayNone");
    sections.forEach((section) => {
      section.classList.add("displayNone");
    });
  }
}

function handleOpeningScreen() {
  const openingScreen = document.getElementById("openingScreen");
  openingScreen.classList.remove("displayNone");

  setTimeout(() => {
    openingScreen.style.transition = "opacity 3s ease";
    openingScreen.style.opacity = "0";

    setTimeout(() => {
      openingScreen.classList.add("displayNone");
    }, 3000); // Match fade-out duration
  }, 5000); // Stay solid for 3 second before fading out
}

// Function to launch the Health Stats app
function launchHealthStats() {
  const appContainer = document.getElementById("appContainer");
  appContainer.classList.remove("displayNone");
  document.getElementById("projectsSection").classList.add("displayNone");

  // Create the form for user inputs
  const formHtml = `
    <h3>Enter Your Information</h3>
    <label for="nameInput">First and Last Initial: </label>
    <input type="text" id="nameInput" /><br><br>

    <label for="ageInput">Age: </label>
    <input type="number" id="ageInput" /><br><br>

    <label for="genderInput">Gender (M/F): </label>
    <input type="text" id="genderInput" /><br><br>

    <label for="heightInput">Height (in feet, e.g., 5.9): </label>
    <input type="number" step="0.1" id="heightInput" /><br><br>

    <label for="weightInput">Weight (in lbs): </label>
    <input type="number" id="weightInput" /><br><br>

    <label for="activityLevelInput">Activity Level: </label>
    <select id="activityLevelInput">
      <option value="1.2">Sedentary (0-1 days)</option>
      <option value="1.4">Light (1-3 days)</option>
      <option value="1.6">Moderate (3-5 days)</option>
      <option value="1.7">Very Active (6-7 days)</option>
      <option value="1.9">Extremely Active (2x/day)</option>
    </select><br><br>

    <button type="button" onclick="calculateHealthStats()">Submit</button>
  `;

  document.getElementById("healthStatsApp").innerHTML = formHtml;
}

// Function to calculate health stats
function calculateHealthStats() {
  const name = document.getElementById("nameInput").value;
  const age = parseInt(document.getElementById("ageInput").value);
  const gender = document.getElementById("genderInput").value;
  const height = parseFloat(document.getElementById("heightInput").value);
  const weight = parseInt(document.getElementById("weightInput").value);
  const activityLevel = parseFloat(
    document.getElementById("activityLevelInput").value
  );

  // Call the functions to calculate stats
  const bmi = calcBMI(height, weight);
  const bmr = calcBMR(height, weight, gender, age);
  const tdee = calcTDEE(bmr, activityLevel);

  // Display results
  const resultHtml = `
    <h3>Health Stats Summary</h3>
    <p>Name: ${name}</p>
    <p>Age: ${age}</p>
    <p>Height: ${height} ft</p>
    <p>Weight: ${weight} lbs</p>
    <p>BMI: ${bmi.toFixed(2)} (${evaluateBMI(bmi)})</p>
    <p>BMR: ${bmr.toFixed(2)} calories/day</p>
    <p>TDEE: ${tdee.toFixed(2)} calories/day</p>
  `;

  document.getElementById("healthStatsApp").innerHTML = resultHtml;
}

// Functions for BMI, BMR, and TDEE calculations
function calcBMI(height, weight) {
  return (703 * weight) / (height * 12 * (height * 12)); // height in feet, weight in lbs
}

function calcBMR(height, weight, gender, age) {
  if (gender.toLowerCase() === "male") {
    return 66 + 6.23 * weight + 12.7 * height - 6.8 * age;
  } else {
    return 655 + 4.35 * weight + 4.7 * height - 4.7 * age;
  }
}

function calcTDEE(bmr, activityLevel) {
  return bmr * activityLevel;
}

function evaluateBMI(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 24.9) return "Normal Weight";
  if (bmi >= 25 && bmi < 29.9) return "Overweight";
  return "Obese";
}

// Function to handle the "Exit" button
function exitApp() {
  document.getElementById("appContainer").classList.add("displayNone");
  document.getElementById("projectsSection").classList.remove("displayNone");
}
