import { getBasePath } from "../../../assets/utils/basePath.js";
import { navbar, initNavBar } from "../../../components/user/navbar.js";
import { footer, initFooter } from "../../../components/user/footer.js";
import { productService } from "../../../DataBase/services/productService.js";
import { productCard } from "../../../components/user/card.js ";

$("#mainWrapper").prepend(navbar(getBasePath())).append(footer(getBasePath()));

initNavBar();
initFooter(getBasePath());

// ===== Global State =====
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 21;

// ===== API =====
function getProducts() {
  return productService.getAll();
}

// ===== INIT =====
$(document).ready(function () {
  let products = getProducts();
  allProducts = products;
  filteredProducts = products;

  //get max price
  let prices = products.map((p) => p.price);
  let maxPrice = Math.max(...prices);

  let categories = [...new Set(products.map((p) => p.category))];
  renderFilters(categories, maxPrice);

  updateView();

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
    $("#priceRange").val(maxPrice);
    $("input[type='search']").val("");

    filteredProducts = allProducts;
    currentPage = 1;
    updateView();
  });

  // Sort
  $("#sortSelect").on("change", function () {
    let val = $(this).val();
    if (val === "featured")
      filteredProducts.sort((x, y) =>
        x.featured === y.featured ? 0 : x.featured ? -1 : 1,
      );
    if (val === "low") filteredProducts.sort((a, b) => a.price - b.price);
    if (val === "high") filteredProducts.sort((a, b) => b.price - a.price);
    if (val === "rating") filteredProducts.sort((a, b) => b.rating - a.rating);

    updateView();
  });

  // Pagination
  $(document).on("click", ".page-btn", function () {
    currentPage = +$(this).data("page");
    window.scrollTo(0, 0);
    updateView();
  });

  $(document).on("click", "#prevPage", function () {
    if (currentPage > 1) {
      currentPage--;
      window.scrollTo(0, 0);
      updateView();
    }
  });

  $(document).on("click", "#nextPage", function () {
    let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      window.scrollTo(0, 0);
      updateView();
    }
  });

  // Product Details
  $(document).on("click", ".product-card h6", function (e) {
    e.stopPropagation(); // prevent card click if exists

    const productId = $(this).closest(".product-card").data("id");

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
    .map(function () {
      return this.value;
    })
    .get();

  let maxPrice = $("#priceRange").val();
  let searchText = $("input[type='search']").val().toLowerCase();

  filteredProducts = allProducts.filter((p) => {
    let catOK =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);
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
    ` Showing ${start + 1}-${Math.min(end, filteredProducts.length)} of ${filteredProducts.length} products
`,
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

function renderProducts(products) {
  $("#products").text("");
  if (!products.length) {
    $("#products").html(`<p class="text-center">No products found</p>`);
    return;
  }

  products.forEach((element) => {
    $("#products").append(
      productCard(
        element.id,
        element.images[0],
        element.title,
        element.rating,
        element.reviews.length,
        element.price,
      ),
    );
  });
}
