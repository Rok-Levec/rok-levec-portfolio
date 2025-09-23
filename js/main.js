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
