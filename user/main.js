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
});
