const tools = [
  {
    name: "HTML",
    icon: "images/icons/html5.svg",
    description:
      "Semantic markup and accessibility-focused structure for modern web applications.",
  },
  {
    name: "CSS",
    icon: "images/icons/css3.svg",
    description:
      "Advanced styling with flexbox, grid, animations, and responsive design principles.",
  },
  {
    name: "JavaScript",
    icon: "images/icons/javascript.svg",
    description:
      "Modern ES6+ features, DOM manipulation, and interactive web functionality.",
  },
  {
    name: "Tailwind",
    icon: "images/icons/tailwindcss.svg",
    description:
      "Utility-first CSS framework for rapid UI development and consistent design systems.",
  },
  {
    name: "SQL",
    icon: "images/icons/mysql.svg",
    description:
      "Database design, queries, and data management for web applications.",
  },
  {
    name: "Laravel",
    icon: "images/icons/laravel.svg",
    description:
      "PHP framework experience for building robust backend systems and APIs.",
  },
  {
    name: "React",
    icon: "images/icons/react.svg",
    description:
      "Component-based JavaScript library for building dynamic user interfaces.",
  },
];

function initializeTools() {
  const toolsRow = document.getElementById("tools-row");
  const toolDescription = document.getElementById("tool-description");

  if (!toolsRow || !toolDescription) return;

  // Generate tools HTML
  toolsRow.innerHTML = tools
    .map(
      (tool) => `
    <div class="flex flex-col items-center group cursor-pointer" data-tool="${tool.name}">
      <img
        src="${tool.icon}"
        alt="${tool.name}"
        class="w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-110"
      />
      <span class="font-semibold">${tool.name}</span>
    </div>
  `
    )
    .join("");

  // Add hover events
  toolsRow.querySelectorAll("[data-tool]").forEach((toolElement) => {
    const toolName = toolElement.getAttribute("data-tool");
    const tool = tools.find((t) => t.name === toolName);

    if (tool) {
      toolElement.addEventListener("mouseenter", () => {
        toolDescription.textContent = tool.description;
        toolDescription.style.opacity = "1";
      });

      toolElement.addEventListener("mouseleave", () => {
        toolDescription.style.opacity = "0.6";
        setTimeout(() => {
          if (toolDescription.style.opacity === "0.6") {
            toolDescription.textContent = "";
          }
        }, 200);
      });
    }
  });
}

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTools);
} else {
  initializeTools();
}
