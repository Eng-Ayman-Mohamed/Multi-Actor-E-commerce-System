
let allProducts = [];

$(document).ready(function () {

  getProducts().done(function (products) {
    allProducts = products;

    let categories = [...new Set(products.map(p => p.category))];

    renderFilters(categories);
    renderProducts(products);
    renderPagination();
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

});

function applyFilters() {
  let selectedCategories = $(".category-filter:checked")
    .map(function () {
      return this.value;
    }).get();

  let maxPrice = $("#priceRange").val();

  let filtered = allProducts.filter(p => {
    let catOK =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);

    let priceOK = p.price <= maxPrice;

    return catOK && priceOK;
  });

  renderProducts(filtered);
}
