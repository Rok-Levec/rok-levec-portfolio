fetch("data/projects.json")
  .then((res) => res.json())
  .then((projects) => {
    const slider = document.getElementById("projects-slider");
    const controls = document.getElementById("slider-controls");
    if (!slider || !controls) return;

    let current = 0;
    const total = projects.length;
    let animating = false;

    // Drag variables
    let isDragging = false;
    let dragStartX = 0;
    let dragDeltaX = 0;

    function getViewMode() {
      const w = window.innerWidth;
      if (w < 768) return "mobile";
      if (w < 1024) return "tablet";
      if (w < 1280) return "desktop";
      return "large";
    }

    function showSlides(idx, direction = 0) {
      current = (idx + total) % total;

      // Animate slide
      if (direction !== 0) {
        animating = true;
        const slideOutClass =
          direction > 0 ? "animate-slide-left" : "animate-slide-right";
        const slideDiv = slider.querySelector(".slider-row");
        if (slideDiv) {
          slideDiv.classList.add(slideOutClass);
          setTimeout(() => {
            renderSlides(current);
            animating = false;
          }, 320);
        } else {
          renderSlides(current);
          animating = false;
        }
      } else {
        renderSlides(current);
      }
    }

    function renderSlides(idx) {
      const viewMode = getViewMode();
      let projectsToShow;
      let sliderRowClass =
        viewMode === "mobile"
          ? "slider-row flex justify-center items-stretch transition-all duration-300 animate-slide-in mx-8"
          : "slider-row flex justify-center items-stretch transition-all duration-300 animate-slide-in";

      if (viewMode === "mobile") {
        projectsToShow = [{ ...projects[idx], position: "center" }];
      } else if (viewMode === "tablet") {
        const nextIdx = (idx + 1) % total;
        projectsToShow = [
          { ...projects[idx], position: "center" },
          { ...projects[nextIdx], position: "side" },
        ];
        sliderRowClass += " gap-4 px-4";
      } else if (viewMode === "desktop") {
        const prevIdx = (idx - 1 + total) % total;
        const nextIdx = (idx + 1) % total;
        projectsToShow = [
          { ...projects[prevIdx], position: "side" },
          { ...projects[idx], position: "center" },
          { ...projects[nextIdx], position: "side" },
        ];
        sliderRowClass += " gap-4 px-2";
      } else {
        // Large screen: 2 side left, 1 center, 2 side right
        const idxs = [
          (idx - 2 + total) % total,
          (idx - 1 + total) % total,
          idx,
          (idx + 1) % total,
          (idx + 2) % total,
        ];
        projectsToShow = [
          { ...projects[idxs[1]], position: "side" },
          { ...projects[idxs[2]], position: "center" },
          { ...projects[idxs[3]], position: "side" },
        ];
        sliderRowClass += " gap-4 px-2";
      }

      slider.innerHTML = `
        <div class="${sliderRowClass} w-full">
          ${projectsToShow
            .map((project) => {
              const isCenter = project.position === "center";
              const isSide = project.position === "side";
              const isSideFar = project.position === "side-far";
              let imageClass, cardClass, opacity, scale, maxW, minH;

              if (isCenter) {
                imageClass =
                  "w-[300px] h-[180px] md:w-[340px] md:h-[200px] xl:w-[380px] xl:h-[220px]";
                cardClass =
                  "flex flex-col bg-white rounded-3xl shadow-2xl p-6 w-full max-w-lg min-h-[220px] scale-105 z-10 transition-all duration-300";
                opacity = "opacity-100";
                scale = "";
                maxW = "380px";
                minH = "220px";
              } else if (isSide) {
                imageClass =
                  "w-[140px] h-[80px] md:w-[160px] md:h-[100px] xl:w-[180px] xl:h-[110px]";
                cardClass =
                  "flex flex-col bg-white rounded-xl shadow p-2 w-full max-w-xs transition-all duration-300 opacity-60 scale-90";
                opacity = "opacity-60";
                scale = "scale-90";
                maxW = "180px";
                minH = "110px";
              } else {
                // side-far
                imageClass =
                  "w-[100px] h-[60px] md:w-[120px] md:h-[70px] xl:w-[140px] xl:h-[80px]";
                cardClass =
                  "flex flex-col bg-white rounded-lg shadow p-1 w-full max-w-[120px] transition-all duration-300 opacity-40 scale-75";
                opacity = "opacity-40";
                scale = "scale-75";
                maxW = "140px";
                minH = "80px";
              }

              return `
              <div class="${cardClass}">
                <h3 class="text-lg font-bold mb-2 text-[#05324d]">${
                  project.name
                }</h3>
                <div class="flex justify-center mb-3">
                  <img src="${project.image}" alt="${project.name} Preview"
                    class="${imageClass} object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300 cursor-pointer project-img"
                    style="max-width:${maxW};max-height:${minH};width:100%;height:auto;"
                    data-img="${project.image}" />
                </div>
                <p class="mb-3 text-sm text-gray-700">${
                  project.description || ""
                }</p>
                <div class="mb-3 flex flex-wrap gap-1 justify-center">
                  ${(project.tools || [])
                    .map(
                      (tool) =>
                        `<span class="px-2 py-1 bg-[#05324d] text-white rounded text-xs">${tool}</span>`
                    )
                    .join("")}
                </div>
                <div class="flex justify-center">
                  <a href="${
                    project.link
                  }" target="_blank" class="inline-block px-2 py-2 bg-[#05324d] text-white rounded-lg shadow hover:bg-[#07507a] transition border border-[#05324d] text-xs font-semibold text-center w-36">
                    Check it out!
                  </a>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      `;

      controls.innerHTML = `
        <button id="slider-prev" class="hover:scale-110 transition" aria-label="Previous">
          <svg width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="48" y1="12" x2="8" y2="12" stroke="black" stroke-width="2"/>
            <polyline points="18,6 8,12 18,18" fill="none" stroke="black" stroke-width="2"/>
          </svg>
        </button>
        <button id="slider-next" class="hover:scale-110 transition" aria-label="Next">
          <svg width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="8" y1="12" x2="48" y2="12" stroke="black" stroke-width="2"/>
            <polyline points="38,6 48,12 38,18" fill="none" stroke="black" stroke-width="2"/>
          </svg>
        </button>
      `;

      document.getElementById("slider-prev").onclick = () => {
        if (!animating) showSlides(current - 1, -1);
      };
      document.getElementById("slider-next").onclick = () => {
        if (!animating) showSlides(current + 1, 1);
      };

      // Drag events for slider
      const sliderRow = slider.querySelector(".slider-row");
      if (sliderRow) {
        sliderRow.onmousedown = (e) => {
          isDragging = true;
          dragStartX = e.clientX;
          dragDeltaX = 0;
        };
        document.onmousemove = (e) => {
          if (!isDragging) return;
          dragDeltaX = e.clientX - dragStartX;
        };
        document.onmouseup = () => {
          if (!isDragging) return;
          isDragging = false;
          if (Math.abs(dragDeltaX) > 60) {
            if (dragDeltaX < 0) {
              showSlides(current + 1, 1);
            } else {
              showSlides(current - 1, -1);
            }
          }
          dragDeltaX = 0;
        };

        // Touch events for mobile
        sliderRow.ontouchstart = (e) => {
          isDragging = true;
          dragStartX = e.touches[0].clientX;
          dragDeltaX = 0;
        };
        sliderRow.ontouchmove = (e) => {
          if (!isDragging) return;
          dragDeltaX = e.touches[0].clientX - dragStartX;
        };
        sliderRow.ontouchend = () => {
          if (!isDragging) return;
          isDragging = false;
          if (Math.abs(dragDeltaX) > 60) {
            if (dragDeltaX < 0) {
              showSlides(current + 1, 1);
            } else {
              showSlides(current - 1, -1);
            }
          }
          dragDeltaX = 0;
        };
      }
    }

    // Add slide animation styles
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideIn { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideLeft { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-24px); } }
      @keyframes slideRight { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(24px); } }
      .animate-slide-in { animation: slideIn 0.32s cubic-bezier(.4,0,.2,1); }
      .animate-slide-left { animation: slideLeft 0.32s cubic-bezier(.4,0,.2,1); }
      .animate-slide-right { animation: slideRight 0.32s cubic-bezier(.4,0,.2,1); }
    `;
    document.head.appendChild(style);

    showSlides(current);

    window.addEventListener("resize", () => showSlides(current));
  });
