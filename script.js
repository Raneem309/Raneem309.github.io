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
    openingScreen.style.transition = "opacity 3s ease";
    openingScreen.style.opacity = "0";

    setTimeout(() => {
      openingScreen.classList.add("displayNone");
    }, 3000); // Match fade-out duration
  }, 5000); // Stay solid for 3 seconds before fading out
}

// Function to launch the Health Stats app
function launchHealthStats() {
  appContainer.classList.remove("displayNone");
  projHeader.innerText = "Health Stats App"
  document.getElementById("projectData").classList.add("displayNone"); // Hide the project section

  // Create the form for user inputs
  const formHtml = `
    <div id="mainAppContainer">
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
    </div>
    
  `;
  document.getElementById("healthStatsApp").innerHTML = formHtml;
}



// Function to handle the "Exit" button
function exitApp() {
  projHeader.innerText = "A - Z"
  appContainer.classList.add("displayNone");
  document.getElementById("projectData").classList.remove("displayNone"); // Show project section again
}
