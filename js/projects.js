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
                  }" target="_blank" class="group inline-block hover:scale-105 transition-transform duration-300 relative mt-4">
                    <div class="text-l font-bold text-[#05324d] mb-2 group-hover:text-[#07507a] transition-colors duration-300 text-leftp-4 m-3">CHECK IT OUT!</div>
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
