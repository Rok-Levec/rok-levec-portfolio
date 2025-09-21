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
