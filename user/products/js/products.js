function renderProducts(products) {
  if (!products.length) {
    $("#products").html(`<p class="text-center">No products found</p>`);
    return;
  }

  let html = products
    .map(
      (p) => `
    <div class="col-lg-4 col-md-6">
      <div class=" shadow-lg product-card " data-id="${p.id}" >

        <div class="product-img">
          <img src="${p.image}" >
          <button class="wishlist bg-body">
            <i class="bi bi-heart-fill"></i>
          </button>
        </div>

        <div class="product-body">
          <h6 class="product-title fw-bold">${p.title}</h6>

          <div class="rating">
            ${renderStars(4)}
            <span class="count">(324)</span>
          </div>

          <div class="product-footer">
            <span class="price">$${p.price}</span>
            <button class="btn-add">
              <i class="bi bi-cart"></i> Add
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
    )
    .join("");

  $("#products").html(html);
}

function renderStars(num) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="bi bi-star${i <= num ? "-fill" : ""}"></i>`;
  }
  return stars;
}
