import { getBasePath } from "../../../assets/utils/basePath.js";
import { navbar, initNavBar } from "../../../components/user/navbar.js";

// ===== Navbar =====
$("#mainWrapper").prepend(navbar(getBasePath()));
initNavBar();

// ===== Global State =====
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 6;

// ===== API =====
function getProducts() {
  return $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
  });
}

// ===== INIT =====
$(document).ready(function () {
  getProducts().done(function (products) {
    allProducts = products;
    filteredProducts = products;

    let categories = [...new Set(products.map(p => p.category))];
    renderFilters(categories);

    updateView();
  });

  // Filters
  $(document).on("change", ".category-filter", applyFilters);
  $(document).on("input", "#priceRange", applyFilters);

  // Search
  $("input[type='search']").on("input", function () {
    currentPage = 1;
    applyFilters();
  });

  // Clear
  $(document).on("click", "#clearFilters", function () {
    $(".category-filter").prop("checked", false);
    $("#priceRange").val(2000);
    $("input[type='search']").val("");

    filteredProducts = allProducts;
    currentPage = 1;
    updateView();
  });

  // Sort
  $("#sortSelect").on("change", function () {
    let val = $(this).val();

    if (val === "low") filteredProducts.sort((a, b) => a.price - b.price);
    if (val === "high") filteredProducts.sort((a, b) => b.price - a.price);

    updateView();
  });

  // Pagination
  $(document).on("click", ".page-btn", function () {
    currentPage = +$(this).data("page");
    updateView();
  });

  $(document).on("click", "#prevPage", function () {
    if (currentPage > 1) {
      currentPage--;
      updateView();
    }
  });

  $(document).on("click", "#nextPage", function () {
    let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateView();
    }
  });

  // Product Details
  $(document).on("click", ".product-card", function (e) {
    if ($(e.target).closest(".wishlist").length) return;

    const productId = $(this).data("id");
    window.location.href = `product-details.html?id=${productId}`;
  });
  $(document).on("click", ".wishlist", function (e) {
  e.stopPropagation();

  const icon = $(this).find("i");

  icon.toggleClass("bi-heart bi-heart-fill");

  $(this).toggleClass("active");
});

});

// ===== FILTER LOGIC =====
function applyFilters() {
  let selectedCategories = $(".category-filter:checked")
    .map(function () { return this.value; })
    .get();

  let maxPrice = $("#priceRange").val();
  let searchText = $("input[type='search']").val().toLowerCase();

  filteredProducts = allProducts.filter(p => {
    let catOK = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    let priceOK = p.price <= maxPrice;
    let searchOK = p.title.toLowerCase().includes(searchText);

    return catOK && priceOK && searchOK;
  });

  currentPage = 1;
  updateView();
}

// ===== VIEW =====
function updateView() {
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;

  renderProducts(filteredProducts.slice(start, end));
  renderPagination();

  $("#productsCount").text(
    `${start + 1}-${Math.min(end, filteredProducts.length)}`
  );
}

// ===== PAGINATION =====
function renderPagination() {
  let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (totalPages <= 1) {
    $("#pagination").html("");
    return;
  }

  let html = `<button id="prevPage" class="btn btn-outline-secondary btn-sm">Previous</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="btn btn-sm ${i === currentPage ? "btn-primary" : "btn-outline-secondary"} page-btn"
        data-page="${i}">
        ${i}
      </button>
    `;
  }

  html += `<button id="nextPage" class="btn btn-outline-secondary btn-sm">Next</button>`;

  $("#pagination").html(html);
}
