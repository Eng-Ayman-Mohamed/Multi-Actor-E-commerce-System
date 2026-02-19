import { getBasePath } from "../../assets/utils/basePath.js";
import { navbar, initNavBar } from "../../components/user/navbar.js";
import { footer, initFooter } from "../../components/user/footer.js";
import { productService } from "../../DataBase/services/productService.js";

$("body").prepend(navbar(getBasePath())).append(footer(getBasePath()));
initNavBar();
initFooter(getBasePath());

// ===== Get product ID =====
const params = new URLSearchParams(window.location.search);
const productId = params.get("id") || 1;

// ===== API =====
function getProductById(id) {
  return productService.getById(id);
}

// ⭐ Stars
function generateStars(rating) {
  let stars = "";
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) stars += `<i class="bi bi-star-fill"></i>`;
  if (half) stars += `<i class="bi bi-star-half"></i>`;
  for (let i = full + half; i < 5; i++) stars += `<i class="bi bi-star"></i>`;

  return stars;
}

// ===== Load Page =====
$(function () {
  const product = getProductById(productId);
  // لو مفيش صور إضافية → كرر الصورة الرئيسية
  const thumbnails = product.images;

  $("#productDetails").html(`
    <div class="row g-4">

      <!-- Images -->
      <div class="col-lg-6">
        <div class="card border-0 shadow p-3 text-center">
          <img src="${product.images[0]}" class="img-fluid main-img" id="mainImage">
        </div>

        <div class="d-flex gap-3 mt-3 justify-content-center">
          ${thumbnails
            .map(
              (src) => `
            <img src="${src}" class="img-thumbnail thumb">
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Details -->
      <div class="col-lg-6">

        <h4 class="fw-bold">${product.title}</h4>

        <div class="rating mb-2">
          ${generateStars(product.rating)}
          <span class="text-muted ms-2">${product.rating} (${product.reviews.length} reviews)</span>
        </div>

        <div class="mb-3">
          <span class="fs-3 fw-bold text-primary">$${product.finalPrice.toFixed(2)}</span>
          <span class="old-price ms-2">$${product.price}</span>
          <span class="badge bg-success ms-2">Save ${product.discount}</span>
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
          <span class="text-muted">Total: $<span id="totalPrice">${product.finalPrice.toFixed(2)}</span></span>
        </div>

        <!-- Buttons -->
        <div class="d-flex gap-2 mb-4">
          <button class="btn btn-primary flex-grow-1">
            <i class="bi bi-cart"></i> Add to Cart
          </button>
          <button class="btn btn-outline-secondary">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>

        <!-- Shipping -->
        <div class="bg- p-3 rounded">
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
          ${product.desc}
        </div>

        <div class="tab-pane fade" id="specs">
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Rating:</strong> ${product.reviews.length}</p>
        </div>

        <div class="tab-pane fade" id="reviews">
          ${product.reviews.length ? `<p>reviews</p>` : `<p>No reviews available.</p>`}
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
