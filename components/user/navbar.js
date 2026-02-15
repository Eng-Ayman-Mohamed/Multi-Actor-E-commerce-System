export function navbar() {
  return `
  <div id="navbar" class="w-100 sticky-top bg-body border-bottom z-3">

    <!-- ===== Navbar ===== -->
    <nav class="navbar px-3">
      <div class="container-fluid p-0">

        <!-- Logo (LEFT) -->
        <a class="navbar-brand d-flex align-items-center gap-2" href="#">
          <div class="fw-bold btn btn-primary rounded">E</div>
          <span class="fw-bold">E-Shop</span>
        </a>

        <!-- Hamburger (RIGHT - Mobile only) -->
        <button class="btn d-lg-none"
                data-bs-toggle="collapse"
                data-bs-target="#mobileMenu">
          <i class="fa-solid fa-bars fs-4"></i>
        </button>

        <!-- Desktop Menu -->
        <div class="d-none d-lg-flex align-items-center gap-4 ms-auto">
          <a href="#" class="nav-link">Home</a>
          <a href="products.html" class="nav-link">Products</a>

          <button id="themeToggle" class="btn btn-body rounded">
            <i class="fa-regular fa-moon"></i>
          </button>

          <a href="#" class="position-relative btn btn-body rounded">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="cart-badge" id="cartCount">0</span>
          </a>

          <a href="user/auth/login.html" class="btn btn-primary rounded px-3">
            Sign In
          </a>
        </div>

      </div>
    </nav>

    <!-- ===== Mobile Menu ===== -->
    <div id="mobileMenu" class="collapse d-lg-none border-top bg-body">
      <div class="container py-3 text-start">

        <!-- Search -->
        <input class="form-control rounded mb-3"
               type="search"
               placeholder="Search products...">

        <!-- Menu items (LEFT aligned) -->
        <a href="#" class="nav-link w-100">Home</a>
        <a href="products.html" class="nav-link w-100">Products</a>

        <button id="themeToggleMobile" class="btn btn-body w-100 text-start">
          <i class="fa-regular fa-moon me-2"></i>
          Dark Mode
        </button>

        <a href="#" class="nav-link w-100">
          <i class="fa-solid fa-cart-shopping me-2"></i>
          Cart (<span id="cartCountMobile">0</span>)
        </a>

        <!-- Sign In (CENTER + FULL WIDTH) -->
        <div class="text-center mt-3">
          <a href="./user/auth/login.html" class="btn btn-primary w-100">
            Sign In
          </a>
        </div>

      </div>
    </div>

  </div>
  `;
}

export function initNavBar() {
  /* ===== Theme Toggle ===== */
  const html = document.documentElement;

  function setupToggle(id) {
    const btn = document.getElementById(id);
    if (!btn) return;

    const icon = btn.querySelector("i");
    const savedTheme = localStorage.getItem("theme") || "light";

    html.setAttribute("data-bs-theme", savedTheme);
    icon.className =
      savedTheme === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon";

    btn.addEventListener("click", () => {
      const current = html.getAttribute("data-bs-theme");
      const next = current === "light" ? "dark" : "light";

      html.setAttribute("data-bs-theme", next);
      localStorage.setItem("theme", next);

      icon.className =
        next === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon";
    });
  }

  setupToggle("themeToggle");
  setupToggle("themeToggleMobile");

  /* ===== Cart Count ===== */
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  $("#cartCount").text(cart.length);
  $("#cartCountMobile").text(cart.length);
}
