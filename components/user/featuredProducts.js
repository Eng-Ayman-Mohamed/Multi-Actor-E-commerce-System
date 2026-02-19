import { productCard } from "./card.js";
import { productService } from "../../DataBase/services/productService.js";

export function featuredProducts() {
  return `<div id="featuredProducts" class="mb-5 container-lg px-4 ">
            <div class="d-flex justify-content-between">
                <div>
                    <p class="h2 fw-bold">Featured Products</p>
                    <p>HandPicked deals just for you</p>
                </div>
                <a href="./user/products/index.html"><div class="view-all text-primary align-self-center fw-bold">View All <i class="fa-solid fa-arrow-right"></i>
                </div></a>
            </div>
            <div id="featuredProductsContainer" class="row justify-content-around">
            </div>
        </div>`;
}

export function initFeaturedProducts() {
  const allProducts = productService.getAll();
  console.log(allProducts);
  const featuredProducts = allProducts
    .filter((product) => product.featured === true)
    .map((product) => {
      return {
        productImage: product.images[0] || "https://via.placeholder.com/1080",
        productTitle: product.title,
        productStars: product.rating,
        productReviews: product.reviews.length,
        productPrice: product.price,
      };
    });

  featuredProducts.forEach((item) => {
    $("#featuredProductsContainer").append(
      productCard(
        item.productImage,
        item.productTitle,
        item.productStars,
        item.productReviews,
        item.productPrice,
      ),
    );
  });

  const ratingElements = document.querySelectorAll(
    '[data-coreui-toggle="rating"]',
  );
  ratingElements.forEach((el) => {
    // This creates the actual stars based on the 'data-coreui-value'
    new coreui.Rating(el);
  });
}
