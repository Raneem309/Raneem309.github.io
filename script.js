// Define sections globally
const about = document.getElementById('about');
const projects = document.getElementById('projects');
const contact = document.getElementById('contact');

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
    about.classList.remove('displayNone');
  } else if (tabId === 'projectTab') {
    projects.classList.remove('displayNone');
  } else if (tabId === 'contactTab') {
    contact.classList.remove('displayNone');
  } else if (tabId === 'homeTab') {
    // Home button: Hide all sections and show the center tabs
    sections.forEach(section => {
      section.classList.add('displayNone');
    });
  }
}
