import { navbar, initNavBar } from "../components/user/navbar.js";
import heroSection from "../components/user/heroSection.js";
import shopFeatures from "../components/user/shopFeatures.js";
import { categories, initCategories } from "../components/user/categories.js";
import {
  featuredProducts,
  initFeaturedProducts,
} from "../components/user/featuredProducts.js";
import { footer, initFooter } from "../components/user/footer.js";

$(function () {
  $("#mainWrapper")
    .append(navbar)
    .append(heroSection)
    .append(shopFeatures)
    .append(categories)
    .append(featuredProducts)
    .append(footer);
  initCategories();
  initNavBar();
  initFeaturedProducts();
  initFooter();
});
