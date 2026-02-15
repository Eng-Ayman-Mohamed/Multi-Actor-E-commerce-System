import { category } from "./category.js";

export function categories() {
  return `<div class="container-xl my-5">
            <p class="h2 fw-bold text-center">Shop by Category</p>
            <p class="text-center">Explore our wide range of products</p>
            <div id="CategoriesContainer" class="column-gap-2 text-center justify-content-around row my-5 ">
            </div>
        </div>`;
}

export function initCategories() {
  let CategoriesContainer = $("#CategoriesContainer");
  let categoriesData = [
    {
      categoryEmoji: "💻",
      categoryName: "Electronics",
      categoryItems: "234",
    },
    {
      categoryEmoji: "👗",
      categoryName: "Fashion",
      categoryItems: "567",
    },
    {
      categoryEmoji: "🏠",
      categoryName: "Home & Living",
      categoryItems: "21894",
    },
    {
      categoryEmoji: "⚽",
      categoryName: "Sports",
      categoryItems: "345",
    },
    {
      categoryEmoji: "📚",
      categoryName: "Books",
      categoryItems: "678",
    },
    {
      categoryEmoji: "🎮",
      categoryName: "Toys",
      categoryItems: "123",
    },
  ];

  categoriesData.forEach((item) => {
    CategoriesContainer.append(
      category(item.categoryEmoji, item.categoryName, item.categoryItems),
    );
  });
}
