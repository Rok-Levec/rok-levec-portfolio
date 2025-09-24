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

    function getCardStyles(isCenter, viewMode) {
      const isMobile = viewMode === "mobile";
      const isTablet = viewMode === "tablet";
      const isDesktop = viewMode === "desktop";

      if (isCenter) {
        if (isMobile) {
          return {
            imageClass: "w-full h-[160px] rounded-2xl",
            cardClass:
              "flex flex-col bg-white rounded-3xl shadow-2xl w-full max-w-[320px] min-h-[260px] scale-100 z-10 transition-all duration-300 mx-auto border border-gray-200",
          };
        } else if (isTablet || isDesktop) {
          return {
            imageClass:
              "w-full h-[200px] md:h-[220px] xl:h-[240px] rounded-2xl",
            cardClass:
              "flex flex-col bg-white rounded-3xl shadow-2xl w-full max-w-xl min-h-[320px] scale-105 z-10 transition-all duration-300 mx-auto border border-gray-200",
          };
        } else {
          return {
            imageClass: "w-full h-[300px] 2xl:h-[340px] rounded-2xl",
            cardClass:
              "flex flex-col bg-white rounded-3xl shadow-2xl w-full max-w-2xl min-h-[400px] scale-110 z-10 transition-all duration-300 mx-auto border border-gray-200",
          };
        }
      } else {
        if (isMobile) {
          return {
            imageClass: "w-full h-[90px] rounded-2xl",
            cardClass:
              "flex flex-col bg-white rounded-xl shadow w-full max-w-[180px] min-h-[120px] opacity-60 scale-90 transition-all duration-300 mx-auto border border-gray-200",
          };
        } else if (isTablet || isDesktop) {
          return {
            imageClass:
              "w-full h-[110px] md:h-[130px] xl:h-[150px] rounded-2xl",
            cardClass:
              "flex flex-col bg-white rounded-xl shadow w-full max-w-md min-h-[180px] opacity-60 scale-90 transition-all duration-300 mx-auto border border-gray-200",
          };
        } else {
          return {
            imageClass: "w-full h-[150px] 2xl:h-[180px] rounded-2xl",
            cardClass:
              "flex flex-col bg-white rounded-xl shadow w-full max-w-lg min-h-[220px] opacity-60 scale-95 transition-all duration-300 mx-auto border border-gray-200",
          };
        }
      }
    }

    function getProjectsToShow(idx, viewMode) {
      const projects2K = window.innerWidth >= 1920;

      switch (viewMode) {
        case "mobile":
          return [{ ...projects[idx], position: "center" }];

        case "tablet":
          return [
            { ...projects[idx], position: "center" },
            { ...projects[(idx + 1) % total], position: "side" },
          ];

        case "desktop":
          return [
            { ...projects[(idx - 1 + total) % total], position: "side" },
            { ...projects[idx], position: "center" },
            { ...projects[(idx + 1) % total], position: "side" },
          ];

        case "large":
          if (projects2K) {
            return [
              { ...projects[(idx - 1 + total) % total], position: "side" },
              { ...projects[idx], position: "center" },
              { ...projects[(idx + 1) % total], position: "side" },
              { ...projects[(idx + 2) % total], position: "side" },
            ];
          } else {
            return [
              { ...projects[(idx - 1 + total) % total], position: "side" },
              { ...projects[idx], position: "center" },
              { ...projects[(idx + 1) % total], position: "side" },
            ];
          }
      }
    }

    function getSliderRowClass(viewMode) {
      const baseClass =
        "slider-row flex justify-center items-stretch transition-all duration-300 animate-slide-in";

      switch (viewMode) {
        case "mobile":
          return `${baseClass} my-8 pb-8`;
        case "large":
          return `${baseClass} mx-2 my-12 pb-12 gap-4 px-2`;
        default:
          return `${baseClass} mx-8 my-10 pb-10 gap-4 ${
            viewMode === "tablet" ? "px-4" : "px-2"
          }`;
      }
    }

    function handleCardClick(slideIndex, viewMode) {
      const projects2K = window.innerWidth >= 1920 && viewMode === "large";
      let newCurrent;

      if (viewMode === "tablet" && slideIndex === 1) {
        newCurrent = (current + 1) % total;
      } else if (viewMode === "desktop") {
        if (slideIndex === 0) newCurrent = (current - 1 + total) % total;
        else if (slideIndex === 2) newCurrent = (current + 1) % total;
      } else if (viewMode === "large") {
        if (projects2K) {
          if (slideIndex === 0) newCurrent = (current - 1 + total) % total;
          else if (slideIndex === 2) newCurrent = (current + 1) % total;
          else if (slideIndex === 3) newCurrent = (current + 2) % total;
        } else {
          if (slideIndex === 0) newCurrent = (current - 1 + total) % total;
          else if (slideIndex === 2) newCurrent = (current + 1) % total;
        }
      }

      if (newCurrent !== undefined) {
        showSlides(newCurrent, slideIndex < 1 ? -1 : 1);
      }
    }

    function addDragEvents(sliderRow) {
      const handleDrag = (startX, moveX) => {
        if (!isDragging) return;
        dragDeltaX = moveX - startX;
      };

      const handleDragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        if (Math.abs(dragDeltaX) > 60) {
          showSlides(
            dragDeltaX < 0 ? current + 1 : current - 1,
            dragDeltaX < 0 ? 1 : -1
          );
        }
        dragDeltaX = 0;
      };

      // Mouse events
      sliderRow.onmousedown = (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragDeltaX = 0;
      };
      document.onmousemove = (e) => handleDrag(dragStartX, e.clientX);
      document.onmouseup = handleDragEnd;

      // Touch events
      sliderRow.ontouchstart = (e) => {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragDeltaX = 0;
      };
      sliderRow.ontouchmove = (e) =>
        handleDrag(dragStartX, e.touches[0].clientX);
      sliderRow.ontouchend = handleDragEnd;
    }

    function showSlides(idx, direction = 0) {
      current = (idx + total) % total;

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
      const projectsToShow = getProjectsToShow(idx, viewMode);
      const sliderRowClass = getSliderRowClass(viewMode);

      slider.innerHTML = `
        <div class="${sliderRowClass} w-full">
          ${projectsToShow
            .map((project, i) => {
              const isCenter = project.position === "center";
              const { imageClass, cardClass } = getCardStyles(
                isCenter,
                viewMode
              );

              const cardClickable = !isCenter
                ? `style="cursor:pointer;" data-slide-to="${i}"`
                : "";
              const overlay = !isCenter
                ? `<div class="absolute inset-0 z-20" style="background:transparent;cursor:pointer;" data-slide-to="${i}"></div>`
                : "";

              return `
              <div class="${cardClass} relative group" ${cardClickable} style="position:relative;display:flex;flex-direction:column;height:100%;">
                ${overlay}
                <div style="width:100%;height:40%;margin:0;flex-shrink:0;overflow:hidden;">
                  <img src="${project.image}" alt="${project.name} Preview"
                    class="object-cover ${imageClass} hover:scale-105 transition-transform duration-300 cursor-pointer project-img"
                    style="width:100%;height:100%;margin:0;display:block;"
                    data-img="${project.image}" ${
                isCenter ? "" : "tabindex='-1'"
              }/>
                </div>
                <div style="padding:24px;flex:1;display:flex;flex-direction:column;justify-content:space-between;${
                  !isCenter
                    ? "pointer-events:none;user-select:none;opacity:0.6;"
                    : ""
                }">
                  <div>
                    <h3 class="text-lg font-bold mb-2 text-[#05324d]">${
                      project.name
                    }</h3>
                    <p class="mb-3 text-sm text-gray-700">${
                      project.description || ""
                    }</p>
                    <div class="flex flex-wrap gap-1 mb-6">
                      ${(project.tools || [])
                        .map(
                          (tool) =>
                            `<span class="px-2 py-1 bg-[#05324d] text-white rounded text-xs">${tool}</span>`
                        )
                        .join("")}
                    </div>
                  </div>
                  <div class="flex justify-end mt-6">
                    <a href="${
                      project.link
                    }" target="_blank" class="group inline-block hover:scale-105 transition-transform duration-300 relative"${
                !isCenter ? " tabindex='-1' style='pointer-events:none;'" : ""
              }>
                      <div class="text-l font-bold text-[#05324d] mb-2 group-hover:text-[#07507a] transition-colors duration-300 text-left">CHECK IT OUT!</div>
                      <svg width="180" height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="group-hover:translate-x-2 transition-transform duration-300">
                        <line x1="0" y1="6" x2="165" y2="6" stroke="#05324d" stroke-width="3" class="group-hover:stroke-[#07507a] transition-colors duration-300"/>
                        <polyline points="157,2 165,6 157,10" fill="none" stroke="#05324d" stroke-width="3" class="group-hover:stroke-[#07507a] transition-colors duration-300"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      `;

      // Add click events for non-highlighted cards
      slider.querySelectorAll("[data-slide-to]").forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const slideIndex = Number(el.getAttribute("data-slide-to"));
          handleCardClick(slideIndex, viewMode);
        });
      });

      // Render controls
      controls.innerHTML = `
        <div class="flex justify-center items-center gap-8">
          <button id="slider-prev" class="hover:scale-110 transition" aria-label="Previous">
            <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="68" y1="12" x2="12" y2="12" stroke="black" stroke-width="2"/>
              <polyline points="22,6 12,12 22,18" fill="none" stroke="black" stroke-width="2"/>
            </svg>
          </button>
          <button id="slider-next" class="hover:scale-110 transition" aria-label="Next">
            <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="12" x2="68" y2="12" stroke="black" stroke-width="2"/>
              <polyline points="58,6 68,12 58,18" fill="none" stroke="black" stroke-width="2"/>
            </svg>
          </button>
        </div>
      `;

      document.getElementById("slider-prev").onclick = () => {
        if (!animating) showSlides(current - 1, -1);
      };
      document.getElementById("slider-next").onclick = () => {
        if (!animating) showSlides(current + 1, 1);
      };

      // Add drag events
      const sliderRow = slider.querySelector(".slider-row");
      if (sliderRow) addDragEvents(sliderRow);
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
      
      #projects-slider {
        overflow: visible !important;
      }
    `;
    document.head.appendChild(style);

    showSlides(current);
    window.addEventListener("resize", () => showSlides(current));
  });
