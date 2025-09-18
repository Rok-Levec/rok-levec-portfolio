document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  let menuOpen = false;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mobileMenu.classList.remove(
          "opacity-0",
          "pointer-events-none",
          "-translate-y-4"
        );
        mobileMenu.classList.add(
          "opacity-100",
          "pointer-events-auto",
          "translate-y-0"
        );
        hamburger.classList.add("rotate-90");
      } else {
        mobileMenu.classList.add(
          "opacity-0",
          "pointer-events-none",
          "-translate-y-4"
        );
        mobileMenu.classList.remove(
          "opacity-100",
          "pointer-events-auto",
          "translate-y-0"
        );
        hamburger.classList.remove("rotate-90");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  let menuOpen = false;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mobileMenu.classList.remove(
          "opacity-0",
          "pointer-events-none",
          "-translate-y-4"
        );
        mobileMenu.classList.add(
          "opacity-100",
          "pointer-events-auto",
          "translate-y-0"
        );
        hamburger.classList.add("rotate-90");
      } else {
        mobileMenu.classList.add(
          "opacity-0",
          "pointer-events-none",
          "-translate-y-4"
        );
        mobileMenu.classList.remove(
          "opacity-100",
          "pointer-events-auto",
          "translate-y-0"
        );
        hamburger.classList.remove("rotate-90");
      }
    });
  }
});

fetch("navbar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("navbar").innerHTML = html;
  });

fetch("footer.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("footer").innerHTML = html;
  });

fetch("data/experience.json")
  .then((response) => response.json())
  .then((experiences) => {
    const container = document.getElementById("experience-list");
    container.innerHTML = experiences
      .map(
        (exp) => `
      <div class="bg-gray-100 rounded-lg p-6 mb-6 shadow">
        <div class="flex justify-between items-center mb-2">
          <span class="font-bold text-lg text-[#05324d]">${exp.company}</span>
          <span class="text-sm text-gray-500">${exp.year}</span>
        </div>
        <div class="mb-2 font-semibold text-gray-800">${exp.title}</div>
        <div class="text-gray-700 text-sm">${exp.description}</div>
      </div>
    `
      )
      .join("");
  });

const toolDescriptions = {
  HTML: "The backbone of every website. I use HTML on most to structure content and ensure accessibility.",
  CSS: "Styling is key! CSS lets me create visually appealing and responsive layouts.",
  JavaScript:
    "I use JS to add interactivity and dynamic features to my projects.",
  Tailwind:
    "Tailwind CSS speeds up my workflow with utility-first classes for rapid UI building. This site is built with it!",
  SQL: "For data storage and management, SQL is my go-to for robust backend solutions.",
  Laravel:
    "I have some experience with Laravel for building scalable PHP applications.",
  React:
    "React helps me experiment with modern frontend development and component-based design.",
};

document.querySelectorAll("#tools-row [data-tool]").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    document.getElementById("tool-description").textContent =
      toolDescriptions[el.dataset.tool];
  });
  el.addEventListener("mouseleave", () => {
    document.getElementById("tool-description").textContent = "";
  });
});

document.querySelectorAll(".project-img").forEach((img) => {
  img.addEventListener("click", function () {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    modalImg.src = this.dataset.img;
    modal.classList.remove("hidden");
  });
});

document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("image-modal").classList.add("hidden");
});

document.getElementById("image-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.classList.add("hidden");
  }
});

// Render projects from JSON
fetch("data/projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const container = document.getElementById("projects-list");
    container.innerHTML = projects
      .map(
        (project) => `
      <div class="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center mb-8 p-6">
        <div class="flex-1 md:mr-8">
          <h3 class="text-xl font-semibold mb-2">${project.name}</h3>
          <p class="mb-4 text-gray-700">${project.description}</p>
          <div class="mb-4 flex flex-wrap gap-2">
            ${project.tools
              .map(
                (tool) =>
                  `<span class="px-2 py-1 bg-[#05324d] text-white rounded text-xs">${tool}</span>`
              )
              .join("")}
          </div>
          <a href="${
            project.link
          }" target="_blank" class="inline-block px-6 py-2 bg-[#05324d] text-white rounded-lg shadow hover:bg-[#07507a] transition border border-[#05324d]">
            Check it out!
          </a>
        </div>
        <div class="flex-shrink-0 mt-6 md:mt-0">
          <img src="${project.image}" alt="${project.name} Preview"
            class="w-48 h-32 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer project-img"
            data-img="${project.image}" />
        </div>
      </div>
    `
      )
      .join("");
  });

// Modal functionality for enlarged project image
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("project-img")) {
      const modal = document.getElementById("image-modal");
      const modalImg = document.getElementById("modal-img");
      modalImg.src = e.target.dataset.img;
      modal.classList.remove("hidden");
    }
    if (
      e.target.id === "close-modal" ||
      (e.target.id === "image-modal" &&
        e.target === document.getElementById("image-modal"))
    ) {
      document.getElementById("image-modal").classList.add("hidden");
    }
  });
});
