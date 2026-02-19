import { getBasePath } from "../assets/utils/basePath.js";
import { navbar, initNavBar } from "../components/user/navbar.js";
import heroSection from "../components/user/heroSection.js";
import shopFeatures from "../components/user/shopFeatures.js";
import { categories, initCategories } from "../components/user/categories.js";
import {
  featuredProducts,
  initFeaturedProducts,
} from "../components/user/featuredProducts.js";
import { CTASection, footer, initFooter } from "../components/user/footer.js";

import { cartService } from "../DataBase/services/cartService.js";
import { userService } from "../DataBase/services/userService.js";

$(function () {
  const basePath = getBasePath();

  $("#mainWrapper")
    .append(navbar(basePath))
    .append(heroSection(basePath))
    .append(shopFeatures)
    .append(categories)
    .append(featuredProducts)
    .append(CTASection(basePath))
    .append(footer(basePath));
  initCategories();
  initNavBar();
  initFeaturedProducts();
  initFooter(basePath);
  let userId = userService.getCurrentUser().id;
  updateCartCount();
  $(".addToCartBtn").click(function () {
    let productId = $(this).attr("data-productId");
    cartService.addItem(userId, productId);
    console.log("product Added", productId);
    updateCartCount();
  });
});

function dynamicData() {}

function updateCartCount() {
  /* ===== Cart Count ===== */
  let userId = userService.getCurrentUser().id;
  $("#cartCount").text(cartService.getCartCount(userId));
  $("#cartCountMobile").text(cartService.getCartCount(userId));
}
dynamicData();
