//Global Variables
const about = document.getElementById('aboutMeTab');
const projects = document.getElementById('projectTab');
const contact = document.getElementById('contactTab');

window.onload = function() {
  tabLinks();
}


function tabLinks() {
  // Adding onclick for each tab
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      handleTabs(this.id);
    });
  });
}

function handleTabs(tabId) {
  // Hide all sections by default
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('displayNone');
  });

  // Show the corresponding section based on tab click
  if (tabId === 'aboutMeTab') {
    aboutMeSection.classList.remove('displayNone');
    mainHeader.classList.add("displayNone");
  } else if (tabId === 'projectTab') {
    projectsSection.classList.remove('displayNone');
    mainHeader.classList.add("displayNone");
  } else if (tabId === 'contactTab') {
    contactSection.classList.remove('displayNone');
    mainHeader.classList.add("displayNone");
  } else if (tabId === 'homeTab') {
    mainHeader.classList.remove("displayNone");
    homeTab.classList.add("displayNone");
    sections.forEach(section => {
      section.classList.add('displayNone');
    });
  }
}
