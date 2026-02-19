import { seedReady } from "../DataBase/utils/seed.js";
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

  seedReady.then(() => {
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
});

/*  addItem(productId, qty = 1) {
    const existing = this.items.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += qty;
    } else {
      this.items.push({
        productId,
        quantity: qty,
      });
    }
  },

  addToCart(userId, productId, quantity = 1) {
    const carts = storage.get("carts");
    const index = carts.findIndex((c) => c.userId === userId);
    if (index === -1) {
      let newCart = new Cart(userId);
      newCart.addItem(productId, quantity);
      carts.push(newCart);
    } else {
      carts[index] = cart;
    }
    storage.set("carts", carts);
  },*/
