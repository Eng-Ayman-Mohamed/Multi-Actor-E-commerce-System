// ===== Navbar =====
import { navbar, initNavBar } from "./navbar.js";

// ===== Old jQuery-based modules =====
import "./api.js";
import "./filters.js";
import "./products.js";
import "./pagination.js";
import "./app.js";

// ===== Render Navbar =====
document.getElementById("navbar-container").innerHTML = navbar();
initNavBar();
