fetch("data/projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const container = document.getElementById("projects-list");
    if (!container) return;
    container.innerHTML = projects
      .map((project, i) => {
        // Zipper style: alternate flex-row-reverse for even projects
        const isRight = i % 2 === 1;
        return `
            <div>
              <div class="flex flex-col md:flex-row${
                isRight ? "-reverse" : ""
              } items-center py-8">
                <div class="flex-1 ${
                  isRight ? "md:ml-20" : "md:mr-20"
                } mb-6 md:mb-0">
                  <h3 class="text-xl font-semibold mb-2">${project.name}</h3>
                  <p class="mb-4 text-gray-700">${project.description}</p>
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
                  }" target="_blank" class="group inline-block transition-all duration-300 relative mt-4">
                    <div class="
                      relative overflow-hidden
                      bg-gradient-to-r from-[#05324d] to-[#07507a] 
                      text-white font-semibold text-sm
                      px-6 py-3 rounded-xl
                      shadow-lg shadow-[#05324d]/20
                      hover:shadow-xl hover:shadow-[#05324d]/30
                      hover:scale-105 hover:-translate-y-0.5
                      active:scale-95
                      transition-all duration-300 ease-out
                      border border-transparent
                      hover:border-[#38A881]/20
                      before:absolute before:inset-0 
                      before:bg-gradient-to-r before:from-[#38A881] before:to-[#1D5843]
                      before:opacity-0 before:transition-opacity before:duration-300
                      hover:before:opacity-100
                      group-hover:text-white
                    ">
                      <span class="relative z-10 flex items-center gap-2">
                        VIEW PROJECT
                        <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </span>
                    </div>
                  </a>
                </div>
                <div class="flex-shrink-0 flex items-center w-full md:w-1/2 justify-center">
                  <img src="${project.image}" alt="${project.name} Preview"
                    class="w-full max-w-md h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer project-img"
                    data-img="${project.image}" />
                </div>
              </div>
              ${
                i < projects.length - 1
                  ? '<hr class="border-t border-gray-300 my-4">'
                  : ""
              }
            </div>
          `;
      })
      .join("");
  });
