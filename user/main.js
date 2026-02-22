import { getBasePath } from "../assets/utils/basePath.js";
import { navbar, initNavBar } from "../components/user/navbar.js";
import { CTASection, footer, initFooter } from "../components/user/footer.js";
import heroSection from "../components/user/heroSection.js";
import shopFeatures from "../components/user/shopFeatures.js";
import { categories, initCategories } from "../components/user/categories.js";
import {
  featuredProducts,
  initFeaturedProducts,
} from "../components/user/featuredProducts.js";
import { seedReady } from "../DataBase/utils/seed.js";
import { initCard } from "../components/user/card.js";

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
  seedReady.then(() => {
    initCategories();
    initNavBar(basePath);
    initFeaturedProducts(basePath);
    initFooter(basePath);
    initCard();
  });
});
