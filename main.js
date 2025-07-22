const header = document.querySelector("header");
const menuIcon = document.getElementById("menu-icon");
const navlist = document.querySelector(".navlist");

// Sticky header
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 120);
});

// Mobile nav toggle
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

navlist.querySelectorAll("a").forEach(link => {
  link.onclick = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
  };
});

// ===========================
// CRUD + Image Upload Support
// ===========================

let projects = JSON.parse(localStorage.getItem("projects")) || [];
let editingIndex = null;

function renderProjects() {
  const container = document.getElementById("portfolio-list");
  container.innerHTML = "";

  projects.forEach((project, index) => {
    container.innerHTML += `
      <div class="row">
        <img src="${project.image}" alt="${project.title}">
        <div class="main-row">
          <div class="row-text">
            <h5>${project.title}</h5>
          </div>
          <div class="row-icon">
            <i class="ri-github-fill"></i>
          </div>
        </div>
        <h4>${project.desc}</h4>
        <div style="margin-top: 10px;">
          <button class="btn2" onclick="editProject(${index})">Edit</button>
          <button class="btn2" onclick="deleteProject(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  localStorage.setItem("projects", JSON.stringify(projects));
}

function openAddModal() {
  editingIndex = null;
  document.getElementById("modal-title").innerText = "Add Project";
  document.getElementById("project-title").value = "";
  document.getElementById("project-desc").value = "";
  document.getElementById("project-file").value = "";
  document.getElementById("modal").style.display = "flex";
}

function editProject(index) {
  editingIndex = index;
  const p = projects[index];
  document.getElementById("modal-title").innerText = "Edit Project";
  document.getElementById("project-title").value = p.title;
  document.getElementById("project-desc").value = p.desc;
  document.getElementById("project-file").value = "";
  document.getElementById("modal").style.display = "flex";
}

function deleteProject(index) {
  if (confirm("Are you sure you want to delete this project?")) {
    projects.splice(index, 1);
    renderProjects();
  }
}

function saveProject() {
  const title = document.getElementById("project-title").value.trim();
  const desc = document.getElementById("project-desc").value.trim();
  const fileInput = document.getElementById("project-file");

  if (!title || !desc) {
    alert("Please fill in all required fields.");
    return;
  }

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageBase64 = event.target.result;
      saveProjectData(title, desc, imageBase64);
    };
    reader.readAsDataURL(file);
  } else {
    const existingImage = editingIndex !== null ? projects[editingIndex].image : "";
    saveProjectData(title, desc, existingImage);
  }
}

function saveProjectData(title, desc, image) {
  const newProject = { title, desc, image };

  if (editingIndex === null) {
    projects.push(newProject);
  } else {
    projects[editingIndex] = newProject;
  }

  closeModal();
  renderProjects();
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onload = renderProjects;
