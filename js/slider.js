fetch("data/projects.json")
  .then((res) => res.json())
  .then((projects) => {
    const slider = document.getElementById("projects-slider");
    const controls = document.getElementById("slider-controls");
    if (!slider) return;

    let current = 0;
    let visibleCount = getVisibleCount();
    let animating = false;

    function getVisibleCount() {
      const w = window.innerWidth;
      if (w < 768) return 1;
      return 2;
    }

    function updateVisibleCount() {
      visibleCount = getVisibleCount();
      if (current > projects.length - visibleCount) {
        current = Math.max(0, projects.length - visibleCount);
      }
      showSlides(current);
    }

    window.addEventListener("resize", updateVisibleCount);

    function showSlides(idx, direction = 0) {
      if (idx < 0) idx = 0;
      if (idx > projects.length - visibleCount)
        idx = projects.length - visibleCount;

      // Animate slide
      if (direction !== 0) {
        animating = true;
        const slideOutClass =
          direction > 0 ? "animate-slide-left" : "animate-slide-right";
        const slideDiv = slider.querySelector(".slider-row");
        if (slideDiv) {
          slideDiv.classList.add(slideOutClass);
          setTimeout(() => {
            renderSlides(idx);
            animating = false;
          }, 400);
        } else {
          renderSlides(idx);
          animating = false;
        }
      } else {
        renderSlides(idx);
      }
      current = idx;
    }

    function renderSlides(idx) {
      const visibleProjects = projects.slice(idx, idx + visibleCount);
      slider.innerHTML = `
    <div class="slider-row flex gap-8 justify-center items-stretch w-full px-8 transition-all duration-500 animate-slide-in">
      ${visibleProjects
        .map(
          (project) => `
        <div class="flex flex-row bg-white rounded-lg shadow-md p-8 w-full
          ${
            visibleCount === 1
              ? "max-w-4xl"
              : visibleCount === 2
              ? "max-w-2xl"
              : "max-w-xl"
          }
          min-h-[280px]">
          <div class="flex flex-col flex-1 pr-8">
            <h3 class="text-xl font-semibold mb-2">${project.name}</h3>
            <p class="mb-4 text-gray-700">${project.description || ""}</p>
            <div class="mb-4 flex flex-wrap gap-2">
              ${(project.tools || [])
                .map(
                  (tool) =>
                    `<span class="px-2 py-1 bg-[#05324d] text-white rounded text-xs">${tool}</span>`
                )
                .join("")}
            </div>
            <a href="${
              project.link
            }" target="_blank" class="inline-block px-6 py-2 bg-[#05324d] text-white rounded-lg shadow hover:bg-[#07507a] transition border border-[#05324d] mt-auto">
              Check it out!
            </a>
          </div>
          <div class="flex-shrink-0 flex items-center w-1/3">
            <img src="${project.image}" alt="${project.name} Preview"
              class="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer project-img"
              data-img="${project.image}" />
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;

      // Only show arrows on desktop
      if (controls) {
        controls.innerHTML = `
          <button id="slider-prev" class="hover:scale-110 transition" ${
            idx === 0 ? "disabled" : ""
          } aria-label="Previous">
            <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="56" y1="12" x2="12" y2="12" stroke="black" stroke-width="2"/>
              <polyline points="22,5 12,12 22,19" fill="none" stroke="black" stroke-width="2"/>
            </svg>
          </button>
          <button id="slider-next" class="hover:scale-110 transition" ${
            idx >= projects.length - visibleCount ? "disabled" : ""
          } aria-label="Next">
            <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="12" x2="56" y2="12" stroke="black" stroke-width="2"/>
              <polyline points="44,5 56,12 44,19" fill="none" stroke="black" stroke-width="2"/>
            </svg>
          </button>
        `;

        document.getElementById("slider-prev").onclick = () => {
          if (!animating) showSlides(current - 1, -1);
        };
        document.getElementById("slider-next").onclick = () => {
          if (!animating) showSlides(current + 1, 1);
        };
      }
    }

    // Add slide animation styles
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideLeft { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-40px); } }
      @keyframes slideRight { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(40px); } }
      .animate-slide-in { animation: slideIn 0.4s; }
      .animate-slide-left { animation: slideLeft 0.4s; }
      .animate-slide-right { animation: slideRight 0.4s; }
    `;
    document.head.appendChild(style);

    showSlides(current);
  });
