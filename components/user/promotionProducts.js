import { promotionCard } from "./promotionCard.js";
import { productService } from "../../DataBase/services/productService.js";
import { getCachedImage } from "../../DataBase/utils/cacheHelper.js";

export function promotionProducts() {
  return `<div class=" bg-body-tertiary "><div id="featuredProducts" class=" container-lg py-5  px-4 ">
            <div class="d-flex justify-content-between">
                <div>
                    <p class="h2 fw-bold">Promotion Products</p>
                    <p>Best discounts</p>
                </div>
                <a href="./user/products/index.html"><div class="view-all text-primary align-self-center fw-bold">View All <i class="fa-solid fa-arrow-right"></i>
                </div></a>
            </div>
            <div id="promotionProductsContainer" class="row justify-content-around">
            </div>
        </div></div>`;
}

export async function initPromotionProducts(basePath) {
  const allProducts = productService.getAll();

  const featuredList = allProducts
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  const cardPromises = featuredList.map(async (product) => {
    const imageUrl = product.images[0];

    // Get the cached version
    const finalImageSrc = await getCachedImage(imageUrl);

    return promotionCard(
      product.id,
      finalImageSrc,
      product.title,
      product.rating,
      product.reviews.length,
      product.price,
      product.finalPrice,
      basePath,
    );
  });

  const allCardsHtml = await Promise.all(cardPromises);

  $("#promotionProductsContainer").append(allCardsHtml.join(""));

  const ratingElements = document.querySelectorAll(
    '[data-coreui-toggle="rating"]',
  );
  ratingElements.forEach((el) => {
    new coreui.Rating(el);
  });
}
