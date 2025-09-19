document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-icon");
  const overlay = document.getElementById("mobile-overlay");
  let menuOpen = false;

  document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === path) {
        link.classList.add("font-bold", "underline", "text-[#07507a]");
      } else {
        link.classList.remove("font-bold", "underline", "text-[#07507a]");
      }
    });
  });

  if (hamburger && overlay) {
    hamburger.addEventListener("click", () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        overlay.classList.remove("opacity-0", "pointer-events-none");
        overlay.classList.add("opacity-100", "pointer-events-auto");
        hamburger.classList.add("rotate-90");
      } else {
        overlay.classList.add("opacity-0", "pointer-events-none");
        overlay.classList.remove("opacity-100", "pointer-events-auto");
        hamburger.classList.remove("rotate-90");
      }
    });
    // Optional: Close overlay when clicking outside nav links
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        menuOpen = false;
        overlay.classList.add("opacity-0", "pointer-events-none");
        overlay.classList.remove("opacity-100", "pointer-events-auto");
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
        <div class="text-gray-700">${exp.description}</div>
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
