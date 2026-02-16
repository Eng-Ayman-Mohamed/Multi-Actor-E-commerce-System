import { getBasePath } from "../../../assets/utils/basePath.js";
import { navbar, initNavBar } from "../../../components/user/navbar.js";
import { footer, initFooter } from "../../../components/user/footer.js";

// ===== Render Navbar =====
$("#mainWrapper").prepend(navbar(getBasePath())).append(footer(getBasePath()));
initNavBar();
initFooter(getBasePath());

let allProducts = [];
function getProducts() {
  return $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
  });
}

$(document).ready(function () {
  getProducts().done(function (products) {
    allProducts = products;
    let categories = [...new Set(products.map((p) => p.category))];
    renderFilters(categories);
    renderProducts(products);
    renderPagination();
    $(".spinner-grow").css({ display: "none" });
  });

  $(document).on("change", ".category-filter", applyFilters);

  $(document).on("input", "#priceRange", applyFilters);

  $(document).on("click", "#clearFilters", function () {
    $(".category-filter").prop("checked", false);
    $("#priceRange").val(2000);
    $("#productsCount").text(products.length);

    renderProducts(allProducts);
  });

  $(document).on("click", ".wishlist", function () {
    $(this).toggleClass("active");
  });

  $("#sortSelect").on("change", function () {
    let val = $(this).val();
    let sorted = [...allProducts];

    if (val === "low") sorted.sort((a, b) => a.price - b.price);
    if (val === "high") sorted.sort((a, b) => b.price - a.price);

    renderProducts(sorted);
  });
  // ===== Product Details Navigation =====
$(document).on("click", ".product-card", function (e) {
  // لو ضغط على wishlist مايفتحش details
  if ($(e.target).closest(".wishlist").length) return;

  const productId = $(this).data("id");
  window.location.href = `product-details.html?id=${productId}`;
});

});

function applyFilters() {
  let selectedCategories = $(".category-filter:checked")
    .map(function () {
      return this.value;
    })
    .get();

  let maxPrice = $("#priceRange").val();

  let filtered = allProducts.filter((p) => {
    let catOK =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);

    let priceOK = p.price <= maxPrice;

    return catOK && priceOK;
  });

  renderProducts(filtered);
}

function renderPagination() {
  $("#pagination").html(`
    <button class="btn btn-outline-secondary btn-sm">Previous</button>
    <button class="btn btn-primary btn-sm">1</button>
    <button class="btn btn-outline-secondary btn-sm">2</button>
    <button class="btn btn-outline-secondary btn-sm">Next</button>
  `);
}
