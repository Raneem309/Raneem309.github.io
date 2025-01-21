//Global Variables
const about = document.getElementById("aboutMeTab");
const projects = document.getElementById("projectTab");
const contact = document.getElementById("contactTab");
const projHeader = document.getElementById("projectHeader");
const appContainer = document.getElementById("appContainer");

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
    openingScreen.style.transition = "opacity 6s ease";
    openingScreen.style.opacity = "0";

    setTimeout(() => {
      openingScreen.classList.add("displayNone");
    }, 6000); // Match fade-out duration
  }, 3000); // Stay solid for 3 seconds before fading out
}

// Function to launch the Health Stats app
function launchHealthStats() {
  appContainer.classList.remove("displayNone");
  projHeader.innerText = "Health Stats App"
  document.getElementById("projectData").classList.add("displayNone"); // Hide the project section
}

// Function to handle the "Exit" button
function exitApp() {
  projHeader.innerText = "A - Z"
  appContainer.classList.add("displayNone");
  document.getElementById("projectData").classList.remove("displayNone"); // Show project section again
}

// Function to calculate BMI
function calcBMI(height, weight) {
  return (703 * weight) / ((height * 12) * (height * 12));
}

// Function to calculate BMR
function calcBMR(height, weight, gender, age) {
  let calcBMR;
  if (gender === "Male") {
    calcBMR = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
  } else {
    calcBMR = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
  }
  return calcBMR;
}

// Function to calculate TDEE
function calcTDEE(calcBMR, actLevel) {
  return actLevel * calcBMR;
}

// Function to evaluate BMI
function evaluateBMI(bmi) {
  if (bmi < 18.5) {
    return "Underweight (below 18.5)";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal Weight (between 18.5 - 24.9)";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight (between 25 - 29.9)";
  } else {
    return "Obese (above 29.9)";
  }
}

// Function to handle Health Stats form submission
function calculateHealthStats() {
  const name = document.getElementById("nameInput").value;
  const age = parseInt(document.getElementById("ageInput").value);
  const gender = document.getElementById("genderInput").value;
  const height = parseFloat(document.getElementById("heightInput").value);
  const weight = parseInt(document.getElementById("weightInput").value);
  const actLevel = parseFloat(document.getElementById("activityLevelInput").value);

  const bmi = calcBMI(height, weight);
  const bmr = calcBMR(height, weight, gender, age);
  const tdee = calcTDEE(bmr, actLevel);

  displayHealthStats(name, age, gender, height, weight, actLevel, bmi, bmr, tdee);
}

// Function to display Health Stats
function displayHealthStats(name, age, gender, height, weight, actLevel, bmi, bmr, tdee) {
  let resultMessage = `
    <h3>Health Stats for ${name}</h3>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Height:</strong> ${height} feet</p>
    <p><strong>Weight:</strong> ${weight} lbs</p>
    <p><strong>Activity Level:</strong> ${actLevel}</p>
    <p><strong>BMI:</strong> ${bmi.toFixed(2)} - ${evaluateBMI(bmi)}</p>
    <p><strong>BMR:</strong> ${bmr.toFixed(2)} calories/day</p>
    <p><strong>TDEE:</strong> ${tdee.toFixed(2)} calories/day</p>
  `;
  
  appContainer.innerHTML += resultMessage;
  const bulk = tdee + 500;
  const cut = tdee - 500;
  const moreInfoMessage = `
    <p><strong>To Bulk:</strong> ${bulk.toFixed(2)} calories/day</p>
    <p><strong>To Cut:</strong> ${cut.toFixed(2)} calories/day</p>
  `;
  appContainer.innerHTML += moreInfoMessage;
}
