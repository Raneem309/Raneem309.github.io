document.addEventListener("DOMContentLoaded", function() {
  fillAboutMe();
  fillProjects();
  fillContact();
});

function showTab(tabId) {
  const sections = document.querySelectorAll('.tab-content');
  sections.forEach(section => {
      section.style.display = section.id === tabId ? 'block' : 'none';
  });
}

function fillAboutMe() {
  const aboutText = `
      <strong>Raneem Ali</strong> is a software developer based in Brooklyn, NY, specializing in web technologies. With a solid foundation in languages like JavaScript, HTML, and CSS, Raneem has experience working with cloud platforms like AWS and Azure, and is well-versed in Agile development methodologies. 
      In addition to technical expertise, Raneem is passionate about crafting seamless user interfaces and ensuring high-quality performance through rigorous testing and debugging.
  `;
  document.getElementById("about-me-text").innerHTML = aboutText;
}

function fillProjects() {
  const projects = [
      {
          name: "Web Application Development",
          description: "Developed and maintained scalable web applications using JavaScript, HTML, and CSS. Integrated RESTful APIs and ensured seamless user experiences across different devices and browsers.",
          tools: "JavaScript, HTML, CSS, GitHub"
      },
      {
          name: "Team Management & Optimization",
          description: "Managed database operations and team workflows at The Grooming Lounge, optimizing business performance using tools like Millennium and Meevo systems.",
          tools: "Millennium, Meevo"
      }
  ];

  const projectsList = document.getElementById("projects-list");
  projects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.classList.add('project-item');
      projectItem.innerHTML = `
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <p><strong>Tools Used:</strong> ${project.tools}</p>
      `;
      projectsList.appendChild(projectItem);
  });
}

function fillContact() {
  const email = "Raneem309@gmail.com";
  const phone = "(703) 268-9046";
  
  document.getElementById("email").textContent = email;
  document.getElementById("phone").textContent = phone;
}
