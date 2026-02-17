// ===== Get product ID =====
const params = new URLSearchParams(window.location.search);
const productId = params.get("id") || 1;

// ===== API =====
function getProductById(id) {
  return $.get(`https://fakestoreapi.com/products/${id}`);
}

// ⭐ Stars
function generateStars(rate) {
  let stars = "";
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5;

  for (let i = 0; i < full; i++) stars += `<i class="bi bi-star-fill"></i>`;
  if (half) stars += `<i class="bi bi-star-half"></i>`;
  for (let i = full + half; i < 5; i++) stars += `<i class="bi bi-star"></i>`;

  return stars;
}

// ===== Load Page =====
$(async function () {

  const product = await getProductById(productId);
  const oldPrice = (product.price * 1.25).toFixed(2);

  // لو مفيش صور إضافية → كرر الصورة الرئيسية
  const thumbnails = Array(3).fill(product.image);

  $("#productDetails").html(`
    <div class="row g-4">

      <!-- Images -->
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm p-3 text-center">
          <img src="${product.image}" class="img-fluid main-img" id="mainImage">
        </div>

        <div class="d-flex gap-3 mt-3 justify-content-center">
          ${thumbnails.map(src => `
            <img src="${src}" class="img-thumbnail thumb">
          `).join("")}
        </div>
      </div>

      <!-- Details -->
      <div class="col-lg-6">

        <h4 class="fw-bold">${product.title}</h4>

        <div class="rating mb-2">
          ${generateStars(product.rating.rate)}
          <span class="text-muted ms-2">${product.rating.rate} (${product.rating.count} reviews)</span>
        </div>

        <div class="mb-3">
          <span class="fs-3 fw-bold text-primary">$${product.price}</span>
          <span class="old-price ms-2">$${oldPrice}</span>
          <span class="badge bg-success ms-2">Save 25%</span>
        </div>

        <p class="text-success fw-semibold">
          <i class="bi bi-check-circle"></i> In Stock
        </p>

        <!-- Quantity -->
        <div class="d-flex align-items-center gap-3 mb-4">
          <span>Quantity</span>
          <div class="input-group" style="width:130px;">
            <button class="btn btn-outline-secondary" id="minus">-</button>
            <input type="text" id="qty" class="form-control text-center" value="1">
            <button class="btn btn-outline-secondary" id="plus">+</button>
          </div>
          <span class="text-muted">Total: $<span id="totalPrice">${product.price}</span></span>
        </div>

        <!-- Buttons -->
        <div class="d-flex gap-2 mb-4">
          <button class="btn btn-primary flex-grow-1">
            <i class="bi bi-cart"></i> Add to Cart
          </button>
          <button class="btn btn-outline-secondary">
            <i class="bi bi-heart"></i>
          </button>
        </div>

        <!-- Shipping -->
        <div class="bg-light p-3 rounded">
          <p class="mb-1"><i class="bi bi-truck"></i> Free shipping on orders over $50</p>
          <p class="mb-0"><i class="bi bi-shield-check"></i> 2-year warranty included</p>
        </div>

      </div>
    </div>

    <!-- Tabs -->
    <div class="mt-5">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#desc">Description</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#specs">Specifications</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#reviews">Reviews</button>
        </li>
      </ul>

      <div class="tab-content p-4 border border-top-0">

        <div class="tab-pane fade show active" id="desc">
          ${product.description}
        </div>

        <div class="tab-pane fade" id="specs">
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Rating:</strong> ${product.rating.rate}</p>
        </div>

        <div class="tab-pane fade" id="reviews">
          <p>No reviews available.</p>
        </div>

      </div>
    </div>
  `);

  // Hover change image
  $(".thumb").hover(function () {
    $("#mainImage").attr("src", $(this).attr("src"));
  });

  // Quantity logic
  let qty = 1;
  $("#plus").click(() => {
    qty++;
    $("#qty").val(qty);
    $("#totalPrice").text((qty * product.price).toFixed(2));
  });

  $("#minus").click(() => {
    if (qty > 1) qty--;
    $("#qty").val(qty);
    $("#totalPrice").text((qty * product.price).toFixed(2));
  });

});
