fetch("data/education.json")
  .then((response) => response.json())
  .then((educations) => {
    const container = document.getElementById("education-list");
    container.innerHTML = educations
      .map(
        (edu) => `
      <div class=" rounded-lg p-6 mb-6 shadow">
        <div class="flex justify-between items-center mb-2">
          <span class="font-bold text-lg text-[#05324d]">${edu.title}</span>
          <span class="text-sm text-gray-500">${edu.year}</span>
        </div>
        <div class="mb-2 font-semibold text-gray-800">${edu.school}</div>
      </div>
    `
      )
      .join("");
  });
