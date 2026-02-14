// Multi-Actor-E-commerce-System/components/user/navbar.js

export function navbar() {
  return `
    <div id="navbar">
    <nav class="navbar navbar-expand-lg bg-body border-bottom px-4">
      <div class="container-fluid">

        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
          <div class="elog btn btn-primary rounded ">E</div>
          <span class="fw-bold">E-Shop</span>
        </a>

        <!-- Search -->
        <form class="d-none d-lg-block mx-auto w-50">
          <input 
            class="form-control rounded" 
            type="search" 
            placeholder="Search products..."
          >
        </form>

        <!-- Right Side -->
        <div class="d-flex align-items-center gap-4">

          <a href="index.html" class="nav-link">Home</a>
          <a href="products.html" class="nav-link">Products</a>

          <!-- Theme Toggle -->
          <button 
            id="themeToggle" 
            class="btn btn-light rounded">
            <i class="fa-solid fa-moon"></i>
          </button>

          <!-- Cart -->
          <a href="cart.html" class="position-relative btn btn-light rounded">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="cart-badge" id="cartCount">0</span>
          </a>

          <!-- Sign in -->
          <a href="login.html" class="btn btn-primary rounded px-3">
            <i class="fa-solid fa-right-to-bracket me-1"></i>
            Sign In
          </a>

        </div>
      </div>
    </nav>
    </div>
  `;
}

export function initNavBar() {
  /* ===== Theme Toggle (Bootstrap) ===== */
  const html = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");
  console.log(toggleBtn);
  const icon = toggleBtn.querySelector("i");

  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-bs-theme", savedTheme);

  icon.className =
    savedTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";

  toggleBtn.addEventListener("click", () => {
    const current = html.getAttribute("data-bs-theme");
    const next = current === "light" ? "dark" : "light";

    html.setAttribute("data-bs-theme", next);
    localStorage.setItem("theme", next);

    icon.className = next === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  });

  /* ===== Cart Count ===== */
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  $("#cartCount").text(cart.length);
}
