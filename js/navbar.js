// Load navbar HTML and initialize all navbar functionality
function initializeNavbar() {
  fetch("navbar.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("navbar").innerHTML = html;
      // Initialize all navbar features after HTML is loaded
      highlightActivePage();
      initializeMobileMenu();
      initializeScrollNavbar();
    });
}

// Highlight active page in navigation
function highlightActivePage() {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname;

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");

    // Check if current page matches link
    if (
      currentPage.endsWith(linkPath) ||
      (currentPage === "/" && linkPath === "index.html") ||
      (currentPage.endsWith("/") && linkPath === "index.html")
    ) {
      // Add active styles
      link.classList.add("font-bold");
      link.classList.remove("underline"); // Remove default underline
      link.style.color = "#ffffffff";
      link.style.position = "relative";

      // Add custom prettier underline with pseudo-element
      link.style.setProperty("--underline-display", "block");
    } else {
      // Remove active styles and set normal color
      link.classList.remove("font-bold");
      link.style.color = "#ffffffff"; // gray-500
      link.style.setProperty("--underline-display", "none");
    }
  });
}

// Scroll navbar functionality
function initializeScrollNavbar() {
  const navbar = document.querySelector("nav");
  if (!navbar) {
    console.log("Navbar not found");
    return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  // Change navbar positioning to fixed for better control
  navbar.style.position = "fixed";
  navbar.style.top = "0";
  navbar.style.left = "0";
  navbar.style.right = "0";
  navbar.style.zIndex = "50";

  // Add padding to body to prevent content from being covered (reduced padding)
  const navbarHeight = navbar.offsetHeight;
  document.body.style.paddingTop = navbarHeight - 10 + "px"; // Reduced by 10px

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        navbar.style.transform = "translateY(0)";
        navbar.style.opacity = "1";
        navbar.style.visibility = "visible";
      } else {
        // Scrolling down - hide navbar
        navbar.style.transform = "translateY(-100%)";
        navbar.style.opacity = "0";
        navbar.style.visibility = "hidden";
      }
    } else {
      // At top of page - always show navbar
      navbar.style.transform = "translateY(0)";
      navbar.style.opacity = "1";
      navbar.style.visibility = "visible";
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  updateNavbar();
  window.addEventListener("scroll", requestTick, { passive: true });

  // Handle window resize to adjust padding
  window.addEventListener("resize", () => {
    const newNavbarHeight = navbar.offsetHeight;
    document.body.style.paddingTop = newNavbarHeight - 10 + "px"; // Reduced by 10px
  });

  // Add custom CSS for prettier underlines
  const style = document.createElement("style");
  style.innerHTML = `
    .nav-link {
      position: relative;
      transition: all 0.3s ease;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 60%;
      transform: translateX(-60%);
      width: 80%;
      height: 2px;
      background: white;
      border-radius: 1px;
      display: var(--underline-display, none);
      transition: all 0.3s ease;
    }
    
    .nav-link:hover::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}

// Mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerLine1 = document.getElementById("burger-line-1");
  const burgerLine2 = document.getElementById("burger-line-2");
  const burgerLine3 = document.getElementById("burger-line-3");

  if (!mobileMenuButton || !mobileMenu) {
    console.log("Mobile menu elements not found");
    return;
  }

  let isMenuOpen = false;

  mobileMenuButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden");
      if (burgerLine1)
        burgerLine1.style.transform = "rotate(45deg) translate(5px, 5px)";
      if (burgerLine2) burgerLine2.style.opacity = "0";
      if (burgerLine3)
        burgerLine3.style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      mobileMenu.classList.add("hidden");
      if (burgerLine1)
        burgerLine1.style.transform = "rotate(0) translate(0, 0)";
      if (burgerLine2) burgerLine2.style.opacity = "1";
      if (burgerLine3)
        burgerLine3.style.transform = "rotate(0) translate(0, 0)";
    }
  });

  // Close menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isMenuOpen = false;
      mobileMenu.classList.add("hidden");
      if (burgerLine1)
        burgerLine1.style.transform = "rotate(0) translate(0, 0)";
      if (burgerLine2) burgerLine2.style.opacity = "1";
      if (burgerLine3)
        burgerLine3.style.transform = "rotate(0) translate(0, 0)";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !mobileMenuButton.contains(e.target) &&
      !mobileMenu.contains(e.target) &&
      isMenuOpen
    ) {
      isMenuOpen = false;
      mobileMenu.classList.add("hidden");
      if (burgerLine1)
        burgerLine1.style.transform = "rotate(0) translate(0, 0)";
      if (burgerLine2) burgerLine2.style.opacity = "1";
      if (burgerLine3)
        burgerLine3.style.transform = "rotate(0) translate(0, 0)";
    }
  });
}

// Initialize navbar when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeNavbar);
} else {
  initializeNavbar();
}
