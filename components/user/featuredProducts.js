import { productCard } from "./card.js";
import { productService } from "../../DataBase/services/productService.js";
import { getCachedImage } from "../../DataBase/utils/cacheHelper.js";
export function featuredProducts() {
  return `<div class=" bg-body-tertiary "><div id="featuredProducts" class=" container-lg py-5  px-4 ">
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
        </div></div>`;
}

export async function initFeaturedProducts() {
  const allProducts = productService.getAll();

  const featuredList = allProducts
    .filter((product) => product.featured === true)
    .slice(0, 12);

  const cardPromises = featuredList.map(async (product) => {
    const imageUrl = product.images[0] || "/assets/vendra-thubnail.png";

    // Get the cached version
    const finalImageSrc = await getCachedImage(imageUrl);

    return productCard(
      product.id,
      finalImageSrc,
      product.title,
      product.rating,
      product.reviews.length,
      product.price,
      product.featured,
    );
  });

  const allCardsHtml = await Promise.all(cardPromises);

  $("#featuredProductsContainer").append(allCardsHtml.join(""));

  const ratingElements = document.querySelectorAll(
    '[data-coreui-toggle="rating"]',
  );
  ratingElements.forEach((el) => {
    new coreui.Rating(el);
  });
}
