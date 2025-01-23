//Global Variables
const about = document.getElementById("aboutMeTab");
const projects = document.getElementById("projectTab");
const contact = document.getElementById("contactTab");
const projHeader = document.getElementById("projectHeader");
const appContainer = document.getElementById("appContainer");
let bmiStatus;

//////// snake game //////////

//////// snake game //////////

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
    mainHeader.classList.remove("displayNone");
    sections.forEach((section) => {
      section.classList.add("displayNone");
    });
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
  appContainer.classList.add("displayNone");
  document.getElementById("projectData").classList.remove("displayNone"); // Show project section again
}

// Function to launch the Health Stats app
function launchHealthStats() {
  const projectData = document.getElementById("projectData");
  const welcomeScreen = document.getElementById("welcomeScreen");
  welcomeScreen.classList.remove("displayNone");

  const welcomeTitle = document.getElementById("welcomeTitle");
  const welcomeSubtitle = document.getElementById("welcomeSubtitle");

  projectData.classList.add("displayNone");
  appContainer.classList.remove("displayNone");

  // Fade in the welcome text
  setTimeout(() => (welcomeTitle.style.opacity = "1"), 500);
  setTimeout(() => (welcomeSubtitle.style.opacity = "1"), 1500);

  // Listen for Enter key to start
  document.addEventListener("keydown", function onEnterPress(e) {
    if (e.key === "Enter") {
      document.removeEventListener("keydown", onEnterPress); // Prevent multiple triggers
      document.getElementById("appSubmitBTN").classList.remove("displayNone");
      document.getElementById("mainAppContainer").classList.remove("displayNone");
      welcomeScreen.classList.add("displayNone");
      showCalculatorScreen();
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
}

// Show the calculator screen
function showCalculatorScreen() {
  const project1 = document.getElementById("project1");
  project1.innerHTML = `
    <h1>FIT MINDSET</h1>
    <h2>a BMI, BMR, and TDEE Calculator</h2>
    <div id="mainAppContainer">
      <label for="nameInput">First and Last Initial: </label>
      <input type="text" id="nameInput" />
      <label for="ageInput">Age: </label>
      <input type="number" id="ageInput" />
      <label for="genderInput">Sex (Male/Female): </label>
      <input type="text" id="genderInput" />
      <label for="heightInput">Height (in feet, e.g., 5.9): </label>
      <input type="number" step="0.1" id="heightInput" />
      <label for="weightInput">Weight (in lbs): </label>
      <input type="number" id="weightInput" />
      <label for="activityLevelInput">Activity Level: </label>
      <select id="activityLevelInput">
        <option value="1.2">Sedentary (0-1 days)</option>
        <option value="1.4">Light (1-3 days)</option>
        <option value="1.6">Moderate (3-5 days)</option>
        <option value="1.7">Very Active (6-7 days)</option>
        <option value="1.9">Extremely Active (2x/day)</option>
      </select>
      <button id="submitButton" onclick="calculateHealthStats()">Submit</button>
      <button id="exitButton" onclick="exitApp()">Exit</button>
    </div>
    <div id="resultsContainer" class="displayNone">
      <h3>Your Health Stats</h3>
      <div id="chartContainer"></div>
      <p id="resultsExplanation"></p>
      <button id="restartButton" onclick="launchHealthStats()">Restart</button>
    </div>
  `;
}
