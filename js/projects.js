fetch("data/projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const container = document.getElementById("projects-list");
    if (container) {
      // Limit to 4 projects on index.html, show all on projects.html
      const isHome =
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/";
      const displayProjects = isHome ? projects.slice(0, 4) : projects;

      container.innerHTML = displayProjects
        .map(
          (project) => `
        <div class="bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row items-center mb-8 p-6">
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

      // Add "See more projects" button on index.html
      if (isHome && projects.length > 4) {
        container.innerHTML += `
          <div class="flex justify-center mt-8">
            <a href="projects.html" class="px-6 py-2 bg-[#05324d] text-white rounded-lg shadow hover:bg-[#07507a] transition border border-[#05324d]">
              See more projects
            </a>
          </div>
        `;
      }
    }
  });
