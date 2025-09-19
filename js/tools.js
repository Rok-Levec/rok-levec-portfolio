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
