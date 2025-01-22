//Global Variables
const about = document.getElementById("aboutMeTab");
const projects = document.getElementById("projectTab");
const contact = document.getElementById("contactTab");
const projHeader = document.getElementById("projectHeader");
const appContainer = document.getElementById("appContainer");

//////// snake game //////////

const snakeGame = document.getElementById("snakeGame");
const welcomeText = document.getElementById("welcomeText");
const pressEnter = document.getElementById("pressEnter");
const gameMessage = document.getElementById("gameMessage");
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;

const gridSize = 20; // Size of one grid cell
const canvasSize = 400; // Canvas width and height
snakeGame.width = canvasSize;
snakeGame.height = canvasSize;
const ctx = snakeGame.getContext("2d");
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
      <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/raneem309/" target="_blank">linkedin.com/in/raneem309</a></li>
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
  openingScreen.classList.remove("displayNone");

  setTimeout(() => {
    openingScreen.style.transition = "opacity 5s ease";
    openingScreen.style.opacity = "0";

    setTimeout(() => {
      openingScreen.classList.add("displayNone");
    }, 5000);
  }, 4000);
}

// Function to launch the Health Stats app
function launchHealthStats() {
  appContainer.classList.remove("displayNone");
  projHeader.innerText = "Health Stats App";
  document.getElementById("projectData").classList.add("displayNone"); // Hide the project section
}

// Function to handle the "Exit" button
function exitApp() {
  projHeader.innerText = "A - Z";
  appContainer.classList.add("displayNone");
  document.getElementById("projectData").classList.remove("displayNone"); // Show project section again
}

// Function to calculate BMI
// Health Stats Calculation Functions

function calculateHealthStats() {
  // Collect user input
  const name = document.getElementById("nameInput").value;
  const age = parseInt(document.getElementById("ageInput").value);
  const gender = document.getElementById("genderInput").value;
  const height = parseFloat(document.getElementById("heightInput").value);
  const weight = parseInt(document.getElementById("weightInput").value);
  const activityLevel = parseFloat(
    document.getElementById("activityLevelInput").value
  );

  // Validate input
  if (!name || !age || !gender || !height || !weight || !activityLevel) {
    alert("Please fill in all fields.");
    return;
  }

  // Calculate BMI
  const bmi = calcBMI(height, weight);

  // Calculate BMR
  const bmr = calcBMR(height, weight, gender, age);

  // Calculate TDEE
  const tdee = calcTDEE(bmr, activityLevel);

  // Display results
  displayResults(
    name,
    age,
    gender,
    height,
    weight,
    activityLevel,
    bmi,
    bmr,
    tdee
  );
}

function calcBMI(height, weight) {
  return (703 * weight) / (height * 12 * (height * 12)); // Height in feet, weight in lbs
}

function calcBMR(height, weight, gender, age) {
  if (gender === "M" || gender === "Male") {
    return 66 + 6.23 * weight + 12.7 * height - 6.8 * age;
  } else {
    return 655 + 4.35 * weight + 4.7 * height - 4.7 * age;
  }
}

function calcTDEE(bmr, activityLevel) {
  return bmr * activityLevel;
}

// Function to evaluate BMI and output the corresponding category
function evaluateBMI(bmi) {
  if (bmi < 18.5) return "Underweight (below 18.5)";
  else if (bmi >= 18.5 && bmi < 24.9) return "Normal Weight (18.5 - 24.9)";
  else if (bmi >= 25 && bmi < 29.9) return "Overweight (25 - 29.9)";
  else return "Obese (above 29.9)";
}

// Display results
function displayResults(
  name,
  age,
  gender,
  height,
  weight,
  activityLevel,
  bmi,
  bmr,
  tdee
) {
  // Hide the input form and show the result container
  document.getElementById("mainAppContainer").classList.add("displayNone");
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.classList.remove("displayNone");

  // Show the user's results
  const bmiCategory = evaluateBMI(bmi);
  const bulk = tdee + 500;
  const cut = tdee - 500;

  document.getElementById("resultName").innerText = `Name: ${name}`;
  document.getElementById("resultAge").innerText = `Age: ${age}`;
  document.getElementById("resultGender").innerText = `Gender: ${gender}`;
  document.getElementById("resultHeight").innerText = `Height: ${height} feet`;
  document.getElementById("resultWeight").innerText = `Weight: ${weight} lbs`;
  document.getElementById(
    "resultActivityLevel"
  ).innerText = `Activity Level: ${activityLevel}`;
  document.getElementById("resultBMI").innerText = `BMI: ${bmi.toFixed(
    2
  )} - ${bmiCategory}`;
  document.getElementById("resultBMR").innerText = `BMR: ${bmr.toFixed(
    2
  )} calories/day`;
  document.getElementById("resultTDEE").innerText = `TDEE: ${tdee.toFixed(
    2
  )} calories/day`;
  document.getElementById("resultBulk").innerText = `Bulk: ${bulk.toFixed(
    2
  )} calories/day`;
  document.getElementById("resultCut").innerText = `Cut: ${cut.toFixed(
    2
  )} calories/day`;

  // Display more information on TDEE, BMI, and BMR
  document.getElementById("moreInfo").innerHTML = `
    <h3>More Information</h3>
    <p>BMI (Body Mass Index) is a measure of body fat based on your weight and height. Your BMI category is ${bmiCategory}.</p>
    <p>TDEE (Total Daily Energy Expenditure) is the number of calories you burn in a day based on your activity level. For weight maintenance, ${tdee.toFixed(
      2
    )} calories/day is recommended.</p>
    <p>BMR (Basal Metabolic Rate) is the number of calories your body needs to perform basic functions at rest. Your BMR is ${bmr.toFixed(
      2
    )} calories/day.</p>
  `;
}

//////// snake game //////////

function startGame() {
  gameMessage.style.display = "none";
  snakeGame.classList.remove("hidden");
  score = 0;
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  placeFood();
  gameInterval = setInterval(updateGame, 100);
}

function placeFood() {
  food.x = Math.floor(Math.random() * (canvasSize / gridSize));
  food.y = Math.floor(Math.random() * (canvasSize / gridSize));
}

function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvasSize / gridSize ||
    head.y >= canvasSize / gridSize ||
    checkCollision(head)
  ) {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${score}`);
    snakeGame.classList.add("hidden");
    gameMessage.style.display = "block";
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }

  drawGame();
}

function checkCollision(head) {
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  ctx.fillStyle = "green";
  snake.forEach((segment) =>
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize)
  );
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && snakeGame.classList.contains("hidden")) {
    startGame();
  }

  if (event.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (event.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (event.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (event.key === "ArrowRight" && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});
//////// snake game //////////
