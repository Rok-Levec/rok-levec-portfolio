fetch("data/experience.json")
  .then((response) => response.json())
  .then((experiences) => {
    const container = document.getElementById("experience-list");
    container.innerHTML = experiences
      .map(
        (exp) => `
      <div class=" rounded-lg p-6 mb-6 shadow">
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
